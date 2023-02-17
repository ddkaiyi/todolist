		var input1 = document.getElementById("input1");
		var showDoing = document.getElementById("showDoing");
		var showDone = document.getElementById("showDone");
		var ps = showDoing.getElementsByTagName("p");
		var count1 = document.getElementById("count1");
		var count2 = document.getElementById("count2");
		var arr=[];
		var sum1=0;
		var sum2=0;
		// 判断是否存在key为ToDoList的localStorage
		if(localStorage.getItem("ToDoList") != null) {//如果存在
			var objAfter = JSON.parse(localStorage.getItem("ToDoList"));
			// 循环遍历其中的内容
			for(var i=0;i<objAfter.length;i++)
			{
			// 将localStorage的value存入数组，便于下面的操作
			arr.push(objAfter[i]);
			// 判断todo是否已经完成
			if(objAfter[i].done==false)
			{
				// 没有完成则新建节点来显示未完成的todo信息
				var p = document.createElement("p");
				var input = document.createElement("input");
				var input11 = document.createElement("input");
				input11.type="button";
				input11.value="X";
				p.style.width="100"+"%";
				input11.style.backgroundColor="goldenrod";
				input11.style.borderRadius="20"+"px";
				input11.style.float="right";
				input.type="checkbox";
				input.id="input2";
				input.style.float="left";
				p.innerHTML=objAfter[i].title;
				p.style.backgroundColor="#7FFFD4";
				p.appendChild(input);
				p.appendChild(input11);
				showDoing.appendChild(p);
				// 记录未完成的数量
				sum1++;
				// 把未完成的总数量输出到对应的位置
				count1.innerHTML=sum1;
			}
			// 如果已经完成todo
			else{
				// 创建新节点来显示完成的todo信息
				var p = document.createElement("p");
				var input = document.createElement("input");
				var input11 = document.createElement("input");
				input11.type="button";
				input11.value="X";
				p.style.width="100"+"%";
				input11.style.backgroundColor="goldenrod";
				input11.style.borderRadius="20"+"px";
				input11.style.float="right";
				input.type="checkbox";
				input.checked="checked";
				input.style.float="left";
				p.innerHTML=objAfter[i].title;
				p.style.backgroundColor="#7FFFD4";
				p.appendChild(input);
				p.appendChild(input11);
				showDone.appendChild(p);
				// 记录完成的todo数量
				sum2++;
				// 把已完成的todo总数输出到指定位置
				count2.innerHTML=sum2;
			}
			}
		}
		// 如果不存在key为ToDoList，则创建，并为其value赋值为“{}”
		else{ 
			localStorage.setItem("ToDoList","{}");
		}
		// 添加todo的输入框事件
		input1.onkeydown= function(ev){
			var e = ev || e.window.event;
			var which = e.which || e.keyCode;
			// 输入框输入信息后按回车键后触发事件
			if(which==13&&input1.value!="")
			{
				var obj = {};
				// 创建节点来显示输入的todo信息
				var p = document.createElement("p");
				p.innerHTML=input1.value;
				p.style.backgroundColor="#7FFFD4";
				showDoing.appendChild(p);
				// 将title设置为输入框输入的内容
				obj.title=input1.value;
				// todo默认为未完成，即false
				obj.done=false;
				// 将obj对象添加到数组arr的末尾
				arr.push(obj);
				// 保存arr数组到localStorage中
				storageObj(arr);
				// 保存后清空输入框的内容，以便下次输入
				input1.value="";
				// 刷新页面
				location.reload();
			}
		}
		
		//storageObj函数把一个对象（数组）存入localStorage中
		function storageObj(obj) {
		    var checkedIdStr = JSON.stringify(obj);
		    localStorage.setItem("ToDoList", checkedIdStr);
		};
		var showDoinginputs = showDoing.getElementsByTagName("input");
		var showDoneinputs = showDone.getElementsByTagName("input");
		// 获取复选框，即单选按钮
		for(var j=0;j<showDoinginputs.length;j++){
			showDoinginputs[j].index =j;
			// 当点击未完成的单选按钮
			if(j%2==0)
			{
				showDoinginputs[j].onclick = function(ev){
					var e = ev || window.event;
					var target = e.target || window.event.srcElement;
					// 复制点击的节点
					var newNode = target.parentNode.cloneNode(true);
					// 将点击的节点添加到已完成todo的列表中
					 showDone.appendChild(newNode);
					 // 判断点击的title是否存在于localStorage中
					 for(var y=0;y<objAfter.length;y++)
					 {
						 // 如果存在
						if(arr[y].title==target.parentNode.innerText){
							// 将todo设置为已完成
							 arr[y].done=true;
							 // 将arr存入localStorage中
							 storageObj(arr);
						 } 
					 }
					 // 刷新页面
					 location.reload();
				}
			}
			// 当点击未完成的删除按钮
			else
			{
				showDoinginputs[j].onclick = function(ev){
					var e = ev || window.event;
					var target = e.target || window.event.srcElement;
					for(var y=0;y<objAfter.length;y++)
					 {
						 // 判断点击的title是否存在于localStorage中
					 	if(arr[y].title==target.parentNode.innerText){
							//存在则删除
							arr.splice(y,1);
							// 重新存入localStorage中
							storageObj(arr);
							location.reload();
						 } 
					 }
				}
			}
			
		}
	    // 获取已完成todo信息
		for(var x=0;x<showDoneinputs.length;x++){
			showDoneinputs[x].index=x;
			// 当点击已完成的单选按钮
			if(x%2==0)
			{
				showDoneinputs[x].onclick = function(ev){
					var e = ev || window.event;
					var target = e.target || window.event.srcElement;
					var newNode = target.parentNode.cloneNode(true);
					 showDoing.appendChild(newNode);
					 for(var y=0;y<objAfter.length;y++)
					 {
					 	if(arr[y].title==target.parentNode.innerText){
					 		 arr[y].done=false;
					 		 storageObj(arr);
					 	 } 
					 }
					  location.reload();
				}
			}
			// 当点击已完成的删除按钮
			else
			{
				showDoneinputs[x].onclick = function(ev){
					var e = ev || window.event;
					var target = e.target || window.event.srcElement;
				for(var y=0;y<objAfter.length;y++)
				 {
				 	if(arr[y].title==target.parentNode.innerText){
						arr.splice(y,1);
						storageObj(arr);
						 location.reload();
					 } 
				 }
				}
			}
			
		}
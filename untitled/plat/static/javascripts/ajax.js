var currentPageNum = 1;
var totalPageNum = 1;
var currentRegion = "United States";
var currentTheme = "all"
var start_time="2018-07-29";
var finish_time="2018-08-01";
var EventValue='';
var Keyword='';
var mydata=new Array();
var Number_of_events=0;

function getCookie() {

    //将本地cookie转换成数组形式,cookie以“;”结尾
    var list = document.cookie.split("; ");
    //创建一个空数组对象
    var cookieList = {};
    //然后遍历数组
    for (var i = 0; i < list.length; i++){
    //cookie是由name=value形式存在，所以获取当前=位置
      var pos = list[i].indexOf("=");
    //然后获取=前面的name
      var c_name = list[i].substring(0,pos);
    //获取=后面的value
      var c_value = list[i].substring(pos+1);
    //以name=value形式存入数组中，实际上产生的数据类型是对象
      cookieList[c_name] = c_value;
    }

    return cookieList;

}

function get_Number_of_events(){
	var second=document.getElementById("second-nav");
	var str=second.innerHTML.split('<li');
	Number_of_events=str.length-1;
	console.info("事件总计:"+Number_of_events);
}

function save() {
	console.info("run save");
	//先在本页直接使用js生成菜单，不使用ajax
	Number_of_events+=1;
	var meun=document.getElementById("second-nav");
	meun.innerHTML+="<li class=''><a class='second' id='"+Number_of_events+"' href='Opinion monitoring.html' onclick='set_CurrentEvent("+Number_of_events+")'><i class='icon-caret-right'></i><span id='s"+Number_of_events+"'>"+document.getElementById('Event').value+"</span></a></li>";
	//<span>使用s*编号 <a>使用*编号
	EventValue=document.getElementById('Event').value
	//先在本页直接使用js生成菜单，不使用ajax
	
	search();
	
	//简单保存到cookie供其他网页使用
	var e=EventValue;
	var r=currentRegion;
	var s=start_time.replace(/-/g,"");
	var f=finish_time.replace(/-/g,"");
	var k=Keyword;
	if (r="all"){
		var condition="DATE BETWEEN '"+s+"' AND '"+f+"' AND Title LIKE '%"+k+"%'";
	}else{
	var condition="ipBelong='"+r+"' AND DATE BETWEEN '"+s+"' AND '"+f+"' AND Title LIKE '%"+k+"%'";}
	document.cookie =e+"="+condition+";";
	//简单保存到cookie供其他网页使用
	
	
	
}//cookie相关写在此函数中

function Initialization(){
	console.info("run Initializaton");
	var ca = document.cookie.split(';');
	var nav=document.getElementById("second-nav");

	var j=0;
	for(var i=0; i<ca.length; i++) {
		var c = ca[i];
		
		if(c.substring(0,c.indexOf("="))!="" && c.substring(0,c.indexOf("="))!=" CE" && c.substring(0,c.indexOf("="))!=" CN")
		{  j+=1;
			nav.innerHTML+="<li class=''><a class='second' id='"+(j)+"' href='Opinion monitoring.html' onclick='set_CurrentEvent("+(j)+")'><i class='icon-caret-right'></i><span id='s"+j+"'>"+c.substring(0,c.indexOf('=')).trim(' ')+"</span></a></li>";
		}
	
	}
}

function set_CurrentEvent(id){
	
	  console.info("id="+id);
	  var EN=document.getElementById('s'+id).innerHTML;
     console.info("change CE to "+EN);
	  document.cookie ="CE="+EN+";";
	  console.info(document.cookie);
	
}

function search() {
	console.info("run search")
	Keyword=document.getElementById("Keyword").value;
	var xmlhttp;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{  console.info(xmlhttp.responseText);
			showList(10,xmlhttp.responseText);//非常待修改
			
		}
	}
	xmlhttp.open("GET","Get list.php?e="+EventValue+"&r="+currentRegion+"&s="+start_time+"&f="+finish_time+"&k="+Keyword, true);
	xmlhttp.send(null);
	console.info(xmlhttp.responseText)
}

function showList(pageSize,responseText) {
	console.info("show list");
	var responseJSON = eval(responseText);
	
	//if responseJSON.stateCode == 200) {
		document.getElementById("listBody").innerHTML = "";//clear old data
		
		//var id;
		for (item in responseJSON) {
			newsnum = parseInt(item) + 1;
			document.getElementById("listBody").innerHTML += "<tr><th width='40%'><a href='"+responseJSON[item].url+"' onclick='set_CurrentNews("+(newsnum)+")' target='_blank'><span id=news"+newsnum+">"+responseJSON[item].Title+"</span></a><br><br>"+responseJSON[item].DATE+"<br><br></th><th width='60%'><a href='News.html' onclick='set_CurrentNews("+(newsnum)+")' target='_blank'><span>新闻摘要:"+responseJSON[item].abstract+"...</span></a></th>";
		//}
		//totalRow = responseJSON.totalRow;
		//console.info("responseJson",responseJSON)
		//console.info("totalRow",totalRow)
		//totalPageNum = parseInt(totalRow / 10)
		//if (totalRow % 10 != 0) {
		//	totalPageNum++;
		//}
		//console.info("total page num:", totalPageNum)
		//pageNavigation(totalPageNum)
	}
console.info(responseJSON)
}

//get_list2用于获取舆情监控上的表格
function get_list2(pageSize){
	console.info("run get_list2")
	var xmlhttp;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{
			showList(10,xmlhttp.responseText);//参数10可修改，用于确定一页显示条数，但翻页未实现
		}
	}
	//通过cookie获取条件
	var a=getCookie();
	var b=a.CE;
	console.info(a);
	console.info(b);
	var SQLC=eval("a."+b)
	//var SQLC="DATE BETWEEN '20180701' AND '20180801' AND Title LIKE '%trump%'"
	console.info("SQLC= "+SQLC);
	//通过cookie获取条件
	xmlhttp.open("GET","Get list2.php?sqlc="+SQLC,true);
	xmlhttp.send(null);
	console.info(xmlhttp.responseText);
}
//get_list2用于获取舆情监控上的表格

//function pageNavigation(totalPageNum) {
//	console.info("pageNavigation")
//	if (totalPageNum <= 5) {
//		setPageNavigation(1, totalPageNum)
//	} else {
//		if (currentPageNum <= 2){
//			setPageNavigation(1, 5)
//		} else if (currentPageNum >= totalPageNum - 1) {
//			setPageNavigation(totalPageNum - 4, totalPageNum)
//		} else {
//			setPageNavigation(currentPageNum - 2, currentPageNum + 2)
//		}
//	}
//}

//function setPageNavigation(start, end) {
//	console.info("start & end:", start, end)
//	pageNvUi = document.getElementById("pageNvUi");
//	pageNvUi.innerHTML = ""
//	console.info("pageNavigation.innerHTML",pageNavigation.innerHTML)
//	pageNvUi.innerHTML+="<li><a href=\"javascript:getList(1,50,\'"+currentOrder+"\')\" aria-label=\"Previous\"><span aria-hidden=\"true\">&laquo;</span></a></li>"
//	for (i = start; i <= end; i++) {
//		if (i == currentPageNum) {
//			pageNvUi.innerHTML += "<li><a href='javascript:void(0)'>" + i + "</a></li>";
//		} else {
//			pageNvUi.innerHTML += "<li><a href=\"javascript:getList(" + i + "," +
//				50 + ",\'" +
//				currentOrder + "\')\">" + i + "</a></li>";
//		}
//	}
//	pageNvUi.innerHTML+="<li><a href=\"javascript:getList("+totalPageNum+",50,\'"+currentOrder+"\')\" aria-label=\"Previous\"><span aria//-hidden=\"true\">&raquo;</span></a></li>"
//}

function select_change_zone_name(div_name, name){//用于改变主题和报导地点的值
	
	document.getElementById(div_name).innerHTML = name;//前端显示相关
	switch (name) {
		case 'United States': currentRegion = 'United States'; break;
		case 'United Kingdom': currentRegion = 'United Kingdom';break;
		case 'all': currentRegion ='all';break;//还需要加入其它国家
			
		case '政府': currentTheme = 'GOVERNMENT'; break;
		case '武器': currentTheme = 'WEAPON';break;
		case 'all': currentTheme ='all';break;//还需要加入其它主题
	}
}

function GetMydata(graph){
	//获取对应cookie数据的Condition
	var a=getCookie();
	var b=a.CE;
	var SQLC=eval("a."+b)
	console.info("SQLC= "+SQLC);
	//获取对应cookie数据的Condition
var xmlhttp;
console.info("GetMydata");
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }

xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
		console.info("返回数据："+xmlhttp.responseText);
		mydata=eval(xmlhttp.responseText);
	   console.info(mydata)
    }
  }
xmlhttp.open("GET",graph+".php?sqlc="+SQLC,true);
xmlhttp.send(null);
}

function GetMydata3(graph){
	//获取对应cookie数据的Condition
	var a=getCookie();
	var b=a.CE;
	var SQLC=eval("a."+b);
	//var SQLC="DATE BETWEEN '20180701' AND '20180801' AND Title LIKE '%trump%'"

	console.info("SQLC= "+SQLC);
	//获取对应cookie数据的Condition
var xmlhttp;
console.info("GetMydata3");
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }

xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
		mydata=xmlhttp.responseText;
	   console.info("mydata："+mydata);
    }
  }
xmlhttp.open("GET",graph+".php?sqlc="+SQLC,true);
xmlhttp.send(null);
}

function change_start_time(){
	start_time=document.getElementById("startTime").value
	console.info("change to "+start_time)
}

function change_finish_time(){
	finish_time=document.getElementById("finishTime").value
	console.info("change to "+finish_time)
}

//GetMydata2仅仅用于获取趋势分析折线图所用的数据
function GetMydata2(graph,d1,d2,d3,d4,d5,d6,d7){
	//d1,d2等在趋势分析html中定义了，ajax函数没有体现
	//获取对应cookie数据的Condition
	//var strCookie = document.cookie;
	//console.info("strCookie= "+strCookie);	
	//var strCoo=strCookie.substring(strCookie.indexOf("CE"));
	//if (strCoo.indexOf("CE")<strCoo.indexOf(";")){
	//	var CEE=strCoo.substring(strCoo.indexOf("CE")+3,strCoo.indexOf(";"));
	//}
	//else{
	//	var CEE=strCoo.substring(strCoo.indexOf("CE")+3);
	//}
	//var SQLCondi=strCookie.substring(strCookie.indexOf(CEE));
	//if (SQLCondi[3]==";"){
	//	var SQLCon=SQLCondi.substring(5);
	//	SQLCondi=SQLCon.substring(SQLCon.indexOf(CEE));
	//}	
	//if (SQLCondi.indexOf("=")<SQLCondi.indexOf(";")){
	//	var SQLC=SQLCondi.substring(SQLCondi.indexOf("=")+1,SQLCondi.indexOf(";"));
	//}
	//else{
	//	var SQLC=SQLCondi.substring(SQLCondi.indexOf("=")+1);
	//}
	var a=getCookie();
	var b=a.CE;
	var SQLC=eval("a."+b)
	console.info("SQLC= "+SQLC);
	//获取对应cookie数据的Condition
	console.info("d1="+d1);
	console.info("d2="+d2);
	console.info("d3="+d3);
	console.info("d4="+d4);
	console.info("d5="+d5);
	console.info("d6="+d6);
	console.info("d7="+d7);
var xmlhttp;
console.info("GetMydata2");
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }

xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
		console.info("返回数据："+xmlhttp.responseText);
		mydata=eval(xmlhttp.responseText);
	   console.info(mydata);
    }
  }
	
	
xmlhttp.open("GET",graph+".php?sqlc="+SQLC+"&d1="+d1+"&d2="+d2+"&d3="+d3+"&d4="+d4+"&d5="+d5+"&d6="+d6+"&d7="+d7,true);
xmlhttp.send(null);
}
//GetMydata2仅仅用于获取趋势分析折线图所用的数据

function FormatDate(unformat){
	console.info("正则化函数只能在ie浏览器中使用")
	if(unformat.length==15){
		var format=unformat.replace('‎','').replace('‎年‎','0').replace('‎月‎','0').replace('‎日','');
	}
	if(unformat.length==17){
		var format=unformat.replace('‎','').replace('‎年‎','').replace('‎月‎','').replace('‎日','');
	}
	if(unformat.length==16){
		unforma=unformat.substring(unformat.indexOf("年")+1);
		unfor=unforma.substring(0,unforma.indexOf("月"));
		if(unfor.length==3){
			var format=unformat.replace('‎','').replace('‎年‎','0').replace('‎月‎','').replace('‎日','');
		}
		else{
			var format=unformat.replace('‎','').replace('‎年‎','').replace('‎月‎','0').replace('‎日','');
		}
	}

	return format;

}

//function blobToDataURL(blob, callback) {
//    let a = new FileReader();
//    a.onload = function (e) { callback(e.target.result); }
//    a.readAsDataURL(blob);
//	console.info(a)
//}

function ShowCloud(){
	var xmlhttp2;
	var data;
	console.info("GetCloud");
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp2=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp2=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp2.onreadystatechange=function()
  {		
  if (xmlhttp2.readyState==4 && xmlhttp2.status==200)
    {  
		
		
		
		
		
	var objectURL = URL.createObjectURL(this.response);
		
		var eleAppend = document.getElementById("main");
		
		var img = document.createElement("img");
	img.src = objectURL;
		console.info(img.src)
	img.height = 300;
	img.onload = function(e) {
	window.URL.revokeObjectURL(this.src);
		}
		eleAppend.appendChild(img);
		console.info(xmlhttp2.response);
	} 
	
}
	
	
		//blob=xmlhttp2.response;	
	
	
	
		//var b = new Blob([xmlhttp2.response], {
  //  type: 'text/plain'
//});
		//console.info(xmlhttp2.response);
		//var eleAppend = document.getElementById("main");
		
            //var img = document.createElement("img");
            //img.onload = function(e) {
              //window.URL.revokeObjectURL(img.src); // 清除释放
            //};
            //img.src = window.URL.createObjectURL(b);
            //eleAppend.appendChild(img);    
		//console.info("生成图片执行");
		//console.info(pic)
   // }
 // }
xmlhttp2.open("Post","http://localhost:80/Get_cloud.php");
//xmlhttp2.setRequestHeader('content-type','application/x-www-form-urlencoded');
//xmlhttp2.setRequestHeader('content-type','application/json; charset=utf-8');
	//mydata=["This is a normal test test test test","This is a normal disk disk disk disk"];
	
	mydata=[mydata]
	
	console.log(typeof(mydata));
	console.log("mydata=");
	console.log(mydata);
	data=mydata;
	xmlhttp2.responseType = "blob";
	xmlhttp2.send(JSON.stringify(data));
		
}

function set_CurrentNews(id){
	
	  console.info("id="+id);
	  var Title=document.getElementById('news'+id).innerHTML;
     console.info("change CN to "+Title);
	  document.cookie ="CN="+Title+";";//CN=Current News
	  console.info(document.cookie);
	
}

function GetNews(){
	var a=getCookie();
	var Title=a.CN;
	var xmlhttp;
	console.info("GetNews");
	if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
	else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }

	xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
		console.info("返回数据："+xmlhttp.responseText);
		txts=xmlhttp.responseText.replace(/\n/g,'<br>')
		document.getElementById("News").innerHTML +=txts;//有问题.............
    }
  }
	xmlhttp.open("GET","News.php?Title="+Title,true);
	xmlhttp.send(null);
}

//json格式示例
//JSONDATA = '{"stateCode":200,"msg":"成功","totalRow":1002,"data":[{"标题":"这是一个测试","地区":"美国","媒体":"时代周刊","发表时间":"刚才","正面情绪":"++","负面情绪":"--","情绪化指标":"==","摘要":"这是一个测试"},{"标题":"这是一个测试","地区":"美国","媒体":"时代周刊","发表时间":"刚才","正面情绪":"++","负面情绪":"--","情绪化指标":"==","摘要":"这是一个测试"},{"标题":"这是一个测试","地区":"美国","媒体":"时代周刊","发表时间":"刚才","正面情绪":"++","负面情绪":"--","情绪化指标":"==","摘要":"这是一个测试"}]}'
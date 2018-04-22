<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<%@ page contentType="text/html; charset=UTF-8"%>
<%
//状态栏内容
String statusBarCodes = "";

//获取tab页面打开的最大数量
String maxTabNum = "1";
%>
<head>
<link rel="stylesheet" href="<%=request.getContextPath()%>/theme/blue/css/main0.css" type="text/css">
<style type="text/css">
#ScreenLockerDiv {
	position: absolute;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background-color: #000000;
	filter: alpha(opacity = 20);
}
</style>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>
<script src="js/jquery-1.8.0.min.js" type="text/javascript"></script>
</head>
<body class="easyui-layout">
<div class="Tele_hd" id="Tele_hd" data-options="region:'north',split:false,border:false"><div class="logo"></div></div>
<div class="tele_frame" id="tele_frame" data-options="region:'center',border:false">
<div class="tele_menu easyui-tabs" id="tele_menu" data-options="tools:'#tab-tools',fit:true,border:false">
	<div title="My Bench" id="myBench" class="mybench_boderBlue" data-options="tools:'#p-tools',iconCls:'Tele_icons icon-tindex'">
        <iframe scrolling="no" id="myBenchf" frameborder="0" src="../TestStruts2.jsp" style="width:100%;height:99%; overflow:hidden;"></iframe>
    </div>
	<div title="Customer Interaction" id="93000000" class="mybench_boderBlue" style="overflow: hidden" data-options="selected:true">
		<iframe scrolling="yes" src="" frameborder="0" id="93000000f" style="width: 100%; height: 100%;"></iframe>
	</div>
	<div title="Customer" id="30000000" class="mybench_boderBlue" style="overflow: hidden" data-options="selected:true">
		<iframe scrolling="yes" src="" frameborder="0" id="30000000f" style="width: 100%; height: 100%;"></iframe>
	</div>
</div>
<div class="tele_menu_list" id="tele_menu_list"><ul></ul></div>
</div>
<div class="Tele_ft" id="Tele_ft" data-options="region:'south',split:false,border:false" class="copyright" style="height:31px;">
	<div class="login_info" style="display: none; top:5px;">
	    <img src="<%=request.getContextPath()%>/webframe/images/mini203.gif" id="co" /><span onclick="alert();"><i18n:message key="OFS2000039" res="CRM"></i18n:message></span>
		<img src="<%=request.getContextPath()%>/webframe/images/mini204.gif" id="lo" /><span onclick="alert();"><i18n:message key="OFS2000040" res="CRM"></i18n:message></span>
		<img src="<%=request.getContextPath()%>/webframe/images/mini205.gif" id="ls" /><span onclick="LockScreen();"><i18n:message key="OFS2000041" res="CRM"></i18n:message></span>
		<img src="<%=request.getContextPath()%>/theme/blue/images/password.png" id="cp" /><span onclick=""><i18n:message key="OFS2000109" res="CRM"></i18n:message></span>
		<img src="<%=request.getContextPath()%>/theme/blue/images/changelange.png" id="cl" /><span id="clcheck" style="margin-right:0px;"><span><i18n:message key="OFS2000357" res="CRM"/></span>
		</span>
		<img src="<%=request.getContextPath()%>/webframe/images/icon_001.png" id="mb" /><label onclick="alert();"><span class="font_org" id="bullet_num" title=""></span></label>
		<img src="<%=request.getContextPath()%>/webframe/images/icon_002.png" id="mb" /><label onclick="alert();"><span class="font_org" id="note_num" title=""></span></label>
		<img src="<%=request.getContextPath()%>/webframe/images/icon_003.png" id="mb" /><label onclick="alert();"><span class="font_org" id="remind_num" title=""></span></label>
	</div>
	 <div align="right">
      	<span id="bulletAfficeSpan" class="bulletin" style="display: none;">
			<iframe id="msgFrame" src="../webframe/notice/bulletFloat.jsp" frameborder="0" width="200px" height="28px" scrolling="no"></iframe>
		</span>
      	<span id="copyRightSpan" class="copy_right" style="display: block;">Copyright@2014-2016 Asiainfo-Linkage</span>
      </div>
</div>
<div class="language_change" id="language_change">
<div class="language_change_wrap">
	<div class="language_change_close" id="language_change_close"></div>
	<ul>
		<li id="zh_CN"><span class="marg_lef5" onclick="changeLanguage('zh_CN')">中文</span></li>
		<li id="en_US"><span class="marg_lef5" onclick="changeLanguage('en_US')">English</span></li>
	</ul>
	<div class="language_change_top"></div>
</div>
</div>
<div id="tab-tools">
    <div class="showMenuList Tele_icons icon-checkb" id="showMenuList"></div>
    <div class="hideMenuList Tele_icons icon-checkt" id="hideMenuList"></div>
</div>
<script language="javascript" type="text/javascript">
var showViewCodes = "<%=statusBarCodes%>";
var langs = ['china.png','usa.png','demark.png'];
var showMessFlag = false;
$(document).ready(function(){
	$.tele.menuList("#tele_menu","#tele_menu_list","#showMenuList","#hideMenuList");
	var ClshowBox = $("#language_change");
	var closeshowbox = $("#language_change_close");
	var showBoxitem=$("#language_change ul li");
	$("#cl,#clcheck").bind("click",function(){
		var clLeft=$("#cl").offset();
		var clLeftNum=clLeft.left;
		ClshowBox.css({display:"block",left:clLeftNum});
	});
	closeshowbox.bind("click",function(){
		ClshowBox.css({display:"none"});
	});
	showBoxitem.bind("click",function(){
		ClshowBox.css({display:"none"});
	});
	$('#tele_menu').tabs({
		onSelect:function(title, index){
			var tabObj = $('#tele_menu').tabs('getTab', title);
			var menuId = tabObj.attr("id");
			var iframe = eval("document.getElementById('" + menuId + "f')");
			if (iframe && iframe.src.indexOf("bench.jsp") < 0 && iframe.src.indexOf("busiView") < 0) {
				iframe.src = "busiView.jsp?menuId=" + menuId;
			}
		},
		onClose:function(title, index){
			$("#tele_menu_list").find("li").remove();
			$.tele.menuList("#tele_menu","#tele_menu_list","#showMenuList","#hideMenuList");
		}});
	
	
	$('div.login_info').children().hide();
	var codeArr = showViewCodes.split(",");
	for (var i = 0; i < codeArr.length; i++) {
		var code = codeArr[i];
		if (code.length > 0) {
			$('div.login_info').children('img#' + code).show();
			$('div.login_info').children('img#' + code).next().show();
			
			if(code=='mb')
				showMessFlag = true;
		}
	}
	$('div.login_info').show();
});
var remind_blink;//提醒的interval标识
var bullet_blink;
var note_blink;

//锁屏相关
var isCloseLockWnd = true;//是否弹出锁定窗口
function LockScreen(){
}

var searchType = 0;
//搜索功能开始
function selectType(obj, objType){
}

function beginSearch(){
}

function search(){
}

//来电弹屏
function openCustPage(billId){
}

/*查询input*/
window.onload=function(){
	var label=document.getElementById("search_input").getElementsByTagName("label")[0];
	var input=document.getElementById("inputs");
	input.onfocus=function(){
		label.style.color="#DDD";
	}
	input.onkeypress=function(){
		label.style.display="none";
	}
	input.onkeyup=function(){
		label.style.display="none";
	}
	input.onpaste=function(){
  	label.style.display="none";
  }
	input.onblur=function(){
		var values=input.value;
		if(values=="" || values==null || values=="Number"){
			input.value=="Number";
			label.style.color="#999";
			label.style.display="block";
		}
	}
}

/**
 * 打开360视图 
 */
function open360View(custId, custType, custName){
	var strUrl = "<%=request.getContextPath()%>/saasframe/view360.jsp?realCustId=" + custId + "&realCustType=" + custType;
	addNewTab(custName, custId, strUrl, true);
}

/**
 * 在一级视图tab页面上打开可关闭的tab页面
 * tabTitle-视图名称
 * frameId-内嵌frame id
 * url-打开的页面url
 * refreshable-是否可刷新
 */
function addNewTab(tabTitle, frameId, url, refreshable){
	 var tabObj = $('#tele_menu').tabs('getTab', tabTitle);
	 if (tabObj && $('#' + frameId) && refreshable) {
		 $('#tele_menu').tabs('select', tabTitle);
		 return;
	 }
	 var tabCount = $('#tele_menu').tabs('tabs').length;// 获取当前打开窗口总数量
	 if (tabCount >= <%=maxTabNum%>) {
		alert(crm_i18n_msg("OFC2000011"));
 	    return;
	 }
	 $('#tele_menu').tabs('add',{   
	      title: tabTitle,   
	      content: "<iframe id='" + frameId + "' scrolling='yes' frameborder='0'  src='" + url +"' style='width:100%;height:100%;'></iframe>",   
	      closable: true  
	  });
	 //加入到下拉列表中
	 $("#tele_menu_list").find("li").remove();
	 $.tele.menuList("#tele_menu","#tele_menu_list","#showMenuList","#hideMenuList");
}

/*
 * 切换语言
 */
function changeLanguage(lg){
}

//清空iframe的内容
function cleanIframeLeak() {
}

function cleanFrame(frameContent) {
}

/**
 * 在目前选中的一级菜单下页面上打开新的tab
 */
function openNewContentTab(itemId, title, url){
	var tab = $('#tele_menu').tabs('getSelected');
	var menuId = tab.attr("id");
	var mainFrame = null;
	if (menuId != "myBench") {
		mainFrame = document.getElementById(menuId + "f").contentWindow.document.getElementById("mainFrame").contentWindow;
		mainFrame.openNewTab(itemId, title, url, 'true', true, null);
	} else {
		mainFrame = document.getElementById(menuId + "f").contentWindow;
		mainFrame.addNewTab(itemId, title, url, null);
	}
}

/**
 * 关闭当前选中的一级菜单下正打开的tab页面
 */
function closeCurrentTab(tabItemId) {
	var tab = $('#tele_menu').tabs('getSelected');
	var menuId = tab.attr("id");
	var mainFrame = null;
	if (menuId != "myBench") {
		mainFrame = document.getElementById(menuId + "f").contentWindow.document.getElementById("mainFrame").contentWindow;
	} else {
		mainFrame = document.getElementById(menuId + "f").contentWindow;
	}
	
	if (mainFrame) {
		mainFrame.closeCurrentTab(tabItemId);
	}
}
</script>
</body>
</html>
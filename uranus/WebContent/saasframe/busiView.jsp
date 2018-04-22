<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<%@ page contentType="text/html; charset=UTF-8"%>
<head>
<script src="js/jquery-1.8.0.min.js" type="text/javascript"></script>
<title></title>
</head>
<body class="easyui-layout tele_layout" id="tele_layout">
<div data-options="region:'west'" style="width:220px; padding:8px 0 0 7px; overflow-x:hidden; background:#f6f7f9; border:5px solid #fff;">
<!----------------------------benck_left---------------------------------->
<%@ include file="submenu.jsp"%>
<!-----------------------------end benck_left--------------------------------->

</div><!--end west-->
<div data-options="region:'center'">

<!---------------------------benck_box---------------------------------------->
<iframe id="mainFrame" src="deskTop.jsp?topMenuId=<%=request.getParameter("menuId")%>" frameborder="0" width="100%" height="99.5%" scrolling="auto"></iframe>

</div>
<div class="hideleft_layout" id="hideleft_layout"></div>
<div class="showleft_layout" id="showleft_layout"></div>
<script language="javascript" type="text/javascript">
$(document).ready(function(){
	$.tele.layoutCheck();
});
//点击菜单事件
function op(aMenuId, name, url, openMode, verifyMode) {
	mainFrame.addNewTab("/TestStruts2.jsp");
	return;
}

//用于执行菜单的js方法
function invokeMethod(method){
    eval(method);
}

function closeCurrentTab(tabItemId) {
	mainFrame.closeTabItem("tab_desktop",tabItemId);
}
</script>
</body>
</html>

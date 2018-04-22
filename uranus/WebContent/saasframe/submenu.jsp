<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<%@ page contentType="text/html; charset=UTF-8"%>
<head>
<%
	String topMenuId = request.getParameter("menuId");
%>
<title><i18n:message key="OFS2000361" res="CRM"/></title>
<link rel="stylesheet" href="<%=request.getContextPath()%>/theme/blue/css/main0.css" type="text/css">
</head>
<body>
<div class="bench_left">
	<div class="benck_left_box">
		<div class="benck_left_1_top">
			<span class="bench_left_icon_font_bold float_lef marg_lef10 nowrapAll"><a href="#nogo"
				onclick="op(93000001,'Customer Interaction Search','http://ssotest107.ailk.telenor.com:7777/CRM/crm/ci/interaction/CustInteraction.jsp',0,'00000000')"
				title="Customer Interaction Search">Customer Interaction Search</a>
			</span>
		</div>
	</div>
	<div class="benck_left_box">
		<div class="benck_left_1_top">
			<span class="bench_left_icon_font_bold float_lef marg_lef10 nowrapAll"><a href="#nogo"
				onclick="op(93000002,'Channel Setting','http://ssotest107.ailk.telenor.com:7777/CRM/crm/ci/spec/ChannelList.jsp',0,'00000000')"
				title="Channel Setting">Channel Setting</a>
			</span>
		</div>
	</div>
	<div class="benck_left_box">
		<div class="benck_left_1_top">
			<span class="bench_left_icon_font_bold float_lef marg_lef10 nowrapAll"><a href="#nogo"
				onclick="op(93000003,'Business Interaction Type Setting','http://ssotest107.ailk.telenor.com:7777/CRM/crm/ci/spec/CiInteractionCategory.jsp',0,'00000000')"
				title="Business Interaction Type Setting">Business Interaction Type Setting</a>
			</span>
		</div>
	</div>
</div>
<script language="javascript" type="text/javascript">
function showThirdMenu(index){
	var thirdMenu = document.getElementById("thirdMenuDIV_"+index);
	var icon = document.getElementById("arrowIcon_"+index);
	if(thirdMenu.style.display=="none"){
		thirdMenu.style.display="block";
		icon.className = "benck_left_2_top_icon float_rig";
	}else{
		thirdMenu.style.display="none";
		icon.className = "benck_left_1_top_icon float_rig";
	}
}

function showDIV(){
	document.getElementById("arrowIcon_0")?document.getElementById("thirdMenuDIV_0").style.display="block":"";
	document.getElementById("arrowIcon_0")?document.getElementById("arrowIcon_0").className = "benck_left_2_top_icon float_rig":"";
}

showDIV();
</script>
</body>
</html>
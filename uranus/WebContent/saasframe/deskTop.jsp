<%@ page contentType="text/html; charset=UTF-8"%>
<html>
	<head>
		<title></title>
		    <link rel="stylesheet" type="text/css" href="../framework/easyui/css/default.css"/>
	    <link rel="stylesheet" type="text/css" href="../framework/easyui/easyui/themes/default/easyui.css" />
	    <link rel="stylesheet" type="text/css" href="../framework/easyui/easyui/themes/icon.css" />
	    <script type="text/javascript" src="../framework/easyui/easyui/jquery-1.7.2.min.js"></script>
	    <script type="text/javascript" src="../framework/easyui/easyui/jquery.easyui.min.js"></script>
			<link rel="stylesheet" href="<%=request.getContextPath()%>/theme/blue/css/main0.css" type="text/css">
	</head>
<body class="easyui-layout" style="overflow-y: hidden"  scroll="no">
    <!-- 主体 -->
    <div id="mainPanle" region="center" style="background: #eee; overflow-y:hidden">
        <div id="tabs" class="easyui-tabs"  fit="true" border="false" >
		</div>
    </div>
</body>
<script language="javascript" type="text/javascript">
function addNewTab(url) {
	$('#tabs')
	.tabs(
			'add',
			{
				title : '车辆实时位置',
				content : '<iframe scrolling="auto" frameborder="0"  src="'
					+ '<%=request.getContextPath()%>' + url
					+ '" style="width:100%;height:100%;" name="locationPage"></iframe>',
				closable : true,
				icon : 'icon-car'
			});	
}
</script>
</html>
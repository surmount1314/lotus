<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath();
%>
<html>
<head>
<script type="text/javascript" src="<%=basePath%>/framework/easyui2/jquery-1.8.0.min.js" charset="utf-8"></script>
<script type="text/javascript" src="<%=basePath%>/framework/easyui2/jquery.easyui.min.js" charset="utf-8"></script>
<script type="text/javascript" src="<%=basePath%>/framework/easyui2/locale/easyui-lang-zh_CN.js" charset="utf-8"></script>
<link rel="stylesheet" type="text/css" href="<%=basePath%>/framework/easyui2/themes/default/easyui.css" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>/framework/easyui2/themes/icon.css" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>/css/isp_table.css" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>/css/isp_common.css" />
<link rel="stylesheet" type="text/css" href="<%=basePath%>/css/icon.css" />
<script type="text/javascript" charset="utf-8">
var dialog_title_add = "新增";
var dialog_title_edit = "修改";
var opType = "";
var opUrl = "";

var datagrid;
var dataDialog;
var dataDialogForm;
var settingDialog;
var settingDialogForm;

var nameValidatebox;

//var queryConditionForm;



//***************************************初始化**************************************************************
/**
页面加载初始化（除图片以外的所有dom节点）,body onload是所有内容加载完
*/
$(function() {
 datagrid = $('#datagrid').datagrid
 (
   {
            url : 'login.action',
            title : '车辆列表',
			loadMsg:'数据装载中......',
			iconCls : 'icon-mylist',
			pagination : true,
			rownumbers : true,
			pagePosition : 'bottom',
			pageSize : 10,
			pageList : [ 10, 20, 30, 40 ],
			fit : true,
			fitColumns : false,
			nowrap : false,
			border : false,
			idField : 'id',
			sortName : 'name',
			sortOrder : 'desc',
			frozenColumns : 
			[ [ 
			  {
				title : '编号',
				field : 'accountId',
				width : 120,
				sortable : true,
				checkbox : true
			  }
			] ],
			columns : 
			[ [ 
			  {
				title : '车牌号',
				field : 'account',
				width : 150
			  }, 
			  {
				title : '终端编号',
				field : 'accountImei',
				width : 150
			  },
			  {
				title : '车组',
				field : 'carsGroup',
				width : 150
			  },
			  {
				title : '车类型',
				field : 'carsType',
				width : 150
			  },
			  {
				title : '在线状态',
				field : 'pushStatus',
				width : 80,
				formatter: function(value,row,index)
				           {
							  if (value == '1')
							  {
								return '在线';
							  } 
							  else if(value == '0')
							  {
								return '离线';
						      }
						      else
						      {
						         return '';
						      }
			               }
			  },
			  {
				title : '操作',
				field : 'cdesc',
				width : 160,
				formatter : function(value, rowData, rowIndex) 
				            {
				              var opHtml = '<a class="icon-myfoot" style="display:inline-block;vertical-align:middle;width:16px;height:16px;" href="javascript:void(0);" onclick="viewTrace(' + rowIndex + ');"></a>';
				              opHtml += '&nbsp;&nbsp';
				              opHtml += '<a class="icon-myedit" style="display:inline-block;vertical-align:middle;width:16px;height:16px;" href="javascript:void(0);" onclick="editOpData(' + rowIndex + ');"></a>';
				              opHtml += '&nbsp;&nbsp';
				              opHtml += '<a class="icon-mydelete" style="display:inline-block;vertical-align:middle;width:16px;height:16px;" href="javascript:void(0);" onclick="deleteOpData(' + rowIndex + ');"></a>';
				             
					          return opHtml;
				            }
			   } 
			] ],
			toolbar : 
			[ {
				text : '新增',
				iconCls : 'icon-add',
				handler : function() 
				{
				    //清空表单
				    dataDialogForm.find('input,textarea').val('');
				    dialogChange('add');
					dataDialog.dialog('open');
				}
			}, '-', {
				text : '删除',
				iconCls : 'icon-remove',
				handler : function() 
				{
					deleteSelectedData();
				}
			}, '-', {
				text : '取消选中',
				iconCls : 'icon-undo',
				handler : function() 
				{
				    datagrid.datagrid('unselectAll');
				}
			} 
			]
   
      }
   );
});
function showProgress(){
   $.messager.progress
    (   
        {
			text : '数据加载中....',
			interval : 100
		}
	);
}
function closeProgress(){
    $.messager.progress('close');
}

</script>
</head>
<body class="easyui-layout" data-options="fit:true" style="margin-top: 5px">
    <div data-options="region:'center',border:false" >
		<table id="datagrid"></table>
	</div>
	<!-- 新增对话框 -->
	<div id="dataDialog" style="width:650px;height:520px;display: none" align="center">
	   <form id="dataDialogForm">
	    <table cellspacing="1" cellpadding="0" class="tb_searchbar">
			<tr>
				<td colspan="3" align="left">
				   请填写
				</td>
			</tr>
			<tr>
				<td class="td_title" width="20%" align="left">车牌号</td>
				<td align="left">
				  <input id="accountInput" name="account" style="width:90%;"/>
				  <input type="hidden" id="idInput" name="id" />
                </td>
			</tr>
			<tr>
				<td class="td_title" width="20%" align="left">车组</td>
				<td align="left" colspan="2">
				  <select id="carsGroupInput" name="carsGroup" style="width:17%;">
				  	<option value="1" selected="selected">北京</option>
				  	<option value="2">上海</option>
				  	<option value="3">天津</option>
				  	<option value="4">重庆</option>
				  	<option value="5">广东</option>
				  </select>
                </td>
			</tr>
			<tr>
				<td class="td_title" width="20%" align="left">车类型</td>
				<td align="left" colspan="2">
				  <select id="carsTypeInput" name="carsType" style="width:17%;">
				  	<option value="1" selected="selected">轿车</option>
				  	<option value="2">卡车</option>
				  </select>
                </td>
			</tr>
	     </table>
	    </form>
    </div>
    
</body>
</html>
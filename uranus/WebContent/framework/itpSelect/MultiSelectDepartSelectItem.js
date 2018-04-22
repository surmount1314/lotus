var dts = window.dialogArguments;
var MsgtitleForm = "数据选择";
var MsgtitleKeyWord = "关键字";
var MsgtitleHit = "请填写查询条件";
var MsgtitleHitTips = "";
var MsgSearch = "查询";
var MsgCanSelect = "可供选择";
var MsgSelected = "已选择";
var MsgOK = "确定";
var MsgCancel = "取消";
var MsgNoKeyWord = "请输入关键字，按回车或点查询按纽。";
var MsgClassErr = "请先设置控件需要调用的类名以及方法名。";
var MsgNoData = "部分关键字查不到结果。";
var MsgGetDataErr = "对不起，系统取数据出错！";
var MsgDataFormatErr = "返回数据格式不正确";
var MsgConfim = "确定全部移除吗?";
var MsgTitleSelectAll = "全部选择";//Select All
var MsgTitleSelect = "选择";//     Select
var MsgTitleRemove = "移除";//     Remove
var MsgTitleRemoveAll = "全部移除";// Remove All

var itpSelectPath = dts[19];
// 加载语言
if (dts[15] == "Dept") {
    if (dts[14] == "True") {
        js_include("lang/deptmen.js");
    }
    else {
        js_include("lang/deptmcn.js");
    }
}
else if (dts[15] == "Employee") {
    if (dts[14] == "True") {
        js_include("lang/employeemen.js");
    }
    else {
        js_include("lang/employeemcn.js");
    }
}
else {
    if (dts[14] == "True") {
        js_include("lang/men.js");
    }
}
if (dts[17] != "") {
    js_include(dts[17]);
}

if (dts[13] != "") {
    MsgtitleForm = dts[13];
}

$(document).ready(function() {
    $("#btnSearch").attr("value", MsgSearch);
    $("#btnOK").attr("value", MsgOK);
    $("#btnCancel").attr("value", MsgCancel);
    $("#btnMoveAllRight").attr("title", MsgTitleSelectAll);
    $("#btnMoveRight").attr("title", MsgTitleSelect);
    $("#btnMoveLeft").attr("title", MsgTitleRemove);
    $("#btnMoveAllLeft").attr("title", MsgTitleRemoveAll);      
      
    if (dts[2] != "") {
        $("#MsgtitleKeyWord").html(dts[2]);
    }
    else {
        $("#MsgtitleKeyWord").html(MsgtitleKeyWord);
    }
    $("#MsgCanSelect").html(MsgCanSelect);
    $("#MsgSelected").html(MsgSelected);
    $("#MsgtitleHitTips").html(MsgtitleHitTips);    
    document.title = MsgtitleForm;
});

function js_include($script) {
    var script = document.createElement('script');
    script.src = $script;
    script.type = 'text/javascript';
    var head = document.getElementsByTagName('head').item(0);
    head.appendChild(script);
}

/// <summary>
/// 定义ZTEDeptSelectItem对象
/// </summary>
var ZTEDeptSelectItem = new Object();

/// <summary>
/// 限制文本框输入的部门数目
/// </summary>
ZTEDeptSelectItem.checkItemLength = function()
{
    var strLink               = "";
    var newData               = document.getElementById("searchKey").value.split(',');
    var MaxSelectedDeptNumber = 10;
    
    if(newData.length > MaxSelectedDeptNumber)  //输入的关键字大于配置文件中限制的关键字数量
    {
        for(var i = 0;i < MaxSelectedDeptNumber; i++)
        {
            if(newData[i].length != 0)       //对空字符串不做处理
            {
                strLink = strLink+newData[i]+",";
            }
        }
        document.getElementById("searchKey").value = strLink;//将符合关键字数量限制的字符串写回文本框
    }
}

/// <summary>
/// 按关键字查找部门
/// </summary>
ZTEDeptSelectItem.searchEmployee = function() {
    var txt = document.getElementsByTagName("*").searchKey.value;
    if (txt.indexOf("%") >= 0 || txt.indexOf("-") >= 0 || txt.indexOf("'") >= 0 || txt == "") {
        document.getElementsByTagName("*").searchKey.value = "";
        ZTEDeptSelectItem.setMessage(MsgNoKeyWord);
        $("#searchKey").focus();
        return;
    }
    try {
        document.getElementById("busy").style.display = "";
        document.getElementsByTagName("*").ListBoxLeft.innerHTML = ""; //清空左边列表中所有数据

        var dts = window.dialogArguments; //传参，及传引用句柄
        //var ctlName = dts[1];

        //if (ctlName.ajaxClassName && ctlName.methodName) {
        if (dts[4] && dts[5]) {
            //调用Ajax.js构造Ajax对象
            var ajaxObj = new AjaxObj(); //构造AjaxObj对象
            ajaxObj.className = dts[4]; //ctlName.ajaxClassName; //类名
            ajaxObj.method = dts[5];//ctlName.methodName; //按部门查询
            ajaxObj.parameter[0] = document.getElementsByTagName("*").searchKey.value; //方法参数
            ajaxObj.parameter[1] = dts[6];//ctlName.tagData; //附属信息
            ajaxObj.parameter[2] = dts[7];//ctlName.Filter; //附属信息
            ajaxObj.callBack = ZTEDeptSelectItem.addList; //返回处理函数
            ajaxObj.errHandler = ZTEDeptSelectItem.errHandler; //错误处理函数
            execMethod(ajaxObj); //执行Ajax调用
        }
        else {
            ZTEDeptSelectItem.setMessage(MsgClassErr);
            document.getElementById("busy").style.display = "none";
        }
    }
    catch (ex) {
        document.getElementById("busy").style.display = "none";
    }
    finally {
        ZTEDeptSelectItem.setCount();
    }
}

/// <summary>
/// 载入第一个页面查询到结果数据
/// </summary>
ZTEDeptSelectItem.loadData = function() {
try {
        document.title = MsgtitleForm;
        var dts = window.dialogArguments; //传参，及传引用句柄
        //var ctlName = dts[1];
        var k = dts[20]; //= dts[0].document.getElementById(ctlName.id + "_input");
        var v = dts[11];//dts[0].document.getElementById(ctlName.id + "_value");

        //if (ctlName.MulitSelect == "False") {
        if (dts[3] == "False") {
            document.getElementsByTagName("*").btnMoveAllRight.style.display = "none";
            document.getElementsByTagName("*").btnMoveAllLeft.style.display = "none";
        }
        //ZTEDeptSelectItem.addRightList(k.value, v.value); //加载从查询页面带回的数据,dtFinal
        ZTEDeptSelectItem.addRightList(k, v); //加载从查询页面带回的数据,dtFinal

        //if (ctlName.DataSourceString != "") {
        if (dts[8] != "" && dts[8] != " ") {        
            var xmlDoc = new ActiveXObject("Msxml2.DOMDocument");
            xmlDoc.async = false;
            xmlDoc.loadXML(dts[8]);

            var dt = new DataTable();
            dt.fill(xmlDoc);
            ZTEDeptSelectItem.addList(dt);
        }
        return;
    }
    catch (ex) {
    }
    finally {
        ZTEDeptSelectItem.setCount();
    }
}

/// <summary>
/// 将第一个页面带回的数据添加到右边列表
/// </summary>
ZTEDeptSelectItem.addRightList = function(dk, dv) {
    var Arrk = dk.toString().split(',');
    var Arrv = dv.toString().split(',');
    for (var i = 0; i < Arrk.length; i++) {
        if (Arrv[i]) {
            ZTEDeptSelectItem.addOption(document.getElementsByTagName("*").ListBoxRight, Arrk[i], Arrv[i]);
        }
    }
}

/// <summary>
/// 往列表框添加查询返回的项目
/// </summary>
ZTEDeptSelectItem.addList = function(dt) {
    try {
        if (arguments.length == 0) //当无参数时，通过Ajax对象调用
        {
            dt = this.dataTable;
        }
        var strKey = document.getElementById("searchKey").value.split(",");
        var countKey = strKey.length;
        if (strKey[strKey.length - 1] == "") {
            countKey = strKey.length - 1;
        }

        //根据查询结果选择不同的操作
        if (dt.count <= 1) //如果查询结果为0条数据
        {
            ZTEDeptSelectItem.setMessage(MsgNoData);
        }
        else if (dt.count == 2) //如果查询结果为1条数据，则直接添加到右边列表
        {
            //ZTEDeptSelectItem.setMessage("操作提示：请输入关键字名称，按回车或点查询按纽。");
            ZTEDeptSelectItem.addOption(document.getElementsByTagName("*").ListBoxRight, dt.getValue(1, 0), dt.getValue(1, 1));
            if (countKey > dt.count)   //检查输入的关键字与查到的结果数是否一致，不一致提示
            {
                ZTEDeptSelectItem.setMessage(MsgNoData);
            }
        }
        else if (dt.count > 2) //如果查询结果为多条数据，则添加到左边列表
        {
            var MaxQueryDeptNumber = 1000; //限制显示的部门数量
            for (var i = 1; i < dt.count; i++) {
                //ZTEDeptSelectItem.setMessage("操作提示：请输入关键字名称，按回车或点查询按纽。");
                if (i > (MaxQueryDeptNumber - 1))  //如果i值大于配置文件中限制的数量则不再添加到列表框中
                {
                }
                else {
                    ZTEDeptSelectItem.addOption(document.getElementsByTagName("*").ListBoxLeft, dt.getValue(i, 0), dt.getValue(i, 1));
                }
            }
            if (countKey > dt.count)  //检查输入的关键字与查到的结果数是否一致，不一致提示
            {
                ZTEDeptSelectItem.setMessage(MsgNoData);
            }
        }
        ZTEDeptSelectItem.setCount();
    }
    finally {
        document.getElementById("busy").style.display = "none";
	}
}

/// <summary>
/// 往列表中添加指定项目。如果列表中不存在该项目则添加，否则不添加。
/// </summary>
ZTEDeptSelectItem.addOption = function(ctlList, strText, strValue) {
    var dts = window.dialogArguments; //传参，及传引用句柄
    //var ctlName = dts[1];
    //if (ctlName.NullValue == strValue) {
    if (dts[9] == strValue) {    
        return;
    }
    if (!ZTEDeptSelectItem.isExistText(ctlList, strText)) {
        ctlList.options[ctlList.options.length] = new Option(strText, strValue);
        ctlList.options[ctlList.options.length - 1].title = strText;       
    }

    if (document.getElementsByTagName("*").ListBoxRight.length > 0) {
        $("#btnOK").attr("disabled", "");
    }
    else {
        $("#btnOK").attr("disabled", "disabled");
    }
}

/// <summary>
/// 错误处理
/// </summary>
ZTEDeptSelectItem.errHandler = function () {
    alert(MsgGetDataErr);
}

/// <summary>
/// 将项目从源列表移到目标列表
/// </summary>
ZTEDeptSelectItem.moveOption = function(srcList, dstList) {
    var dts = window.dialogArguments;
    //var ctlName = dts[1];

    // 如果是单选，要往右边添加数据的时候先把右边的数据都移动到左边
    if (dstList == document.getElementsByTagName("*").ListBoxRight
		  && dts[3] == "False") {
        for (var i = 0; i < document.getElementsByTagName("*").ListBoxRight.length; i++) {
            document.getElementsByTagName("*").ListBoxRight[i].selected = true;
        }
        ZTEDeptSelectItem.moveOption(document.getElementsByTagName("*").ListBoxRight, document.getElementsByTagName("*").ListBoxLeft);
    }

    //如果源列表没有项目，则返回false
    if (srcList.options.length == 0) {
        return false;
    }
    else if (srcList.selectedIndex != -1) //如果源列表有项目，并且选择了项目，则进行移动处理
    {
        var iNext = 0; //下一个项目的索引

        for (var i = 0; i < srcList.options.length; i++) //对列表项目进行迭代
        {
            if (dstList == document.getElementsByTagName("*").ListBoxRight
		    && dts[3] == "False" //&& ctlName.MulitSelect == "False" 
		    && document.getElementsByTagName("*").ListBoxRight.length >= 1) {
                break;
            }

            //因为后面有Options的remove操作，其length会在列表项目迭代的过程中不断变小，为避免死循环，加上这个判断条件可跳出
            if (srcList.options.length == 0) {
                break;
            }
            if (srcList.options[i].selected) //如果当前项目被选中，则添加到目标列表
            {
                strSelectValue = srcList.options[i].value; //项目的值
                strSelectText = srcList.options[i].text; //项目的文本
                ZTEDeptSelectItem.addOption(dstList, strSelectText, strSelectValue); //往目标列表中添加项目
                srcList.remove(i); //移除该项目
                iNext = i; //下一个项目的索引
                i--; //移除了一个项目，下一个项目的索引应为i，因为for循环中i++，所以这里减1与之抵消，仍为i
            }
        }

        // 如果列表中还有项目，并且当前选中项的下一项不为空，则光标定位到下一项，否则定位到第一项
        if (srcList.options.length > 0) {
            if (srcList.options[iNext] != null) {
                srcList.options[iNext].selected = true; //光标定位到下一项
            }
            else {
                srcList.options[0].selected = true; //光标定位到第一项
            }
        }
        ZTEDeptSelectItem.setCount();

        if (document.getElementsByTagName("*").ListBoxRight.length > 0) {
            $("#btnOK").attr("disabled", "");
        }
        else {
            $("#btnOK").attr("disabled", "disabled");
        }
        return true; //移动成功返回true
    }
    else //如果列表中有项目，并且没有选择项目，则将焦点定位到列表第一项，并返回false
    {
        srcList.options[0].selected = true;
        return false; //移动失败返回false
    }
}

/// <summary>
/// 将所有的项目移动到右边
/// </summary>
ZTEDeptSelectItem.moveAllRight = function ()
{		
	//循环选中左边列表所有项目
	for(var i = 0;i < document.getElementsByTagName("*").ListBoxLeft.length; i++)
	{
		document.getElementsByTagName("*").ListBoxLeft[i].selected = true;
	}
	ZTEDeptSelectItem.moveOption(document.getElementsByTagName("*").ListBoxLeft,document.getElementsByTagName("*").ListBoxRight);
}

/// <summary>
/// 右移列表框内的项目
/// </summary>
ZTEDeptSelectItem.moveRight = function ()
{   
	ZTEDeptSelectItem.moveOption(document.getElementsByTagName("*").ListBoxLeft,document.getElementsByTagName("*").ListBoxRight);
}

/// <summary>
/// 左移列表框内的项目
/// </summary>
ZTEDeptSelectItem.moveLeft = function ()
{
	ZTEDeptSelectItem.moveOption(document.getElementsByTagName("*").ListBoxRight,document.getElementsByTagName("*").ListBoxLeft);
}

/// <summary>
/// 将所有的项目移动到左边
/// </summary>
ZTEDeptSelectItem.moveAllLeft = function()
{
    //if (!confirm(MsgConfim))
	//{
	//	return false;
	//}
	
	//循环选中右边列表所有项目
	for(var i = 0;i < document.getElementsByTagName("*").ListBoxRight.length; i++)
	{
		document.getElementsByTagName("*").ListBoxRight[i].selected = true;
	}
	ZTEDeptSelectItem.moveOption(document.getElementsByTagName("*").ListBoxRight,document.getElementsByTagName("*").ListBoxLeft);
}

/// <summary>
/// 将指定的统计标签数值
/// </summary>
ZTEDeptSelectItem.setCount = function(lblCount,i)
{
	var value              = lblCount.innerText;
	var count              = parseInt(value) + i;
	lblCount.innerText     = count;
}

/// <summary>
/// 刷新左右列表的统计值
/// </summary>
ZTEDeptSelectItem.setCount = function()
{
	document.getElementsByTagName("*").lblLeftCount.innerText  = document.getElementsByTagName("*").ListBoxLeft.length; //左列表统计
	document.getElementsByTagName("*").lblRightCount.innerText = document.getElementsByTagName("*").ListBoxRight.length; //右列表统计
}

/// <summary>
/// 刷新页面提示信息
/// </summary>
ZTEDeptSelectItem.setMessage = function(str) {
    alert(str);
    //document.getElementsByTagName("*").lblMessage.innerHTML = str;
}

/// <summary>
/// 确定，返回选择
/// </summary>
ZTEDeptSelectItem.ok = function()
{
	ZTEDeptSelectItem.returnData();
}

/// <summary>
/// 取消本次查询，关闭弹出窗口
/// </summary>
ZTEDeptSelectItem.cancel = function()
{
	top.close();
}

/// <summary>
/// 返回选择结果
/// </summary>
ZTEDeptSelectItem.returnData = function() {
    var strk = "";
    var strv = "";
    var strkHidden = "";
    var MaxSelectedDeptNumber = 100; //限制返回部门的数量
    var dts = window.dialogArguments;
    //var ctlName = dts[1];

    if (document.getElementsByTagName("*").ListBoxRight.length > 0) {
        for (var i = 0; i < document.getElementsByTagName("*").ListBoxRight.length; i++) {
            if (i > (MaxSelectedDeptNumber - 1))   //如果大于配置文件中要求的最大数目减1，则不添加到DataTable中
            {
            }
            else {

                // 判断是否多选
                if (i > 0 && dts[3] == "False") {//ctlName.MulitSelect
                    break;
                }

                if (i > 0) {
                    strk += ",";
                    strv += ",";
                    strkHidden += ",";
                }
                var temp = document.getElementsByTagName("*").ListBoxRight[i].text;
                if(dts[15] == 'Employee' && temp.indexOf('/') > -1)
                {
                    temp = temp.substr(0,temp.indexOf('/'));
                }
                
                strkHidden += document.getElementsByTagName("*").ListBoxRight[i].text;
                strk += temp;
                strv += document.getElementsByTagName("*").ListBoxRight[i].value;
            }
        }
    }
    window.parent.returnValue = true;

    //    var k = dts[0].document.getElementById(ctlName.id + "_input");
    //    var v = dts[0].document.getElementById(ctlName.id + "_value");
    //    k.value = strk;
    //    v.value = strv;

    dts[10] = strk;
    dts[11] = strv;
    dts[20] = strkHidden;
    //k.fireEvent('onchange');
    top.close();
}

/// <summary>
/// 通过项目（Option）的值（Value）属性来检查列表中是否已存在指定的项目
/// 如果存在则返回true，不存在则返回false
/// </summary>
ZTEDeptSelectItem.isExistValue = function(ctlList,strValue)
{
	var intFlag = false;
	
	for (var i = 0; i < ctlList.options.length; ++i)
	{
		if (strValue == ctlList.options[i].value)
		{
			intFlag = true;
			break;
		}
	}	
	return(intFlag)
}
 
/// <summary>
/// 取消在form内按回车键自动刷新页面事件
/// </summary> 
ZTEDeptSelectItem.cancelPost = function()
{
}

/// <summary>
/// 取消在form内按钮单击自动刷新页面事件
/// </summary> 
ZTEDeptSelectItem.cancelClickPost = function()
{
}

/// <summary>
/// 通过项目（Option）的文本（Text）属性来检查列表中是否已存在指定的项目，
/// 如果存在则返回true，不存在则返回false
/// </summary>
ZTEDeptSelectItem.isExistText = function(ctlList,strValue)
{
	var intFlag = false;
	
	for (var i = 0; i < ctlList.options.length; ++i)
	{
		if (strValue == ctlList.options[i].text)
		{
			intFlag = true;
			break;
		}
	}
	return(intFlag);
}

/// <summary>
/// 文本框按键响应事件
/// </summary> 
ZTEDeptSelectItem.changestateDialog = function()
{
}


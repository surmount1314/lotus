if (window.addEventListener) 
{ 
	window.addEventListener('DOMContentLoaded', itpSelectCtrl_init, false); //firefox 
	window.addEventListener('load', itpSelectCtrl_init, false); 
} 
else if (window.attachEvent) 
{ 
	window.attachEvent('onload', itpSelectCtrl_init);
} 

//---------------------------deptSelMul.js文件开始-------------------------------------
/// <summary>
/// 定义ZTEMulitSelectV1D0D0D0对象
/// </summary>
var ZTEMulitSelectV1D0D0D0 = new Object();

ZTEMulitSelectV1D0D0D0.FormWidth = "662";//"780";
ZTEMulitSelectV1D0D0D0.FormHeight = "438"; //"510";

ZTEMulitSelectV1D0D0D0.FormMWidth = "712";//"780";
ZTEMulitSelectV1D0D0D0.FormMHeight = "530"; //"510";

ZTEMulitSelectV1D0D0D0.searchType = "";

var selectLang = "False";

/// <summary>
/// 取消按下回车键自动刷新页面功能
/// </summary>
ZTEMulitSelectV1D0D0D0.cancelPost = function() {
    if (event.keyCode == 13) {
        event.returnValue = false;
    }
}

/// <summary>
/// 限制文本框输入的部门数目
/// </summary>
ZTEMulitSelectV1D0D0D0.checkLength = function(checkNum) {
    var strLink = "";
    var MaxSelectedDeptNumber = 200;
    var newData = checkNum.value.split(',');

    if (newData.length > MaxSelectedDeptNumber)  //输入的关键字大于配置文件中限制的关键字数量
    {
        for (var i = 0; i < MaxSelectedDeptNumber; i++) {
            if (newData[i].length != 0)       //对空字符串不做处理
            {
                strLink = strLink + newData[i] + ",";
            }
        }
        checkNum.value = strLink; //将符合关键字数量限制的字符串写回文本框
    }
}

/// <summary>
/// 按关键字查找部门
/// </summary>
ZTEMulitSelectV1D0D0D0.search = function(ctlName) {
    var dts = ZTEMulitSelectV1D0D0D0.GetdtsInfo(ctlName);
    ZTEMulitSelectV1D0D0D0.ShowWinForm(dts);
}

ZTEMulitSelectV1D0D0D0.ShowWinForm = function(ctlName,dts) {
    var k = document.getElementById(ctlName.id + "_input");
    var v = document.getElementById(ctlName.id + "_value");
    var vHidden = document.getElementById(ctlName.id + "_valueHidden");

    var WinWidth = ZTEMulitSelectV1D0D0D0.FormMWidth;  //定义模态框的宽度
    var WinHeight = ZTEMulitSelectV1D0D0D0.FormMHeight; //定义模态框的高度
    if (ctlName.formWidth != "" && ctlName.formWidth > 0) {
        WinWidth = ctlName.formWidth;
    }
    if (ctlName.formHeight != "" && ctlName.formHeight > 0) {
        WinHeight = ctlName.formHeight;
    }
    var rtnValues = new Array(); //模态窗口返回的值，定义为数组
    var modalUrl = itpSelectPath + "SeleDep.html"; //模态窗口地址
    var resize = "no";
    if (dts[3] == "False" || dts[3] == "false") {
        modalUrl = itpSelectPath + "SingleSelect.html";
        //resize = "yes";
        WinWidth = ZTEMulitSelectV1D0D0D0.FormWidth;  //定义模态框的宽度
        WinHeight = ZTEMulitSelectV1D0D0D0.FormHeight; //定义模态框的高度
    }
    if (ctlName.CustomPageUrl != null && ctlName.CustomPageUrl != '' && ctlName.CustomPageUrl != ' ') {
        modalUrl = ctlName.CustomPageUrl;
    }

    ZTEMulitSelectV1D0D0D0.searchType = "search";
    // 如果是单选则先查询，如果只有一个结果就直接返回，否则才弹出窗口
    var features = ZTEMulitSelectV1D0D0D0.setWinFeatures(WinHeight, WinWidth, resize); //设置模态窗口属性
    rtnValues = window.showModalDialog(modalUrl, dts, features); //调用模态窗口
    if (rtnValues) //如果模态窗口通过确定返回，有返回值
    {
        k.value = dts[10];
        v.value = dts[11];
        vHidden.value = dts[20];
        k.fireEvent('onchange');
    }
}

ZTEMulitSelectV1D0D0D0.GetdtsInfo = function(ctlName) {
    var dts = new Array();
    var k = document.getElementById(ctlName.id + "_input");
    var v = document.getElementById(ctlName.id + "_value");
    var vHidden = document.getElementById(ctlName.id + "_valueHidden");
    //id
    //titleMessage
    //MulitSelect
    //ajaxClassName
    //methodName
    //tagData
    //Filter
    //DataSourceString
    //NullValue
    dts[0] = self;
    dts[1] = ctlName.id;
    if (ctlName.titleMessage != undefined) {
        dts[2] = ctlName.titleMessage;
    }
    else {
        dts[2] = "";
    }
    dts[3] = ctlName.MulitSelect;
    dts[4] = ctlName.ajaxClassName;
    dts[5] = ctlName.methodName;
    dts[6] = ctlName.tagData;
    dts[7] = ctlName.Filter;
    dts[8] = ctlName.DataSourceString;
    dts[9] = ctlName.NullValue;
    dts[10] = k.value;
    dts[11] = v.value;
    dts[20] = vHidden.value;
    /*
    if (ctlName.titleForm != undefined) {
        dts[13] = ctlName.titleForm;
    }
    else {
        dts[13] = "";
    }
    */
    dts[13] = "";
    dts[14] = ctlName.English;
    selectLang = ctlName.English;
    dts[15] = ctlName.MessageTemplate;
    dts[16] = ctlName.CustomTemplateSingle;
    dts[17] = ctlName.CustomTemplateMulti;
    if (ctlName.displayvalue == undefined) {
        ctlName.displayvalue = "";
    }
    dts[18] = ctlName.displayvalue;
    dts[19] = itpSelectPath;//当前文件路径
    return dts;
}

ZTEMulitSelectV1D0D0D0.keydown = function(event, ctlName) {
    if (event.keyCode == 13 || event.keyCode == 9) {
        ZTEMulitSelectV1D0D0D0.searchinput(ctlName, "keyDown");
        event.returnValue = false;
    }
}

ZTEMulitSelectV1D0D0D0.onBlurevent = function(ctlName) {
    ZTEMulitSelectV1D0D0D0.ctlName = ctlName;
    setTimeout("ZTEMulitSelectV1D0D0D0.onBlureventTimeout()", 100);
}

ZTEMulitSelectV1D0D0D0.onBlureventTimeout = function() {
    ZTEMulitSelectV1D0D0D0.searchinput(ZTEMulitSelectV1D0D0D0.ctlName, 'onBlur');
}

ZTEMulitSelectV1D0D0D0.searchinput = function(ctlName) {
    ZTEMulitSelectV1D0D0D0.searchinput(ctlName, "");
}

ZTEMulitSelectV1D0D0D0.searchinput = function(ctlName, type) 
{
    ctlName =  document.getElementById(ctlName);
    if (type == "onBlur") 
    {
        if (ZTEMulitSelectV1D0D0D0.searchType != undefined && ZTEMulitSelectV1D0D0D0.searchType != "") {
            ZTEMulitSelectV1D0D0D0.searchType = "";
            return;
        }
    }
    ZTEMulitSelectV1D0D0D0.searchType = type;
    var dts = ZTEMulitSelectV1D0D0D0.GetdtsInfo(ctlName);

    var k = document.getElementById(ctlName.id + "_input");
    var v = document.getElementById(ctlName.id + "_value");

    // 当光标移开时，如果文本框的值没有改变则不进行检测
    if (type == "onBlur") {
        if (dts[18] == dts[10]) {
            ZTEMulitSelectV1D0D0D0.searchType = "";
            return;
        }
    }
    else 
    {
        // 如果回车或者点击放大镜的时候选中值没有变动则弹出窗体不查询
        if (dts[18] == dts[10]) 
        {
            ZTEMulitSelectV1D0D0D0.ShowWinForm(ctlName, dts);
            return;
        }
    }
    // 当单选的时候，如果文本框没有值则清空所有值
    if (dts[3] == "False") {
        if (dts[10] == "") {
            ZTEMulitSelectV1D0D0D0.searchType = "";
            v.value = "";
            k.fireEvent('onchange');

            // 如果是光标移开则不弹出窗体，否则弹出空窗体
            if (type == "onBlur") {
                return;
            }
        }
    }
    if (ctlName.showWin != undefined && ctlName.showWin == "true") {
        return;
    }
    if (dts[3] == "True") {
        ZTEMulitSelectV1D0D0D0.ShowWinForm(ctlName, dts);
        return;
    }
    if (dts[4] && dts[5]) {
        //调用Ajax.js构造Ajax对象
        var ajaxObj = new SelectAjaxObj(); //构造AjaxObj对象
        ajaxObj.className = dts[4]; //ctlName.ajaxClassName; //类名
        ajaxObj.method = dts[5]; //ctlName.methodName; //按部门查询
        ajaxObj.parameter[0] = dts[10]; //方法参数
        ajaxObj.parameter[1] = dts[6]; //ctlName.tagData; //附属信息
        ajaxObj.parameter[2] = dts[7]; //ctlName.Filter; //附属信息
        ajaxObj.parameter[3] = 1; // 当前页数
        ajaxObj.parameter[4] = 10; // 每页显示条数
        ajaxObj.parameter[5] = 0; // 共多少条记录
        ajaxObj.callBack = ZTEMulitSelectV1D0D0D0.addList; //返回处理函数
        ajaxObj.errHandler = ZTEMulitSelectV1D0D0D0.errHandler; //错误处理函数
        ajaxObj.ctlName = ctlName;
        execMethod(ajaxObj); //执行Ajax调用
    }
    else {
        if (dts[14] == "True") {
            alert("Please set the class name and the function name for the control first!");
        }
        else {
            alert("操作提示：请先设置控件需要调用的类名以及方法名。");
        }
    }
}

ZTEMulitSelectV1D0D0D0.addList = function(dt) {
    if (arguments.length == 0) //当无参数时，通过Ajax对象调用
    {
        dt = this.dataTable;
    }
    var ctlName = this.ctlName;
    var dts = ZTEMulitSelectV1D0D0D0.GetdtsInfo(ctlName);
    var k = document.getElementById(ctlName.id + "_input");
    var v = document.getElementById(ctlName.id + "_value");
    //var v = document.getElementById(ctlName.id + "_valueHidden");
    dts[12] = dt;

    if (dt.count == 2) //如果查询结果为1条数据，则直接返回
    {
        k.value = dt.getValue(1, 0);
        v.value = dt.getValue(1, 1);
        ctlName.displayvalue = k.value;
        ZTEMulitSelectV1D0D0D0.searchType = "";
        k.fireEvent('onchange');
    }
    else if (dt.count > 2) {
        if (ZTEMulitSelectV1D0D0D0.searchType == "onBlur") {
            var msg = "存在多条匹配数据，是否要进行选择？";
            if (dts[14] == "True") {
                msg = "More than one query result! Do you want to select one?";
            }
            if (!confirm(msg)) {
                if (v.value != "") {
                    k.value = ctlName.displayvalue;
                }
                else {
                    k.value = "";
                }
                ZTEMulitSelectV1D0D0D0.searchType = "";
                return;
            }
        }
        var WinWidth = ZTEMulitSelectV1D0D0D0.FormMWidth;  //定义模态框的宽度
        var WinHeight = ZTEMulitSelectV1D0D0D0.FormMHeight; //定义模态框的高度
        if (ctlName.formWidth != "" && ctlName.formWidth > 0) {
            WinWidth = ctlName.formWidth;
        }
        if (ctlName.formHeight != "" && ctlName.formHeight > 0) {
            WinHeight = ctlName.formHeight;
        }
        var rtnValues = new Array(); //模态窗口返回的值，定义为数组
        var modalUrl = itpSelectPath + "SeleDep.html"; //模态窗口地址
        var resize = "no";
        if (dts[3] == "False") {
            modalUrl = itpSelectPath + "SingleSelect.html";
            //resize = "yes";
            WinWidth = ZTEMulitSelectV1D0D0D0.FormWidth;  //定义模态框的宽度
            WinHeight = ZTEMulitSelectV1D0D0D0.FormHeight; //定义模态框的高度
        }
        if (ctlName.CustomPageUrl != null && ctlName.CustomPageUrl != '' && ctlName.CustomPageUrl != ' ') {
            modalUrl = ctlName.CustomPageUrl;
        }
        var features = ZTEMulitSelectV1D0D0D0.setWinFeatures(WinHeight, WinWidth, resize); //设置模态窗口属性

        ctlName.showWin = "true";
        rtnValues = window.showModalDialog(modalUrl, dts, features); //调用模态窗口
        ctlName.showWin = "false";
        if (rtnValues) //如果模态窗口通过确定返回，有返回值
        {
            k.value = dts[10];
            v.value = dts[11];
            ctlName.displayvalue = k.value;
            k.fireEvent('onchange');
        }
        else //模态窗口通过关闭和取消返回
        {
            if (v.value != "") {
                k.value = ctlName.displayvalue;
            }
            k.focus();
        }
    }
    else {
        if (dts[14] == "True") {
            ZTEMulitSelectV1D0D0D0.buildPrompt(k, "No matching record!", "");
            //alert("No matching record!");
        }
        else {
            ZTEMulitSelectV1D0D0D0.buildPrompt(k, "没有找到符合条件的信息，请重新输入！", "");
            //alert("没有找到符合条件的信息，请重新输入！");
        }
        k.value = "";
        v.value = "";
        k.fireEvent('onchange');
    }
    if (ZTEMulitSelectV1D0D0D0.searchType == "onBlur") {
        ZTEMulitSelectV1D0D0D0.searchType = "";
    }
}

/// <summary>
/// 合并文本框中重复的查询结果
/// </summary>
ZTEMulitSelectV1D0D0D0.MergeDept = function(strmerge) {
    var strResult = "";    //存储合并后的字符串
    var strSplit = strmerge.split(','); //拆分带有重复关键字的字符串

    //将含有重复关键字的多余项以*号代替
    for (var i = 0; i < strSplit.length; i++) {
        if (strSplit[i].length > 0) //跳过拆分后形成的空字符串
        {
            var strIn = "";
            strIn = strSplit[i];
            for (var n = 0; n < strSplit.length; n++) //从第一项开始循环比较每一个值
            {
                if (strIn == strSplit[n]) {
                    if (n != i)                   //将索引值不同而值相同的两个项的其中红之一赋值为*
                    {
                        strSplit[n] = "*";
                    }
                }
            }
        }
    }

    //连接没有重复字符串的项
    for (var m = 0; m < strSplit.length; m++) {
        if (strSplit[m].length > 0) {
            if (strSplit[m] != "*") {
                var strAll = strSplit[m].split("-");
                strResult = strResult + strAll[strAll.length - 1] + ",";
            }
        }
    }

    return strResult;
}

/// <summary>
/// 处理查询返回的数据
/// </summary>
ZTEMulitSelectV1D0D0D0.backHandler = function() {
    var txtSearchResult = ""; //输入框查询结果值	
    var dt = this.dataTable; //查询结果
    var txtSearch = document.getElementById(this.userObj); //获得文本输入框对象

    if (dt.count == 1) //如果查询结果为1条数据，则直接返回到部门输入框
    {
        if (document.getElementById(txtSearch.hiddenName).value != "")  //如果隐藏域中有数据
        {
            document.getElementById(txtSearch.hiddenId).value = document.getElementById(txtSearch.hiddenId).value + dt.getValue(0, 0) + ","; //将查询返回的数据以","隔开并添加到隐藏域中
            document.getElementById(txtSearch.hiddenName).value = document.getElementById(txtSearch.hiddenName).value + dt.getValue(0, 1) + ","; //将查询返回的数据以","隔开并添加到隐藏域中
            document.getElementById(txtSearch.hiddenAll).value = document.getElementById(txtSearch.hiddenAll).value + dt.getValue(0, 2) + ",";
        }
        else {
            document.getElementById(txtSearch.hiddenId).value = dt.getValue(0, 0) + ",";  //如果隐藏域中没有内容，则将查到的结果直接保存到隐藏域中
            document.getElementById(txtSearch.hiddenName).value = dt.getValue(0, 1) + ",";
            document.getElementById(txtSearch.hiddenAll).value = dt.getValue(0, 2) + ",";
        }
    }
    else //如果查询到0条数据，弹出查询结果窗口，并给出提示信息，继续查询;如果查询结果为多条数据，则添加到左边列表
    {

        var dts = new Array();
        dts[0] = document.getElementById(txtSearch.hiddenId).value;
        dts[1] = dt; //查询结果数据
        dts[2] = document.getElementById(txtSearch.hiddenName).value;
        dts[3] = document.getElementById(txtSearch.hiddenAll).value;
        dts[4] = txtSearch.value;
        var WinWidth = ZTEMulitSelectV1D0D0D0.FormMWidth;  //定义模态框的宽度
        var WinHeight = ZTEMulitSelectV1D0D0D0.FormMHeight; //定义模态框的高度
        var rtnValues = new Array(); //模态窗口返回的值，定义为数组
        var modalUrl = itpSelectPath + "SeleDep.html"; //模态窗口地址
        var features = ZTEMulitSelectV1D0D0D0.setWinFeatures(WinHeight, WinWidth, 'no'); //设置模态窗口属性
        rtnValues = window.showModalDialog(modalUrl, dts, features); //调用模态窗口

        if (rtnValues) //如果模态窗口通过确定返回，有返回值
        {
            document.getElementById(txtSearch.hiddenId).value = dts[0]; //将返回值保存到隐藏域中
            document.getElementById(txtSearch.hiddenName).value = dts[2];
            document.getElementById(txtSearch.hiddenAll).value = dts[3];
        }
        else //模态窗口通过关闭和取消返回  
        {
            return;
        }
    }

    var noCheckStr = ZTEDeptSelect.MergeDept(document.getElementById(txtSearch.hiddenAll).value, txtSearch.hiddenAll);  //将合并重复关键字后的结果显示在文本控件

    //将超出字符数限制的文本截断，只显示规定范围内的字符串
    if (noCheckStr.length > 200) {
        document.getElementById(this.userObj).value = noCheckStr.substring(0, 200);
        //document.all.errMsgMul.innerText            = "超出最大字符长度，数据被截断!";
    }
    else {
        document.getElementById(this.userObj).value = noCheckStr;
    }

    document.getElementById(this.userObj).title = noCheckStr; //设置文本框标题属性，鼠标放上可以显示层效果
}

/// <summary>
/// Ajax错误处理
/// </summary>
ZTEMulitSelectV1D0D0D0.errHandler = function() {
    if (selectLang == "True") {
        alert("Sorry, system error!");
    }
    else {
        alert("对不起，系统取数据出错！");
    }
}

/// <summary>
/// 设置模态窗口的各种属性
/// </summary>                   
ZTEMulitSelectV1D0D0D0.setWinFeatures = function(iHeight, iWidth, resizable) {
    var features = "dialogHeight: " + iHeight + "px;";
    features += "dialogWidth: " + iWidth + "px;";
    features += "help: no; status: no; scroll: yes;location:no;";
    features += "resizable: " + resizable;
    return features;
}


/// <summary>
/// 响应输入按键事件
/// </summary>
ZTEMulitSelectV1D0D0D0.changestate = function(txtName) {
    if (event.keyCode == 13 || event.keyCode == 9) {
        ZTEMulitSelectV1D0D0D0.search(txtName);
    }
}

/// <summary>
/// 清空查询文本框以及隐藏域中的内容
/// </summary>
ZTEMulitSelectV1D0D0D0.clearText = function(ctlName) {
    ctlName =  document.getElementById(ctlName);
    ZTEMulitSelectV1D0D0D0.searchType = "Del";
    var k = document.getElementById(ctlName.id + "_input");
    var v = document.getElementById(ctlName.id + "_value");
    if (k && v) {
        k.value = "";
        v.value = "";
        k.fireEvent('onchange');
    }
}

ZTEMulitSelectV1D0D0D0.linkTofield= function(caller) {
    linkTofield = $(caller).attr("id") + "formError";
    linkTofield = linkTofield.replace(/\[/g, "");
    linkTofield = linkTofield.replace(/\]/g, "");
    return linkTofield;
}
ZTEMulitSelectV1D0D0D0.buildPrompt = function(caller, promptText, type) {			// ERROR PROMPT CREATION AND DISPLAY WHEN AN ERROR OCCUR
    var deleteItself = $(caller).attr("id") + "formError";

    if ($("#" + deleteItself).length == 0) {
        var divFormError = document.createElement('div');
        divFormError.id = deleteItself;
        linkTofield = ZTEMulitSelectV1D0D0D0.linkTofield(caller)


        $("body").append(divFormError);

        callerTopPosition = $(caller).offset().top;
        callerleftPosition = $(caller).offset().left;
        callerWidth = $(caller).width();
        inputHeight = $(divFormError).height();

        callerHeight = $(caller).height();
        callerleftPosition = callerleftPosition;
        callerTopPosition = callerTopPosition + callerHeight + 7;
        $(divFormError).width(callerWidth);
        $(divFormError).css("border", "1px solid #333333");
        $(divFormError).css("background", "#f7f5d1");
        $(divFormError).css("color", "#333333");
        $(divFormError).css("font-family", "tahoma");
        $(divFormError).css("padding", "4px 10px 4px 10px");
        $(divFormError).css("z-index", "5000");
        $(divFormError).css("position", "absolute");
        $(divFormError).css({
            top: callerTopPosition,
            left: callerleftPosition,
            opacity: 0
        })
    }
    $("#" + deleteItself).css("display", "");
    $("#" + deleteItself).html(promptText)
    setTimeout("ZTEMulitSelectV1D0D0D0.RemovedivFormErrorTimeout('" + deleteItself + "')", 5000);
    return $("#" + deleteItself).animate({ "opacity": 1 }, function() { return true; });
}
ZTEMulitSelectV1D0D0D0.RemovedivFormErrorTimeout = function(deleteItself) {
if ($("#" + deleteItself).length > 0) {
    $("#" + deleteItself).css("display", "none");
}
}
//---------------------------deptSelMul.js文件结束-------------------------------------

function SelectAjaxObj() {
	this.className; 
	this.method; 
	this.parameter = new Array(); 
	this.dataTable; 
	this.userObj; 
	this.errMsg; 
	this.callBack; 
	this.errHandler; 
}

function execMethod(ajaxObj) {
    //var url = location.host + "/" + location.pathname.substring(0, location.pathname.lastIndexOf("/") + 1) + "selectQuery.jsp?path=getdata&"
    //url = "http://" + url.replace("//", "/");
    url = itpSelectPath + "selectQuery.jsp?path=getdata&";
    url = url + "c=" + encodeURIComponent(ajaxObj.className) + "&m=" + encodeURIComponent(ajaxObj.method);
	var len = ajaxObj.parameter.length; 
	for (i = 0; i < len; i++)
	{
		url = url + "&p" + i + "=" + encodeURIComponent(ajaxObj.parameter[i]); 
	}
	url = url + "&pc=" + ajaxObj.parameter.length; 
	var xmlHTTP = false;
	if (window.XMLHttpRequest) 
	{
		xmlHTTP = new XMLHttpRequest();
		if (xmlHTTP.overrideMimeType)
		{
			xmlHTTP.overrideMimeType("text/xml");
		}
	} else {
		if (window.ActiveXObject) 
		{
			try
			{
				xmlHTTP = new ActiveXObject("Msxml2.XMLHTTP");
			}
			catch (e)
			{
				try 
				{
					xmlHTTP = new ActiveXObject("Microsoft.XMLHTTP");
				}
				catch (e)
				{
					try 
					{
						xmlHTTP = new ActiveXObject("Msxml2.XMLHTTP.4.0");
					}
					catch (e)
					{
						try 
						{
							xmlHTTP = new ActiveXObject("Msxml2.XMLHTTP.3.0");
						}
						catch (e) 
						{
							try 
							{
								xmlHTTP = new ActiveXObject("Msxml2.XMLHTTP.5.0");
							}
							catch (e)
							{
							}
						}
					}
				}
			}
		}
	}
	
	if (!xmlHTTP) 
	{
		window.alert("Cannot Creat XMLHttpRequest Object!");
		return false;
	}
	
	xmlHTTP.onreadystatechange = __OncallBack;
	xmlHTTP.open("POST", url, true);
	xmlHTTP.send();
	
	function __OncallBack()
	{
		if (xmlHTTP.readyState == 4)
		{
			if (xmlHTTP.status == 200)
			{
				var xmlDoc = new ActiveXObject("Msxml2.DOMDocument");
				xmlDoc.async = false;
				var resultstr = xmlHTTP.responseText;
				resultstr = resultstr.substring(resultstr.lastIndexOf("</title>") + 8,resultstr.lastIndexOf("</head>"));
				resultstr = resultstr.replace(/^\s+|\s+$/g,"");
				xmlDoc.loadXML(resultstr);
				var dt = new DataTable(); 
				dt.fill(xmlDoc); 
				ajaxObj.dataTable = dt; 
				ajaxObj.callBack();
			}
			else
			{
				var Msg = "XMLHttpRequest Get Data Error!";
				if (typeof (ajaxObj.errHandler) == "function")
				{
					ajaxObj.errMsg = Msg;
					ajaxObj.errHandler();
				}
				else
				{
					alert(Msg);
				}
			}
		}
	}
}

function DataTable()
{
    this.rows = new Array();
    this.htData = new Array();
	this.count = 0;

	this.fill = function fill(xmlDoc) {
	    var xmlDataRow = xmlDoc.getElementsByTagName("TR");
	    var len = xmlDataRow.length;
	    for (var i = 0; i < len; i++) {
	        this.rows[i] = new Array();
	        var arTD = xmlDataRow(i).getElementsByTagName("TD");
	        for (var j = 0; j < arTD.length; j++) {
	            this.rows[i].push(arTD[j].text);
	        }
	    }

	    var iNum = 1;
	    var xmlhtData = xmlDoc.getElementsByTagName("HTData");
	    var htlen = xmlhtData.length;
	    for (var i = 0; i < htlen; i++) {
	        var arKey = xmlhtData(i).getElementsByTagName("Key");
	        var arValue = xmlhtData(i).getElementsByTagName("Value");
	        if (arKey.length > 0 && arValue.length > 0) {
	            this.htData[arKey[0].text] = arValue[0].text;
	        }
	    }

	    this.count = len;
	};
	
	this.addDT = function addDT(dt)
	{
		this.rows = this.rows.concat(dt.rows);
		this.reCount();
	};
	
	this.reCount = function reCount()
	{
		this.count = this.rows.length;
	}
	
	this.getRow = function getRow(iRow)
	{
		return this.rows[iRow];
	};
	
	this.addRow = function addRow(row)
	{
		this.rows.push(row);
		this.reCount();
	};
	
	this.delRow = function delRow(iRow)
	{
		this.rows.splice(iRow,1);
		this.reCount();
	};
	
	this.getValue = function getValue(iRow, iCol)
	{
		return this.rows[iRow][iCol];
	};
	
	this.setValue = function setValue(iRow, iCol,value)
	{
		this.rows[iRow][iCol] = value;
	};
	
	this.getRowNum = function getRowNum()
	{
		return this.rows.length;
	};
	
	this.getColNum = function getColNum()
	{
		return this.rows[0].length;
	};
}

//---------------------------标签初始化-------------------------------------------------

var SELECT_TAG = "itp:selectCtrl";
var itpSelectDiv = null;
function getSelectNameByTagId(id)
{
    var result = '';
    var type = document.getElementById(id + '_type').value;
    if(type == 'true')
    {
        result = document.getElementById(id + '_input').innerHTML;
    }
    else 
    {
        result = document.getElementById(id + '_input').value;
    }
    return result;
}
function getSelectValueByTagId(id)
{
    var result = '';
    result = document.getElementById(id + '_value').value;
    return result;
}
function setSelectNameByTagId(id,value)
{
    var type = document.getElementById(id + '_type').value;
    if(type == 'true')
    {
        document.getElementById(id + '_input').innerHTML = value;
    }
    else 
    {
        document.getElementById(id + '_input').value = value;
    }
}
function setSelectValueByTagId(id,value)
{
    document.getElementById(id + '_value').value = value;
}
function setSelectShowValueByTagId(id,value)
{
	document.getElementById(id + "_valueHidden").value = value;;
}
	
	/**
	 标签的展示
	*/
	function itpSelectCtrlShow(id)
	{
		var labelObj = document.getElementById(id);
		var width = (labelObj.getAttribute("width")||126);
		var height = (labelObj.getAttribute("height")||80);
		
	    //div属性
	    var ajaxClassName = (labelObj.getAttribute("ajaxClassName")||" ");
	    var CustomTemplateSingle = (labelObj.getAttribute("CustomTemplateSingle")||" ");
	    var DataSourceString = (labelObj.getAttribute("DataSourceString")||" ");
	    var formWidth = (labelObj.getAttribute("formWidth")||"0");
	    var MessageTemplate = (labelObj.getAttribute("MessageTemplate")||"Default");
	    var NullValue = (labelObj.getAttribute("NullValue")||" ");
	    var CustomPageUrl = (labelObj.getAttribute("CustomPageUrl")||" ");
	    var Filter = (labelObj.getAttribute("Filter")||" ");
	    var Rows = (labelObj.getAttribute("Rows")||"3");
	    var CustomTemplateMulti = (labelObj.getAttribute("CustomTemplateMulti")||" ");
	    var Validate = (labelObj.getAttribute("Validate")||" ");
	    var tagData = (labelObj.getAttribute("tagData")||" ");
	    var MulitSelect = (labelObj.getAttribute("MulitSelect")||"True");
	    var methodName = (labelObj.getAttribute("methodName")||" ");
	    var formHeight = (labelObj.getAttribute("formHeight")||"0");
	    var English = (labelObj.getAttribute("English")||"False");
	    var style = (labelObj.getAttribute("style")||" ");
	    style = style.cssText;
	    var textareaId = id + "_input";
	    var valueId = id + "_value";
	    var valueHidden = id + "_valueHidden";
	    var ctrlType = id + "_type";
		var html = "";
		if(MulitSelect == "True" || MulitSelect == "true")
		{
		    html += "<div id='"+ id+ "' ajaxClassName='"+ ajaxClassName+ "' CustomTemplateSingle='"+ CustomTemplateSingle+ "' ";
		    html += "DataSourceString='"+ DataSourceString+ "' formWidth='"+ formWidth+ "' MessageTemplate='"+ MessageTemplate+ "' NullValue='"+ NullValue+ "' CustomPageUrl='"+ CustomPageUrl+ "' Filter='"+ Filter+ "' Rows='"+ Rows+ "' ";
		    html += "CustomTemplateMulti='"+ CustomTemplateMulti+ "' Validate='"+ Validate+ "' tagData='"+ tagData+ "' MulitSelect='"+ MulitSelect+ "' methodName='"+ methodName+ "' formHeight='"+ formHeight+ "' ";
		    html += "English='"+ English+ "' style='"+ style+ "' >";
		    html += "<textarea id='" + textareaId + "' rows='" + Rows + "' readonly='readonly' style='cursor:pointer;height:" + height + ";width: " + width + "' onclick=\"ZTEMulitSelectV1D0D0D0.searchinput('" + id + "','search')\"></textarea>";
		    html += "<input type='hidden' id='" + valueId + "'>";
		    html += "<input type='hidden' id='" + valueHidden + "'>";
		    html += "<input value='true' type='hidden' id='" + ctrlType + "'>";
		    html += "<img src='" + itpSelectPath + "search2.gif' style='height:16px;width:16px;border-width:0px;cursor:pointer' onclick=\"ZTEMulitSelectV1D0D0D0.searchinput('" + id + "','search')\"/>";
		    html += "<input type='image' name='ZteMultiSelect2' src='" + itpSelectPath + "clear.gif' onclick=\"ZTEMulitSelectV1D0D0D0.clearText('" + id + "')\" style='height:16px;width:16px;border-width:0px;cursor:pointer' />";
		    html += "</div>";
		}
		else
		{
		    html += "<div id='"+ id+ "' ajaxClassName='"+ ajaxClassName+ "' CustomTemplateSingle='"+ CustomTemplateSingle+ "' ";
		    html += "DataSourceString='"+ DataSourceString+ "' formWidth='"+ formWidth+ "' MessageTemplate='"+ MessageTemplate+ "' NullValue='"+ NullValue+ "' CustomPageUrl='"+ CustomPageUrl+ "' Filter='"+ Filter+ "' Rows='"+ Rows+ "' ";
		    html += "CustomTemplateMulti='"+ CustomTemplateMulti+ "' Validate='"+ Validate+ "' tagData='"+ tagData+ "' MulitSelect='"+ MulitSelect+ "' methodName='"+ methodName+ "' formHeight='"+ formHeight+ "' ";
		    html += "English='"+ English+ "' style='"+ style+ "' >";
		    
		    html += "<input type='text' id='" + textareaId + "' style='width: " + width + "' onBlur=\"ZTEMulitSelectV1D0D0D0.onBlurevent('" + id + "')\" onkeydown=\"ZTEMulitSelectV1D0D0D0.keydown(event,'" + id + "')\"></input>";
		    html += "<input type='hidden' id='" + valueId + "'>";
		    html += "<input type='hidden' id='" + valueHidden + "'>";
		    html += "<input value='false' type='hidden' id='" + ctrlType + "'>";
		    html += "<img src='" + itpSelectPath + "search2.gif' style='height:16px;width:16px;border-width:0px;cursor:pointer' onclick=\"ZTEMulitSelectV1D0D0D0.searchinput('" + id + "','search')\"/>";
		    
		}
		labelObj.outerHTML = html;
	}
	function showAddSelectWin(id)
	{
			var argArray = new Array();
	        argArray[0] = new Array();
	        argArray[1] = new Array();
	        var modalUrl = "selectUser/multiSelectUser.html"; //模态窗口地址
	        var features = "dialogHeight: 600px;dialogWidth: 800px;help: no; status: no; scroll: yes;resizable: yes";	
	        var rtnValues = window.showModalDialog(modalUrl,argArray,features); //调用模态窗口
	
	        if(rtnValues) //如果模态窗口通过确定返回，有返回值
	        {
	           var userIds = '';
		       for (var i=0; i < argArray[0].length; i++)
		       {
			
		           userIds += argArray[0][i];
		           if(i < argArray[0].length -1)
		           {
		              userIds += ',';
		           }
		       }
		       var userNames = '';
		       for (var i=0; i < argArray[1].length; i++)
		       {
			
			       var tempName = argArray[1][i];
			       tempName = tempName.substr(0,tempName.indexOf("--"));
		           userNames += tempName;
		           if(i < argArray[1].length -1)
		           {
		              userNames += ',';
		           }
		       }
		       document.getElementById(id).innerHTML = userNames;
		       document.getElementById(id + 'True').value = userIds;
	       }
	       else //模态窗口通过关闭和取消返回  
	       {
		       return;
	       }
	}
	var itpSelectPath = "";
	function itpSelectCtrl_init()
	{
	    //先获取当前文件的路径
	    var itpSelectScripts = document.getElementsByTagName("script");
	    for(var i=0;i<itpSelectScripts.length;i++)
	    {
	        var src = itpSelectScripts[i].getAttribute("src");
	        if(src != null && src.indexOf("itp_select") > -1)
	        {
	           itpSelectPath = src.substring(0,src.indexOf("itp_select"));
	        }
	    }
		var tags = document.getElementsByTagName(SELECT_TAG);
		if(tags.length>0)
		{
		    //ZTEMulitSelectV1D0D0D0 = new Object();
			for(var i =0;i<document.getElementsByTagName(SELECT_TAG).length;)
			{
				itpSelectCtrlShow(document.getElementsByTagName(SELECT_TAG)[0].id);
			}
		}
	}
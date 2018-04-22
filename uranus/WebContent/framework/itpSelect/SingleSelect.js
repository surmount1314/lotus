var dts = window.dialogArguments;
var MsgtitleForm = "数据选择";
var MsgtitleKeyWord = "关键字";
var MsgtitleHit = "请填写查询条件";
var MsgtitleHitTips = "";
var MsgSearch = "查询";
var MsgSelect = "选择";
var MsgAll = "全部";
var MsgFirstPage = "首页";
var MsgNextPage = "下一页";
var MsgPrePage = "上一页";
var MsgLastPage = "末页";
var MsgNoData = "部分关键字查不到结果。";
var MsgGetDataErr = "对不起，系统取数据出错！";
var MsgDataFormatErr = "返回数据格式不正确";
var MsgClassErr = "请先设置控件需要调用的类名以及方法名。";
var MsgNoKeyWord = "请输入关键字，按回车或点查询按纽。";
var MsgPageFormat = "第{pagenow}页/共{pagemax}页 共{pagemaxnum}条记录 每页{selectpagesize}行{firstpage}{prepage}{gotext}{gopage}{nextpage}{lastpage}";

var itpSelectPath = dts[19];

if (dts[13] != "") {
    MsgtitleForm = dts[13];
}
// 加载语言
if (dts[15] == "Dept") {
    if (dts[14] == "True") {
        js_include("lang/depten.js");
    }
    else {
        js_include("lang/deptcn.js");
    }
}
else if (dts[15] == "Employee") {
    if (dts[14] == "True") {
        js_include("lang/employeeen.js");
    }
    else {
        js_include("lang/employeecn.js");
    }
}
else {
    if (dts[14] == "True") {
        js_include("lang/en.js");
    }
}
if (dts[16] != "") {
    js_include(dts[16]);
}

var datadt;
var pagenow = 1;

$(document).ready(function() {
    pageinfo();
    $("#searchKey").focus();
    if (dts[10] != dts[18]) {
        $("#searchKey").attr("value", dts[10]);
    }
    $("#searchKey").bind('keydown', function(event) {
        if (event.keyCode == 13) {//event.keyCode == 9 tab
            searchresult(1);
        }
    });
    $("#gotext").bind('keydown', function(event) {
        if (event.keyCode == 13) {//event.keyCode == 9 tab
            searchresult(document.getElementById('gotext').value);
        }
    });
    document.title = MsgtitleForm;
    $("#MsgtitleHit").html(MsgtitleHit);
    //$("#MsgtitleHitTips").html(MsgtitleHitTips);
    $("#searchKey").attr("title", MsgtitleHitTips);
    if (dts[2] != "") {
        $("#MsgtitleKeyWord").html(dts[2]);
    }
    else {
        $("#MsgtitleKeyWord").html(MsgtitleKeyWord);
    }
    $("#MsgAll").html(MsgAll);
    initdt();

    if ($("#searchKey").attr("value") != "") {
        searchresult(1);
    }
});

function js_include($script) {
    var script = document.createElement('script');
    script.src = $script;
    script.type = 'text/javascript';
    var head = document.getElementsByTagName('head').item(0);
    head.appendChild(script);
}

function pageinfo() {
    //"第{pagenow}页/共{pagemax}页 共{pagemaxnum}条记录 每页{selectpagesize}行{firstpage}{prepage}{gotext}{gopage}{nextpage}{lastpage}"
    MsgPageFormat = MsgPageFormat.replace("{pagenow}","<span id='pagenow'>1</span>");
    MsgPageFormat = MsgPageFormat.replace("{pagemax}","<span id='pagemax'>1</span>");  
    MsgPageFormat = MsgPageFormat.replace("{pagemaxnum}","<span id='pagemaxnum'>1</span>");
    MsgPageFormat = MsgPageFormat.replace("{selectpagesize}",getSelectStr());
    MsgPageFormat = MsgPageFormat.replace("{firstpage}","<span id='firstpage'>1</span>");
    MsgPageFormat = MsgPageFormat.replace("{prepage}","<span id='prepage'>1</span>");
    MsgPageFormat = MsgPageFormat.replace("{gotext}","<input type='text' class='page_txt' name='gotext' id='gotext' style='width: 30px;' />");
    MsgPageFormat = MsgPageFormat.replace("{gopage}","<input class='btn_go' type='button' name='gopage' value='Go' id='gopage' onclick='searchresult(document.getElementById(\"gotext\").value);' />");
    MsgPageFormat = MsgPageFormat.replace("{nextpage}","<span id='nextpage'>1</span>");
    MsgPageFormat = MsgPageFormat.replace("{lastpage}", "<span id='lastpage'>1</span>");
    $("#pagetd").html(MsgPageFormat);
}

function getSelectStr()
{
    var str = "";
    str += "<select name='selectpagesize' id='selectpagesize' onchange='selectonchange();'>";
    str += "<option value='10' selected>10</option>";
    str += "<option value='20'>20</option>";
    str += "<option value='30'>30</option>";
    str += "<option value='40'>40</option>";
    str += "<option value='50'>50</option>";
    str += "<option value='0'><span id='MsgAll'></span></option>";
    str += "</select>";
    return str;
}

function selectMan(i) {
    window.parent.returnValue = true;
    dts[10] = datadt.getValue(i, 0);
    dts[11] = datadt.getValue(i, 1);
    top.close();
}

function mover(tr) {
    if (tr.thisselected != "true") {
        tr.className = "tr_hover";
    }
}
function mout(tr) {
    if (tr.thisselected != "true") {
        tr.className = tr.oldclass;
    }
}

function selectrow(tr) {
    var trs = $("[thisselected='true']");
    if (trs != undefined) {
        trs.each(function() {
        this.thisselected = "false";
        this.className = tr.oldclass;
        })
    }
    tr.thisselected = "true";
    tr.className = "tr_selected";
}


function searchresult(pagenum) {
    var txt = document.all.searchKey.value;
    //不做检测，由后台自己检测sql漏洞，因为部门查询等中会包含-等特殊字符，因此不作限制
//    if (txt.indexOf("%") >= 0 || txt.indexOf("_") >= 0 || txt.indexOf("-") >= 0 || txt.indexOf("'") >= 0 || txt == "") {
//        document.all.searchKey.value = "";
//        alert(MsgNoKeyWord);
//        $("#searchKey").focus();
//        return;
    //    }
    if (txt == "") {
        alert(MsgNoKeyWord);
        $("#searchKey").focus();
        return;
    }
    document.getElementById("busy").style.display = "";
    document.getElementById("btnSearch").disabled = "disabled";
    try {
        //document.all.datas.innerHTML = ""; //清空左边列表中所有数据
        $("#databody").html("");

        //var dts = window.dialogArguments; //传参，及传引用句柄
        //var ctlName = dts[1];

        //if (ctlName.ajaxClassName && ctlName.methodName) {
        if (dts[4] && dts[5]) {
            //调用Ajax.js构造Ajax对象
            var ajaxObj = new AjaxObj(); //构造AjaxObj对象
            ajaxObj.className = dts[4]; //ctlName.ajaxClassName; //类名
            ajaxObj.method = dts[5]; //ctlName.methodName; //按部门查询
            ajaxObj.parameter[0] = document.all.searchKey.value; //方法参数
            ajaxObj.parameter[1] = dts[6]; //ctlName.tagData; //附属信息
            ajaxObj.parameter[2] = dts[7]; //ctlName.Filter; //附属信息
            ajaxObj.parameter[3] = pagenum; // 当前页数

            var selectpagesize = $("#selectpagesize");
            ajaxObj.parameter[4] = selectpagesize.find("option:selected").text(); // 每页记录数
            ajaxObj.parameter[5] = $("#pagemaxnum").html();                // 记录总数

            ajaxObj.callBack = addList; //返回处理函数
            ajaxObj.errHandler = errHandler; //错误处理函数
            execMethod(ajaxObj); //执行Ajax调用
        }
        else {
            alert(MsgClassErr);
        }
    }
    catch (ex) {
    }
    finally {
        //ZTEDeptSelectItem.setCount();
    }
}

errHandler = function() {
    alert(MsgGetDataErr);
    document.getElementById("busy").style.display = "none";
    document.getElementById("btnSearch").disabled = "";
}

showErr = function(errmsg) {
$("#searchresultdata").css("display", "none");
$("#pageinfotable").css("display", "none");
$("#tableContainer").css("display", "none");    
    $("#errmsgtable").css("display", "");
    $("#errmsg").html(errmsg);
}

selectonchange = function() {
    //searchresult(pagenow);改变每页显示数时使用第一页
    searchresult(1);
}

addList = function(dt) {
    try {
        if (arguments.length == 0) //当无参数时，通过Ajax对象调用
        {
            dt = this.dataTable;
        }
        else {
            if (dt == undefined) {
                return;
            }
        }

        // 设置初始值
        var page = 0;
        var pagesize = 10;
        var maxnum = dt.count;
        var maxpage = 0;

        try {
            // 获取传递过来的值
            page = dt.htData["Page"];
            pagesize = dt.htData["PageSize"];
            maxnum = dt.htData["MaxNum"];
            maxpage = dt.htData["MaxPage"];
        }
        catch (ex)
            { }
        var strColumnWidth = dt.htData["ColumnWidth"];
        var strHideColumn = dt.htData["HideColumn"];
        var strColumnName = dt.htData["ColumnName"];
        var arrColumnWidth = new Array();
        var arrHideColumn = new Array();
        var arrColumnName = new Array();
        try {
            arrColumnWidth = strColumnWidth.split(",");
        }
        catch (ex)
            { }
        try {
            arrHideColumn = strHideColumn.split(",");
        }
        catch (ex)
            { }
        try {
            arrColumnName = strColumnName.split(",");
        }
        catch (ex)
            { }

        if (maxpage == 0) {
            page = 0;
            $("#selectpagesize").attr("disabled", "disabled");
            $("#gotext").attr("disabled", "disabled");
            $("#gopage").attr("disabled", "disabled");
        }
        else {
            $("#selectpagesize").attr("disabled", "");
            $("#gotext").attr("disabled", "");
            $("#gopage").attr("disabled", "");
        }

        pagenow = page;

        $("#datathead").html("");
        $("#databody").html("");
        $("#pagenow").html(page);
        $("#pagemax").html(maxpage);
        $("#pagemaxnum").html(maxnum);

        if (page <= 1) {
            $("#firstpage").html("<font face='webdings' title='" + MsgFirstPage + "'>9</font>");
            $("#prepage").html("<font face='webdings'  title='" + MsgPrePage + "'>7</font>");
        }
        else {
            var nextpage = page;
            nextpage--;
            $("#firstpage").html("<a href = '#' onclick= 'searchresult(1);'><font face='webdings' title='" + MsgFirstPage + "'>9</font></a>");
            $("#prepage").html("<a href = '#' onclick = 'searchresult(" + nextpage + ");'><font face='webdings'  title='" + MsgPrePage + "'>7</font></a>");
        }
        if (page == maxpage) {
            $("#lastpage").html("<font face='webdings' title='" + MsgLastPage + "'>:</font>");
            $("#nextpage").html("<font face='webdings'  title='" + MsgNextPage + "'>8</font>");
        }
        else {
            var nextpage = page;
            nextpage++;
            $("#lastpage").html("<a href = '#' onclick= 'searchresult(" + maxpage + ");'><font face='webdings' title='" + MsgLastPage + "'>:</font></a>");
            $("#nextpage").html("<a href = '#' onclick= 'searchresult(" + nextpage + ");'><font face='webdings'  title='" + MsgNextPage + "'>8</font></a>");
        }


        datadt = dt;
        var strKey = document.getElementById("searchKey").value.split(",");
        var countKey = strKey.length;
        if (strKey[strKey.length - 1] == "") {
            countKey = strKey.length - 1;
        }

        var DataThead = $("#datathead");
        var DataBody = $("#databody");

        //根据查询结果选择不同的操作
        if (dt.count == 0) //如果查询结果为0条数据
        {
            showErr(MsgNoData);
            return;
        }
        if (dt.rows[0].length < 2) {
            showErr(MsgDataFormatErr);
            return;
        }
        else if (dt.count == 2 && page == 1 && pagesize > 1) //如果查询结果为1条数据，则直接返回
        {
            selectMan(1);
        }
        else if (dt.count >= 1) //如果查询结果为多条数据或者没数据（没数据时dt.count == 1）
        {
            $("#searchresultdata").css("display", "");
            $("#pageinfotable").css("display", "");
            $("#tableContainer").css("display", "");
            $("#errmsgtable").css("display", "none");
            var iColumn = 1;
            var strBody = "";
            for (var i = 0; i < dt.count; i++) {
                var strWidth = "";
                if (arrColumnWidth.length > 0 && arrColumnWidth[0] != "") {
                    strWidth = "width='" + arrColumnWidth[0] + "'";
                }
                if (i == 0) {
                    var strthead = "";
                    strthead += "<tr class='tr_title'><td " + strWidth + ">" + MsgSelect + "</td>";
                    for (var j = 0; j < dt.rows[0].length; j++) {
                        if ($.inArray(dt.getValue(0, j), arrHideColumn) >= 0) {
                            continue;
                        }
                        strWidth = "";
                        var iColumnWidth = j;
                        iColumnWidth++;
                        if (arrColumnWidth.length > iColumnWidth && arrColumnWidth[iColumnWidth] != "") {
                            strWidth = "width='" + arrColumnWidth[iColumnWidth] + "'";
                        }
                        var scolumnname = dt.getValue(i, j);
                        if (arrColumnName.length > 0 && arrColumnName[j] != "") {
                            scolumnname = arrColumnName[j];
                        }
                        strthead += "<td " + strWidth + ">";
                        strthead += scolumnname;
                        strthead += "</td>";
                        iColumn++;
                    }
                    strthead += "</tr>";
                    DataThead.html(strthead);
                }
                else {
                    var strclass = "";
                    if ((i / 2 | 0) == (i / 2)) {
                        strclass = "tr_even";
                    }
                    strBody += "<tr thisselected='false' oldclass ='" + strclass + "' class='" + strclass + "' onmouseover='mover(this);' onmouseout='mout(this);' onclick='selectrow(this)' ondblclick='selectMan(" + i + ")'><td " + strWidth + "><a class='aaaaaa' href='#' onclick='selectMan(" + i + ")'>" + MsgSelect + "</a></td>";
                    for (var j = 0; j < dt.rows[0].length; j++) {
                        if ($.inArray(dt.getValue(0, j), arrHideColumn) >= 0) {
                            continue;
                        }
                        strWidth = "";
                        var iColumnWidth = j;
                        iColumnWidth++;
                        if (arrColumnWidth.length > iColumnWidth && arrColumnWidth[iColumnWidth] != "") {
                            strWidth = "width='" + arrColumnWidth[iColumnWidth] + "'";
                        }
                        strBody += "<td " + strWidth + ">";
                        strBody += dt.getValue(i, j);
                        strBody += "</td>";
                    }
                    strBody += "</tr>";
                }
            }
            // 没有数据时提示
            if (dt.count == 1) {
                strBody += "<tr><td colspan = " + iColumn + "><font color='red'>" + MsgNoData;
                strBody += "</font></td></tr>";
            }
            $("#pagetd").attr("colspan", iColumn);
            DataBody.html(strBody);

            var DataBodyHeight = $("#searchresultdata")[0].clientHeight;
            if (DataBodyHeight < 270) {
                $("#tableContainer").css("height", DataBodyHeight);
            }
            else {
                $("#tableContainer").css("height", 270);
            }

            $(".aaaaaa:first").focus();
        }
    }
    finally {
        document.getElementById("busy").style.display = "none";
        document.getElementById("btnSearch").disabled = "";
    }
}

function initdt() {
    $("#btnSearch").attr("value", MsgSearch);
    document.title = MsgtitleForm;
    if (dts[8] != "" && dts[8] != " ") {
        var xmlDoc = new ActiveXObject("Msxml2.DOMDocument");
        xmlDoc.async = false;
        xmlDoc.loadXML(dts[8]);

        var dt = new DataTable();
        dt.fill(xmlDoc);
        addList(dt);
    }
    addList(dts[12]);
}
    
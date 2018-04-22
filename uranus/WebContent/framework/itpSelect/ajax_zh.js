
function AjaxObj() {
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
    var url = location.host + "/" + location.pathname.substring(0, location.pathname.lastIndexOf("/") + 1) + "selectQuery.jsp?path=getdata&"
    url = "http://" + url.replace("//", "/");
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
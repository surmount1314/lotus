<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ page language="java" import="java.lang.reflect.Method"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insert title here</title>
<%
//单选多选共同参数
String className = request.getParameter("c");
String methodName = request.getParameter("m");
String keyWord = request.getParameter("p0");
String tagdata = request.getParameter("p1");
String filter = request.getParameter("p2");
//单选的参数
String pagenum = request.getParameter("p3");
String pagesize = request.getParameter("p4");
String maxnum = request.getParameter("p5");

Object[] param = null;
if(pagenum != null || pagesize != null || maxnum != null)
{
    param = new Object[6];
    param[0] = keyWord;
    param[1] = tagdata;
    param[2] = filter;
    param[3] = pagenum;
    param[4] = pagesize;
    param[5] = maxnum;
}
else
{
    param = new Object[3];
    param[0] = keyWord;
    param[1] = tagdata;
    param[2] = filter;
}

Object obj = Class.forName(className).newInstance();
Class clazz = obj.getClass();
Class[] classArgs = new Class[param.length];  
for (int i = 0; i < param.length; i++) 
{   
   classArgs[i] = param[i].getClass();   
}   
Method method = clazz.getMethod(methodName, classArgs);   
String result = (String)method.invoke(obj, param);
out.print(result);
%>
</head>
<body>

</body>
</html>
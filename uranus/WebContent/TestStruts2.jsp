<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title></title>
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
  </head>
  <body>
	<form  action="deployment.action" method="post" enctype="multipart/form-data">
		文件: <input type="file" name="upload">
		用户：<input type="text" name="username"><br>
		密码：<input type="password" name="password"><br>
		<input type="submit" value="登录">
	</form>
  </body>
</html>

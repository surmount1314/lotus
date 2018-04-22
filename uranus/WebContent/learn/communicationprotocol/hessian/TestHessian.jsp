<%@page import="com.lotus.learn.communicationprotocol.hessian.server.service.interfaces.IHessianServerLearnSV"%>
<%@page import="com.caucho.hessian.client.HessianProxyFactory"%>
<%@page language="java"%>
<%
	HessianProxyFactory factory = new HessianProxyFactory();
	String url = ("http://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath() + "/hello");
	IHessianServerLearnSV basic = (IHessianServerLearnSV) factory.create(IHessianServerLearnSV.class, url);
	out.println("Hello: " + basic.sayHello("jun"));
%>
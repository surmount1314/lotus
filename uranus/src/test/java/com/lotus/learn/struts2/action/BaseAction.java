package com.lotus.learn.struts2.action;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.ServletActionContext;

import com.opensymphony.xwork2.ActionSupport;

public class BaseAction extends ActionSupport {
	private static final long serialVersionUID = 1L;
	
	protected final Log log = LogFactory.getLog(getClass());
	
	protected ServletActionContext servletActionContext;
	
	
	protected HttpServletRequest getRequest(){
		return servletActionContext.getRequest();
	}
	
	protected HttpServletResponse getResponse(){
		return servletActionContext.getResponse();
	}
	
	protected HttpSession getSession() {
		return getRequest().getSession();
	}
	
	protected HttpSession getSession(boolean create){
		return getRequest().getSession(create);
	}
	
	public ServletContext getServletContext(){
		return servletActionContext.getServletContext();
	}
	
	protected String getRootPath(){
		return getServletContext().getRealPath("/");
	}
}

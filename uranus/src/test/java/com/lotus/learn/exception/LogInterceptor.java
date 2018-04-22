package com.lotus.learn.exception;

import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

public class LogInterceptor implements MethodInterceptor {

	public Object invoke(MethodInvocation invocation) throws Throwable {
		Log loger = LogFactory.getLog(LogInterceptor.class);

		loger.info("--Log By Andy Chan -----------------------------------------------------------------------------");
		loger.info(invocation.getMethod() + ":BEGIN!--(Andy ChanLOG)");// 方法前的操作
		Object obj = invocation.proceed();// 执行需要Log的方法
		loger.info(invocation.getMethod() + ":END!--(Andy ChanLOG)");// 方法后的操作
		loger.info("-------------------------------------------------------------------------------------------------");

		return obj;
	}
}
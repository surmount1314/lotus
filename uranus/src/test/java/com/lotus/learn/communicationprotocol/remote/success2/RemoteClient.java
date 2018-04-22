package com.lotus.learn.communicationprotocol.remote.success2;

import java.rmi.RMISecurityManager;

import javax.naming.Context;
import javax.naming.InitialContext;

public class RemoteClient {
	private static String rmiUrlBase = "rmi://127.0.0.1:1099/";

	// jdk5后新增的变参语法
	public static void main(String... args) {
		// 先安装安全管理器：
		if (System.getSecurityManager() == null) {
			System.setSecurityManager(new RMISecurityManager());
		}
		try {
			// 获取上下文
			Context context = new InitialContext();
			// 通过名字服务来查找远程对象
			TestRemoteIntf r_serverComp = (TestRemoteIntf) context.lookup(rmiUrlBase + "Test1");

			String rsltStr = (String) r_serverComp.getName("2");

			System.out.println("调用远程对象成功；结果：" + rsltStr);
		} catch (Exception ex) {
			System.out.println("调用远程对象失败：" + ex.getMessage());
		}
	}
}

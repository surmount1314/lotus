package com.lotus.learn.communicationprotocol.remote.success2;

import java.rmi.RMISecurityManager;

import javax.naming.Context;
import javax.naming.InitialContext;

public class RemoteServer {
	// private static String urlBase="rmi://localhost";
	/**
	 * 该方法启动服务端
	 */
	public static void main(String[] args) {
		if (System.getSecurityManager() == null) {
			// 并未安装安全管理器，按装一个
			System.setSecurityManager(new RMISecurityManager());
		}

		try {
			TestRemoteSv r_component = new TestRemoteSv();

			// 获取JNDI名字服务上下文对象
			Context context = new InitialContext();
			// 绑定远程对象，绑定键必须以rmi：做前缀
			context.bind("rmi://127.0.0.1:1099/Test1", r_component);

			System.out.println("成功绑定远程对象");

		} catch (Exception ex) {
			System.out.println("绑定远程对象失败：" + ex.getMessage());
			ex.printStackTrace();
		}
	}
}

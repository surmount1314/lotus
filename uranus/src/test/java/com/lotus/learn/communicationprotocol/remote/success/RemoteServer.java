package com.lotus.learn.communicationprotocol.remote.success;

import java.rmi.Naming;
import java.rmi.registry.LocateRegistry;

public class RemoteServer {
	/**
	* 该方法启动服务端
	*/
	public static void main(String[] args) {
		try {
			LocateRegistry.createRegistry(1099);
			TestRemoteSVImpl r_component = new TestRemoteSVImpl();
			Naming.rebind("//localhost:1099/Hello", r_component);
			System.out.println("OK");
		} catch (Exception ex) {
			System.out.println("绑定远程对象失败：" + ex.getMessage());
		}
	}
}

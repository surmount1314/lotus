package com.lotus.learn.communicationprotocol.remote.success;

import java.rmi.Naming;

public class RemoteClient {
	public static void main(String[] args) throws Exception {
		ITestRemoteSV hello = (ITestRemoteSV) Naming.lookup("//localhost:1099/Hello");  
		System.out.println(hello.getName("liujun"));       
	}
}

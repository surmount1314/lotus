package com.lotus.learn.communicationprotocol.remote.success2;

import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;

public class TestRemoteSv extends UnicastRemoteObject implements TestRemoteIntf {

	protected TestRemoteSv() throws RemoteException {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getName(String test) throws RemoteException {
		// TODO Auto-generated method stub
		return test + "test";
	}

}

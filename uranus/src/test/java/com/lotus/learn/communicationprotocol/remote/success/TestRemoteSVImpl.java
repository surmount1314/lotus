package com.lotus.learn.communicationprotocol.remote.success;

import java.rmi.RemoteException;
import java.rmi.server.UnicastRemoteObject;

public class TestRemoteSVImpl extends UnicastRemoteObject implements ITestRemoteSV {

	protected TestRemoteSVImpl() throws RemoteException {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getName(String test) throws RemoteException {
		// TODO Auto-generated method stub
		return test + "test";
	}

}

package com.lotus.learn.communicationprotocol.remote.success;

import java.rmi.Remote;
import java.rmi.RemoteException;

public interface ITestRemoteSV extends Remote {

	public String getName(String test) throws RemoteException;
}

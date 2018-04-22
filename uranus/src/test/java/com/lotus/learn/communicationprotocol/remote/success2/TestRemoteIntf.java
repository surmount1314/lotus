package com.lotus.learn.communicationprotocol.remote.success2;

import java.rmi.Remote;
import java.rmi.RemoteException;

public interface TestRemoteIntf extends Remote {

	public String getName(String test) throws RemoteException;
}

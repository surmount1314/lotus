package com.lotus.learn.communicationprotocol.ftp;
import java.io.File;
import java.io.FileInputStream;

import org.apache.commons.net.ftp.FTPClient;

/**
 * Hello world!
 * 
 */
public class App {
	public static void main(String[] args) throws Exception {
		FTPClient client = new FTPClient();
		client.setDefaultTimeout(120 * 1000);

		boolean remoteVerificationEnabled = true;

		String ip = "127.0.0.1";
		remoteVerificationEnabled = true;
		client.connect(ip, 21);
		client.setRemoteVerificationEnabled(remoteVerificationEnabled);
		client.login("ftp", "ftp");
		
		
		File file = new File("E:\\opensource\\maven-repository\\commons-net\\commons-net\\1.4.1\\commons-net-1.4.1.jar.sha1");
		client.setFileType(2);
		client.changeWorkingDirectory(wrapper("/ftpUser/ftpUserRepository"));
		client.storeFile(wrapper("commons-net-1.4.1.jar.sha1"), new FileInputStream(file));
	    if (client.isConnected()) {
	    	client.disconnect();
	    }
	}

	private static String wrapper(String str) throws Exception {
		return new String(str.getBytes(), "ISO-8859-1");
	}
}

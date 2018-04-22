package com.lotus.learn.io;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.charset.Charset;

public class IOTest {

	/**
	 * 
	 * @param args 
	 * @author 刘俊
	 * @date 2014-7-31 上午09:13:38
	 */
	public static void main(String[] args) {
		try {
			Process ps = new ProcessBuilder("").start();
			Charset.forName("").decode(ByteBuffer.wrap("".getBytes()));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

}

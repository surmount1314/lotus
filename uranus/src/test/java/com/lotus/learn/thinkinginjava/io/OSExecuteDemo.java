package com.lotus.learn.thinkinginjava.io;

//: io/OSExecuteDemo.java
// Demonstrates standard I/O redirection.
import com.lotus.learn.thinkinginjava.net.mindview.util.OSExecute;

public class OSExecuteDemo {
	public static void main(String[] args) {
		OSExecute.command("javap OSExecuteDemo");
	}
} /*
 * Output: Compiled from "OSExecuteDemo.java" public class OSExecuteDemo extends java.lang.Object{ public OSExecuteDemo(); public static void
 * main(java.lang.String[]); }
 */// :~

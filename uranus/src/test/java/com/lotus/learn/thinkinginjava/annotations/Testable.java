//: annotations/Testable.java
package com.lotus.learn.thinkinginjava.annotations;

import com.lotus.learn.thinkinginjava.net.mindview.atunit.Test;

public class Testable {
	public void execute() {
		System.out.println("Executing..");
	}

	@Test
	void testExecute() {
		execute();
	}
} // /:~

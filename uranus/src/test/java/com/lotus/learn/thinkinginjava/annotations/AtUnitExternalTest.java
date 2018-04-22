//: annotations/AtUnitExternalTest.java
// Creating non-embedded tests.
package com.lotus.learn.thinkinginjava.annotations;

import com.lotus.learn.thinkinginjava.net.mindview.atunit.Test;
import com.lotus.learn.thinkinginjava.net.mindview.util.OSExecute;

public class AtUnitExternalTest extends AtUnitExample1 {
	@Test
	boolean _methodOne() {
		return methodOne().equals("This is methodOne");
	}

	@Test
	boolean _methodTwo() {
		return methodTwo() == 2;
	}

	public static void main(String[] args) throws Exception {
		OSExecute.command("java net.mindview.atunit.AtUnit AtUnitExternalTest");
	}
} /*
 * Output: annotations.AtUnitExternalTest . _methodOne . _methodTwo This is methodTwo
 * 
 * OK (2 tests)
 */// :~

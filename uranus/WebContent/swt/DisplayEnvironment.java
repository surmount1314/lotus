package com.lotus.learn.thinkinginjava.swt;

//: swt/DisplayEnvironment.java
import java.util.Map;

import org.eclipse.swt.SWT;
import org.eclipse.swt.layout.FillLayout;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Text;

import com.lotus.learn.thinkinginjava.swt.util.SWTApplication;
import com.lotus.learn.thinkinginjava.swt.util.SWTConsole;

public class DisplayEnvironment implements SWTApplication {
	public void createContents(Composite parent) {
		parent.setLayout(new FillLayout());
		Text text = new Text(parent, SWT.WRAP | SWT.V_SCROLL);
		for (Map.Entry entry : System.getenv().entrySet()) {
			text.append(entry.getKey() + ": " + entry.getValue() + "\n");
		}
	}

	public static void main(String[] args) {
		SWTConsole.run(new DisplayEnvironment(), 800, 600);
	}
} // /:~

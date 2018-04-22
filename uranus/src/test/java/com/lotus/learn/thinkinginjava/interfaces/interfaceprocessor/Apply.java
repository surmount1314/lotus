//: interfaces/interfaceprocessor/Apply.java
package com.lotus.learn.thinkinginjava.interfaces.interfaceprocessor;
import static com.lotus.learn.thinkinginjava.net.mindview.util.Print.*;

public class Apply {
  public static void process(Processor p, Object s) {
    print("Using Processor " + p.name());
    print(p.process(s));
  }
} ///:~

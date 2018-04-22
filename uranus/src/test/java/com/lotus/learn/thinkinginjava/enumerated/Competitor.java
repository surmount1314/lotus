package com.lotus.learn.thinkinginjava.enumerated;

//: enumerated/Competitor.java
// Switching one enum on another.

public interface Competitor<T extends Competitor<T>> {
	Outcome compete(T competitor);
} // /:~

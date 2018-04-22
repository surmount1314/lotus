package com.lotus.learn.thinkinginjava.concurrency;

//: concurrency/EvenGenerator.java
// When threads collide.

public class EvenGenerator extends IntGenerator {
	private static int currentEvenValue = 0;

	public int next() {
//	public synchronized int next() {
//		synchronized (EvenGenerator.class) {
//		synchronized (this) {
			System.out.println(Thread.currentThread());
			++currentEvenValue; // Danger point here!
			System.out.println(Thread.currentThread());
			++currentEvenValue;
			System.out.println(Thread.currentThread());
			return currentEvenValue;
//		}
	}

	public static void main(String[] args) {
		EvenChecker.test(new EvenGenerator(), new EvenGenerator());
	}
} /*
 * Output: (Sample) Press Control-C to exit 89476993 not even! 89476993 not even!
 */// :~

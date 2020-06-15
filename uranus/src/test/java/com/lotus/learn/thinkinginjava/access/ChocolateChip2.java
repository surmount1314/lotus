package com.lotus.learn.thinkinginjava.access;

//: access/ChocolateChip2.java
import com.lotus.learn.thinkinginjava.access.cookie2.Cookie;

public class ChocolateChip2 extends Cookie {
	public ChocolateChip2() {
		System.out.println("ChocolateChip2 constructor");
	}

	public void chomp() {
		bite();
	} // Protected method

	public static void main(String[] args) {
		ChocolateChip2 x = new ChocolateChip2();
		x.chomp();
	}
} /*
 * Output: Cookie constructor ChocolateChip2 constructor bite
 */// :~
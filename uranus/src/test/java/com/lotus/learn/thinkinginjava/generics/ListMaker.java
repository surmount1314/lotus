package com.lotus.learn.thinkinginjava.generics;//: generics/ListMaker.java

import java.util.*;

public class ListMaker<T> {
	List<T> create() {
		return new ArrayList<T>();
	}

	public static void main(String[] args) {
		ListMaker<String> stringMaker = new ListMaker<String>();
		List<String> stringList = stringMaker.create();
	}
} // /:~

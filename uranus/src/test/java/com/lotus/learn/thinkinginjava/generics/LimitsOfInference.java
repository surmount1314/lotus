package com.lotus.learn.thinkinginjava.generics;//: generics/LimitsOfInference.java

import java.util.List;
import java.util.Map;

import com.lotus.learn.thinkinginjava.typeinfo.pets.Person;
import com.lotus.learn.thinkinginjava.typeinfo.pets.Pet;

public class LimitsOfInference {
	static void f(Map<Person, List<? extends Pet>> petPeople) {
	}

	public static void main(String[] args) {
		// f(New.map()); // Does not compile
	}
} // /:~

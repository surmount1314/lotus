package com.lotus.learn.thinkinginjava.generics;//: generics/ExplicitTypeSpecification.java

import java.util.List;
import java.util.Map;

import com.lotus.learn.thinkinginjava.net.mindview.util.New;
import com.lotus.learn.thinkinginjava.typeinfo.pets.Person;
import com.lotus.learn.thinkinginjava.typeinfo.pets.Pet;

public class ExplicitTypeSpecification {
	static void f(Map<Person, List<Pet>> petPeople) {
	}

	public static void main(String[] args) {
		f(New.<Person, List<Pet>> map());
	}
} // /:~

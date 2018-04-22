package com.lotus.learn.thinkinginjava.generics;//: generics/SimplerPets.java

import java.util.List;
import java.util.Map;

import com.lotus.learn.thinkinginjava.net.mindview.util.New;
import com.lotus.learn.thinkinginjava.typeinfo.pets.Person;
import com.lotus.learn.thinkinginjava.typeinfo.pets.Pet;

public class SimplerPets {
	public static void main(String[] args) {
		Map<Person, List<? extends Pet>> petPeople = New.map();
		// Rest of the code is the same...
	}
} // /:~

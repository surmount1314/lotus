package com.lotus.learn.thinkinginjava.containers;

//: containers/IndividualTest.java
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

import com.lotus.learn.thinkinginjava.holding.MapOfList;
import com.lotus.learn.thinkinginjava.typeinfo.pets.Individual;
import com.lotus.learn.thinkinginjava.typeinfo.pets.Pet;

public class IndividualTest {
	public static void main(String[] args) {
		Set<Individual> pets = new TreeSet<Individual>();
		for (List<? extends Pet> lp : MapOfList.petPeople.values())
			for (Pet p : lp)
				pets.add(p);
		System.out.println(pets);
	}
} /*
 * Output: [Cat Elsie May, Cat Pinkola, Cat Shackleton, Cat Stanford aka Stinky el Negro, Cymric Molly, Dog Margrett, Mutt Spot, Pug Louie aka Louis
 * Snorkelstein Dupree, Rat Fizzy, Rat Freckly, Rat Fuzzy]
 */// :~
package com.lotus.learn.thinkinginjava.typeinfo;

//: typeinfo/PetCount.java
// Using instanceof.
import static com.lotus.learn.thinkinginjava.net.mindview.util.Print.print;
import static com.lotus.learn.thinkinginjava.net.mindview.util.Print.printnb;

import java.util.HashMap;

import com.lotus.learn.thinkinginjava.typeinfo.pets.Cat;
import com.lotus.learn.thinkinginjava.typeinfo.pets.Dog;
import com.lotus.learn.thinkinginjava.typeinfo.pets.ForNameCreator;
import com.lotus.learn.thinkinginjava.typeinfo.pets.Hamster;
import com.lotus.learn.thinkinginjava.typeinfo.pets.Manx;
import com.lotus.learn.thinkinginjava.typeinfo.pets.Mouse;
import com.lotus.learn.thinkinginjava.typeinfo.pets.Mutt;
import com.lotus.learn.thinkinginjava.typeinfo.pets.Pet;
import com.lotus.learn.thinkinginjava.typeinfo.pets.PetCreator;
import com.lotus.learn.thinkinginjava.typeinfo.pets.Pug;
import com.lotus.learn.thinkinginjava.typeinfo.pets.Rat;
import com.lotus.learn.thinkinginjava.typeinfo.pets.Rodent;

public class PetCount {
	static class PetCounter extends HashMap<String, Integer> {
		public void count(String type) {
			Integer quantity = get(type);
			if (quantity == null)
				put(type, 1);
			else
				put(type, quantity + 1);
		}
	}

	public static void countPets(PetCreator creator) {
		PetCounter counter = new PetCounter();
		for (Pet pet : creator.createArray(20)) {
			// List each individual pet:
			printnb(pet.getClass().getSimpleName() + " ");
			if (pet instanceof Pet)
				counter.count("Pet");
			if (pet instanceof Dog)
				counter.count("Dog");
			if (pet instanceof Mutt)
				counter.count("Mutt");
			if (pet instanceof Pug)
				counter.count("Pug");
			if (pet instanceof Cat)
				counter.count("Cat");
			if (pet instanceof Manx)
				counter.count("EgyptianMau");
			if (pet instanceof Manx)
				counter.count("Manx");
			if (pet instanceof Manx)
				counter.count("Cymric");
			if (pet instanceof Rodent)
				counter.count("Rodent");
			if (pet instanceof Rat)
				counter.count("Rat");
			if (pet instanceof Mouse)
				counter.count("Mouse");
			if (pet instanceof Hamster)
				counter.count("Hamster");
		}
		// Show the counts:
		print();
		print(counter);
	}

	public static void main(String[] args) {
		countPets(new ForNameCreator());
	}
} /*
 * Output: Rat Manx Cymric Mutt Pug Cymric Pug Manx Cymric Rat EgyptianMau Hamster EgyptianMau Mutt Mutt Cymric Mouse Pug Mouse Cymric {Pug=3, Cat=9,
 * Hamster=1, Cymric=7, Mouse=2, Mutt=3, Rodent=5, Pet=20, Manx=7, EgyptianMau=7, Dog=6, Rat=2}
 */// :~

package com.lotus.learn.thinkinginjava.io;

//: io/Blips.java
// Simple use of Externalizable & a pitfall.
import static com.lotus.learn.thinkinginjava.net.mindview.util.Print.print;

import java.io.Externalizable;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInput;
import java.io.ObjectInputStream;
import java.io.ObjectOutput;
import java.io.ObjectOutputStream;

class Blip1 implements Externalizable {
	public Blip1() {
		print("Blip1 Constructor");
	}

	public void writeExternal(ObjectOutput out) throws IOException {
		print("Blip1.writeExternal");
	}

	public void readExternal(ObjectInput in) throws IOException, ClassNotFoundException {
		print("Blip1.readExternal");
	}
}

class Blip2 implements Externalizable {
//	Blip2() {
	public Blip2() {
		print("Blip2 Constructor");
	}

	public void writeExternal(ObjectOutput out) throws IOException {
		print("Blip2.writeExternal");
	}

	public void readExternal(ObjectInput in) throws IOException, ClassNotFoundException {
		print("Blip2.readExternal");
	}
}

public class Blips {
	public static void main(String[] args) throws IOException, ClassNotFoundException {
		print("Constructing objects:");
		Blip1 b1 = new Blip1();
		Blip2 b2 = new Blip2();
		ObjectOutputStream o = new ObjectOutputStream(new FileOutputStream("Blips.out"));
		print("Saving objects:");
		o.writeObject(b1);
		o.writeObject(b2);
		o.close();
		// Now get them back:
		ObjectInputStream in = new ObjectInputStream(new FileInputStream("Blips.out"));
		print("Recovering b1:");
		b1 = (Blip1) in.readObject();
		// OOPS! Throws an exception:
		print("Recovering b2:");
		b2 = (Blip2)in.readObject();
		// ! print("Recovering b2:");
		// ! b2 = (Blip2)in.readObject();
	}
} /*
 * Output: Constructing objects: Blip1 Constructor Blip2 Constructor Saving objects: Blip1.writeExternal Blip2.writeExternal Recovering b1: Blip1
 * Constructor Blip1.readExternal
 */// :~

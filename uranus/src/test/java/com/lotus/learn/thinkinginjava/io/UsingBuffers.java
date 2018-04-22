package com.lotus.learn.thinkinginjava.io;

//: io/UsingBuffers.java
import static com.lotus.learn.thinkinginjava.net.mindview.util.Print.print;

import java.nio.ByteBuffer;
import java.nio.CharBuffer;

public class UsingBuffers {
	private static void symmetricScramble(CharBuffer buffer) {
//		print("position:" + buffer.position());
		while (buffer.hasRemaining()) {
			buffer.mark();
			char c1 = buffer.get();
//			print("position1:" + buffer.position());
			char c2 = buffer.get();
//			print("position2:" + buffer.position());
			buffer.reset();
			buffer.put(c2).put(c1);
//			print("position3:" + buffer.position());
		}
	}

	public static void main(String[] args) {
		char[] data = "UsingBuffers".toCharArray();
		ByteBuffer bb = ByteBuffer.allocate(data.length * 2);
		CharBuffer cb = bb.asCharBuffer();
		cb.put(data);
		print(cb.rewind());
		symmetricScramble(cb);
		print(cb.rewind());
		symmetricScramble(cb);
		print(cb.rewind());
	}
} /*
 * Output: UsingBuffers sUniBgfuefsr UsingBuffers
 */// :~

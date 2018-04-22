package com.lotus.learn.threads;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class TestThreadException {
	public static void main(String[] args) throws Exception {
		ExecutorService es = Executors.newCachedThreadPool();

		for (int i = 100; i > 0; i--) {
			es.submit(new ThreadResult(i));
		}

		System.out.println("end");
		es.shutdown();
	}
}

class ThreadResult implements Runnable {
	private int second = 0;

	public ThreadResult(int second) {
		this.second = second;
	}

	@Override
	public void run() {
		try {
			Thread.sleep(second * 10);
			if (this.second == 3 || this.second == 4) {
				Thread.sleep(second * 1000);
				throw new Exception("" + second);
			}
		} catch (Exception e) {
//			e.printStackTrace();
		}
			Integer.parseInt("fddf");
	}

}

package com.lotus.learn.threads;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class GetResultThreads {

	public static void main(String[] args) throws Exception {
//		ExecutorService es = Executors.newCachedThreadPool();
//		ExecutorService es = Executors.newFixedThreadPool(20);
		ExecutorService es = Executors.newSingleThreadExecutor();

		List<Future<String>> list = new ArrayList<Future<String>>();
		for (int i = 100; i > 0; i--) {
			list.add(es.submit(new ThreadReturnResult(i)));
		}

		for (Iterator iterator = list.iterator(); iterator.hasNext();) {
			Future<String> future = (Future<String>) iterator.next();
			try {
				System.out.println(future.get());
			} catch (Exception e) {
				System.out.println("catched" + e.getMessage());
			}
		}
		System.out.println("end");
		es.shutdown();
	}
}

class ThreadReturnResult implements Callable<String> {
	private int second = 0;

	public ThreadReturnResult(int second) {
		this.second = second;
	}

	public String call() throws Exception {
		Thread.sleep(second * 10);
		if (this.second == 3 || this.second == 4) {
			Thread.sleep(second * 1000);
			throw new Exception("" + second);
		}
		return String.valueOf(this.second);
	}

}

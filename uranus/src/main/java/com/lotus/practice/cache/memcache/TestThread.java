import java.io.IOException;
import java.net.InetSocketAddress;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadFactory;
import java.util.concurrent.TimeUnit;

import net.spy.memcached.CASResponse;
import net.spy.memcached.CASValue;
import net.spy.memcached.MemcachedClient;
import net.spy.memcached.internal.OperationFuture;

class Test implements Runnable {
	private static MemcachedClient client = null;

	public Test(MemcachedClient client) {
		this.client = client;
	}

	@Override
	public void run() {
		for (int i = 0; i < 50; i++) {
			try {
				TimeUnit.MILLISECONDS.sleep(5);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			// GetFuture getFuture = client.asyncGet("counter");
			try {
				OperationFuture<CASValue<Object>> operationFuture = client.asyncGets("counter");
				CASValue<Object> cas = operationFuture.get();
				long casId = cas.getCas();
				String value = (String) cas.getValue();
				System.out.println("casId = " + casId);
				System.out.println("value = " + value);
				int intValue = Integer.parseInt(value);
				CASResponse casResponse = client.cas("counter", casId, (intValue + 1) + "");
				while (String.valueOf(casResponse).equals("EXISTS")) {
					OperationFuture<CASValue<Object>> operationFuture1 = client.asyncGets("counter");
					CASValue<Object> cas1 = operationFuture1.get();
					long casId1 = cas1.getCas();
					String value1 = (String) cas1.getValue();
					System.out.println("casId = " + casId1);
					System.out.println("value = " + value1);
					int intValue1 = Integer.parseInt(value1);
					casResponse = client.cas("counter", casId1, (intValue1 + 1) + "");
					System.out.println("casResponse = " +casResponse);
				}
			} catch (InterruptedException e) {
				e.printStackTrace();
			} catch (ExecutionException e) {
				e.printStackTrace();
			}
			// int counter = Integer.parseInt((String) client.get("counter"));
			// client.set("counter", 0, (counter + 1) + "");
		}
	}
}

public class TestThread {
	public static void main(String[] args) throws IOException, InterruptedException, ExecutionException {
		// InetSocketAddress inetSocketAddress = new InetSocketAddress("localhost", 11211);
		InetSocketAddress inetSocketAddress = new InetSocketAddress("192.168.108.1", 11211);
		MemcachedClient client = new MemcachedClient(inetSocketAddress);
		ExecutorService es = Executors.newCachedThreadPool(new ThreadFactory() {
			public Thread newThread(Runnable r) {
				Thread t = new Thread(r);
				t.setDaemon(true);
				return t;
			}
		});
		client.set("counter", 0, "0");
		for (int i = 0; i < 50; i++) {
			es.execute(new Test(client));
		}

		// InetSocketAddress inetSocketAddress1 = new InetSocketAddress("localhost", 11211);
		InetSocketAddress inetSocketAddress1 = new InetSocketAddress("192.168.108.1", 11211);
		MemcachedClient client1 = new MemcachedClient(inetSocketAddress1);
		ExecutorService es1 = Executors.newCachedThreadPool(new ThreadFactory() {
			public Thread newThread(Runnable r) {
				Thread t = new Thread(r);
				t.setDaemon(true);
				return t;
			}
		});
		for (int i = 0; i < 50; i++) {
			es1.execute(new Test(client1));
		}

		TimeUnit.SECONDS.sleep(20);
		System.out.println("counter = " + client.get("counter"));

		// client.delete("counter");
		client.flush();
		client.shutdown();
		client1.flush();
		client1.shutdown();
		// OperationFuture o = client.asyncIncr("ss", 1);
		// System.out.println(o.get());
	}
}

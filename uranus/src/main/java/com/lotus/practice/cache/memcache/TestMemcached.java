import java.io.IOException;
import java.net.InetSocketAddress;

import net.spy.memcached.MemcachedClient;

public class TestMemcached {

	@org.junit.Test
	public void testMem() {
		InetSocketAddress inetSocketAddress1 = new InetSocketAddress("192.168.108.1", 11211);
		try {
			MemcachedClient client1 = new MemcachedClient(inetSocketAddress1);
			client1.delete("counter");
			System.out.println(client1.get("counter"));
			client1.shutdown();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}

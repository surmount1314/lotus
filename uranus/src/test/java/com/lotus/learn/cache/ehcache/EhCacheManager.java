package com.lotus.learn.cache.ehcache;

import java.util.HashMap;
import java.util.Map;

import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;
import net.sf.ehcache.Element;


public class EhCacheManager {
	public static void main(String[] args) throws Exception {
		CacheManager manager = CacheManager.create("src/main/config/com/lotus/learn/cache/ehcache/ehcache.xml");
		Cache cache = manager.getCache("sampleCache1");
		Element element = new Element("key1", "value1");
		cache.put(element);
		
		System.out.println(manager.getCache("sampleCache1").get("key1").getValue());
		
		CacheManager.getInstance().shutdown();
		manager = CacheManager.create("src/main/config/com/lotus/learn/cache/ehcache/ehcache.xml");
		System.out.println(manager.getCache("sampleCache1").get("key1").getValue());
	}
	
	public static void test() throws Exception {
		CacheManager manager = CacheManager.create("ehcache.xml");
		
		Map a = new HashMap();
		Map b = new HashMap();
		b.keySet().removeAll(a.keySet());
	}
}

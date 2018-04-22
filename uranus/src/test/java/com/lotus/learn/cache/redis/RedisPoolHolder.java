package com.lotus.learn.cache.redis;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.naming.ConfigurationException;

public class RedisPoolHolder {
	private static Map<String, RedisPool> pools = null;
	private String poolName;
	
	private RedisPoolHolder(String poolName) {
		this.poolName = poolName;
	}
	
	/**
	 * 根据pool name获取redis pool对象
	 * @param poolName 池配置名称
	 * @return
	 */
	public static RedisPool getRedisPool(String poolName) {
		// 创建连接池Map
		if (null == pools) {
			synchronized (RedisPoolHolder.class) {
				if (null == pools) {
					pools = new ConcurrentHashMap<String, RedisPool>();
				}
			}
		}
		RedisPool redisPool = pools.get(poolName);
		if (null != redisPool) {
			return redisPool;
		}
		synchronized (pools) {
			redisPool = pools.get(poolName);
			if (null != redisPool) {
				return redisPool;
			}
			String host, password;
			int port, poolSize, timeout;
			
			// TODO 添加从properties文件获取,  host:10.11.20.107,port:6378,password:foobared,poolSize:10 格式
			String poolConf = ""; // 文件中取不到,从系统参数中获取
			if (poolConf.length() <= 0)
				throw new IllegalArgumentException("illegal redis pool name:" + poolName + ", must not be blank");
			
			host = "";
			port = 6378;
			password = "";
			poolSize = 10;
			timeout = 3000;

			// 构造并初始化连接池
			redisPool = new RedisPool(host, port, password, poolSize, timeout);
			redisPool.init();
			
			pools.put(poolName, redisPool);
		}
		
		return redisPool;
	}
}

package com.lotus.learn.quartz;

import java.util.List;

import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.scheduling.quartz.QuartzJobBean;

import com.lotus.learn.hibernate.dao.BaseDao;

public class TestQuartz extends QuartzJobBean {

	public static int count = 0;
	@Override
	protected void executeInternal(JobExecutionContext arg0) throws JobExecutionException {
		System.out.println(System.currentTimeMillis());
	}

	public void test(String aa, BaseDao baseDAO, List list) {
		System.out.println("aaaaaa--" + aa);
		count ++;
		if (count == 1) {
			System.out.println("count=" + 1);
			return;
		}
	}
}

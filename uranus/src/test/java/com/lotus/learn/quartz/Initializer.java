package com.lotus.learn.quartz;

import java.text.ParseException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.Trigger;
import org.quartz.core.jmx.CronTriggerSupport;
import org.quartz.core.jmx.JobDetailSupport;
import org.quartz.impl.StdSchedulerFactory;

public class Initializer {
	public static void main(String[] args) throws Exception {
		try {
			JobDetailSupport jobDetailSupport = new JobDetailSupport();
			Map map = new HashMap();
			map.put("name", "cmhksynchtrigger");
			map.put("group", "cmhkSynch");
			map.put("jobClass", RzmsShedule.class.getName());
			try {
				StdSchedulerFactory fct = new StdSchedulerFactory();
				Scheduler scheduler = fct.getScheduler();
				scheduler.start();
				JobDetail jobDetail = jobDetailSupport.newJobDetail(map);
				
				CronTriggerSupport cronTriggerSupport = new CronTriggerSupport();
				Map triggerMap = new HashMap();
				triggerMap.put("cronExpression", "0/5 * * * * ?");
				triggerMap.put("name", "cmhksynchtriggername");
				
				// jobDetail的name和group要和jobName、jobGroup一致
				triggerMap.put("jobName", "cmhksynchtrigger");
				triggerMap.put("jobGroup", "cmhkSynch");
				triggerMap.put("startTime", new Date());
				Trigger trigger = cronTriggerSupport.newTrigger(triggerMap);
				
				scheduler.scheduleJob(jobDetail, trigger);
				
//				scheduler.unscheduleJob(trigger.getKey());
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			} catch (SchedulerException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			//deploySV.addDeployProcess(upload);
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println();
		}
	}
}

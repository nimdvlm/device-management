package cn.edu.bupt.demo.scheduleTasks;

import org.quartz.DisallowConcurrentExecution;
import org.quartz.Job;
import org.quartz.JobDetail;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import java.util.Date;

/**
 * Created by tangjialiang on 2018/1/16.
 */

@DisallowConcurrentExecution
public class HelloQuartz implements Job {

    public void execute(JobExecutionContext context) throws JobExecutionException {
        JobDetail detail = context.getJobDetail();
        String name = detail.getJobDataMap().getString("name");
        System.out.println("say hello to " + name + " at " + new Date());
    }
}
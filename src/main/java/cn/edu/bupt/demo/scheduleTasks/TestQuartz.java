package cn.edu.bupt.demo.scheduleTasks;

import static org.quartz.JobBuilder.newJob;
import static org.quartz.SimpleScheduleBuilder.simpleSchedule;
import static org.quartz.TriggerBuilder.newTrigger;

import org.quartz.*;
import org.quartz.impl.StdSchedulerFactory;

/**
 * Created by tangjialiang on 2018/1/16.
 *
 */
public class TestQuartz {

    public static void main(String[] args) throws Exception {
        TestQuartz test = new TestQuartz();
        test.goPro();
    }

    public void goPro() {
        try {
            //创建scheduler
            Scheduler scheduler = StdSchedulerFactory.getDefaultScheduler();

            //定义一个Trigger
            Trigger trigger = newTrigger().withIdentity("trigger1", "group1") //定义name/group
                    .startNow()//一旦加入scheduler，立即生效
                    .withSchedule(simpleSchedule() //使用SimpleTrigger
                            .withIntervalInSeconds(1) //每隔一秒执行一次
                            .repeatForever()) //一直执行，奔腾到老不停歇
                    .build();

            //定义一个JobDetail
            JobDetail job = newJob(HelloQuartz.class) //定义Job类为HelloQuartz类，这是真正的执行逻辑所在
                    .withIdentity("job1", "group1") //定义name/group
                    .usingJobData("name", "quartz") //定义属性
                    .build();

            //加入这个调度
            scheduler.scheduleJob(job, trigger);

            //启动之
            scheduler.start();

            //运行一段时间后关闭
            Thread.sleep(10000);
            scheduler.shutdown(true);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

//    public void go() throws Exception {
//        // 首先，必需要取得一个Scheduler的引用
//        SchedulerFactory sf = new StdSchedulerFactory();
//        Scheduler sched = sf.getScheduler();
//        String time1= "0/10 * * * * ?" ;
//        // jobs可以在scheduled的sched.start()方法前被调用
//
//        // job 1将每隔20秒执行一次
//        JobDetail job = new JobDetail("job1", "group1", MyJob.class);
//        CronTrigger trigger = new CronTrigger("trigger1", "group1");
//        trigger.setCronExpression(time1);
//        Date ft = sched.scheduleJob(job, trigger);
//        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss SSS");
//        System.out.println(
//                job.getKey() + " 已被安排执行于: " + sdf.format(ft) + "，并且以如下重复规则重复执行: " + trigger.getCronExpression());
//
////        String time2 = "0/10 * * * * ?" ;
////        // job 2将每2分钟执行一次（在该分钟的第15秒)
////        job = new JobDetail("job2", "group2", MyJob.class);
////        trigger = new CronTrigger("trigger2", "group2");
////        trigger.setCronExpression(time2);
////        ft = sched.scheduleJob(job, trigger);
////        System.out.println(
////                job.getKey() + " 已被安排执行于: " + sdf.format(ft) + "，并且以如下重复规则重复执行: " + trigger.getCronExpression());
////
////        // 开始执行，start()方法被调用后，计时器就开始工作，计时调度中允许放入N个Job
//        sched.start();
//
//        try {
//            // 主线程等待一分钟
//            Thread.sleep(60L * 1000L);
//        } catch (Exception e) {
//        }
//        // 关闭定时调度，定时器不再工作
//        sched.shutdown(true);
//    }
}


/**
 * 定时任务管理类
 *
 */
//class QuartzManager {
//    private static SchedulerFactory gSchedulerFactory = new StdSchedulerFactory();
//    private static String JOB_GROUP_NAME = "EXTJWEB_JOBGROUP_NAME";
//    private static String TRIGGER_GROUP_NAME = "EXTJWEB_TRIGGERGROUP_NAME";
//
//    /**
//     * 添加一个定时任务，使用默认的任务组名，触发器名，触发器组名
//     *
//     * @param jobName
//     *            任务名
//     * @param jobClass
//     *            任务
//     * @param time
//     *            时间设置，参考quartz说明文档
//     * @throws SchedulerException
//     * @throws ParseException
//     */
//    public static void addJob(String jobName, String jobClass, String time) {
//        try {
//            Scheduler sched = gSchedulerFactory.getScheduler();
//            JobDetail jobDetail = new JobDetail(jobName, JOB_GROUP_NAME, Class.forName(jobClass));// 任务名，任务组，任务执行类
//            // 触发器
//            CronTrigger trigger = new CronTrigger(jobName, TRIGGER_GROUP_NAME);// 触发器名,触发器组
//            trigger.setCronExpression(time);// 触发器时间设定
//            sched.scheduleJob(jobDetail, trigger);
//            // 启动
//            if (!sched.isShutdown()){
//                sched.start();
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//            throw new RuntimeException(e);
//        }
//    }
//
//    /**
//     * 添加一个定时任务
//     *
//     * @param jobName
//     *            任务名
//     * @param jobGroupName
//     *            任务组名
//     * @param triggerName
//     *            触发器名
//     * @param triggerGroupName
//     *            触发器组名
//     * @param jobClass
//     *            任务
//     * @param time
//     *            时间设置，参考quartz说明文档
//     * @throws SchedulerException
//     * @throws ParseException
//     */
//    public static void addJob(String jobName, String jobGroupName,
//                              String triggerName, String triggerGroupName, String jobClass, String time){
//        try {
//            Scheduler sched = gSchedulerFactory.getScheduler();
//            JobDetail jobDetail = new JobDetail(jobName, jobGroupName, Class.forName(jobClass));// 任务名，任务组，任务执行类
//            // 触发器
//            CronTrigger trigger = new CronTrigger(triggerName, triggerGroupName);// 触发器名,触发器组
//            trigger.setCronExpression(time);// 触发器时间设定
//            sched.scheduleJob(jobDetail, trigger);
//        } catch (Exception e) {
//            e.printStackTrace();
//            throw new RuntimeException(e);
//        }
//    }
//
//    /**
//     * 修改一个任务的触发时间(使用默认的任务组名，触发器名，触发器组名)
//     *
//     * @param jobName
//     * @param time
//     */
//    public static void modifyJobTime(String jobName, String time) {
//        try {
//            Scheduler sched = gSchedulerFactory.getScheduler();
//            CronTrigger trigger = (CronTrigger) sched.getTrigger(jobName, TRIGGER_GROUP_NAME);
//            if(trigger == null) {
//                return;
//            }
//            String oldTime = trigger.getCronExpression();
//            if (!oldTime.equalsIgnoreCase(time)) {
//                JobDetail jobDetail = sched.getJobDetail(jobName, JOB_GROUP_NAME);
//                Class objJobClass = jobDetail.getJobClass();
//                String jobClass = objJobClass.getName();
//                removeJob(jobName);
//
//                addJob(jobName, jobClass, time);
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//            throw new RuntimeException(e);
//        }
//    }
//
//    /**
//     * 修改一个任务的触发时间
//     *
//     * @param triggerName
//     * @param triggerGroupName
//     * @param time
//     */
//    public static void modifyJobTime(String triggerName,
//                                     String triggerGroupName, String time) {
//        try {
//            Scheduler sched = gSchedulerFactory.getScheduler();
//            CronTrigger trigger = (CronTrigger) sched.getTrigger(triggerName, triggerGroupName);
//            if(trigger == null) {
//                return;
//            }
//            String oldTime = trigger.getCronExpression();
//            if (!oldTime.equalsIgnoreCase(time)) {
//                CronTrigger ct = (CronTrigger) trigger;
//                // 修改时间
//                ct.setCronExpression(time);
//                // 重启触发器
//                sched.resumeTrigger(triggerName, triggerGroupName);
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//            throw new RuntimeException(e);
//        }
//    }
//
//    /**
//     * 移除一个任务(使用默认的任务组名，触发器名，触发器组名)
//     *
//     * @param jobName
//     */
//    public static void removeJob(String jobName) {
//        try {
//            removeJob(jobName, JOB_GROUP_NAME, jobName, TRIGGER_GROUP_NAME);
//        } catch (Exception e) {
//            e.printStackTrace();
//            throw new RuntimeException(e);
//        }
//    }
//
//    /**
//     * 移除一个任务
//     *
//     * @param jobName
//     * @param jobGroupName
//     * @param triggerName
//     * @param triggerGroupName
//     */
//    public static void removeJob(String jobName, String jobGroupName,
//                                 String triggerName, String triggerGroupName) {
//        try {
//            Scheduler sched = gSchedulerFactory.getScheduler();
//            sched.pauseTrigger(triggerName, triggerGroupName);// 停止触发器
//            sched.unscheduleJob(triggerName, triggerGroupName);// 移除触发器
//            sched.deleteJob(jobName, jobGroupName);// 删除任务
//        } catch (Exception e) {
//            e.printStackTrace();
//            throw new RuntimeException(e);
//        }
//    }
//
//    /**
//     * 启动所有定时任务
//     */
//    public static void startJobs() {
//        try {
//            Scheduler sched = gSchedulerFactory.getScheduler();
//            sched.start();
//        } catch (Exception e) {
//            e.printStackTrace();
//            throw new RuntimeException(e);
//        }
//    }
//
//    /**
//     * 关闭所有定时任务
//     */
//    public static void shutdownJobs() {
//        try {
//            Scheduler sched = gSchedulerFactory.getScheduler();
//            if(!sched.isShutdown()) {
//                sched.shutdown();
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//            throw new RuntimeException(e);
//        }
//    }
//}



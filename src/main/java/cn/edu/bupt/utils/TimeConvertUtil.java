package cn.edu.bupt.utils;

import org.apache.http.util.TextUtils;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

/**
 * Created by whr on 2018/1/15.
 * 用于时间转变，此类中可增加其他时间转变方法
 * 现阶段只有从unix时间戳转变为制定时间格式的方法
 */

public class TimeConvertUtil {

    public static String TimeStamp2Date(String timestampString, String formats) {
        if (TextUtils.isEmpty(formats))
            formats = "yyyy-MM-dd HH:mm:ss";
        try{
            Long timestamp = Long.parseLong(timestampString);
            String date = new SimpleDateFormat(formats, Locale.CHINA).format(new Date(timestamp));
            return date;
        }catch (Exception e){
            e.printStackTrace();
        }
        return "";
    }


    public static String Date2TimeStamp(String dateStr, String format) {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat(format);
            return String.valueOf(sdf.parse(dateStr).getTime());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }
}

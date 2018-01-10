package cn.edu.bupt.utils;

import com.google.gson.JsonObject;

/**
 * Created by Administrator on 2018/1/10.
 *
 */
public interface ResponceUtil {
    public String onSuccess(String msg);
    public String onSuccess(JsonObject jsonObject) ;
    public String onFail(String msg);
    public String onFail(Exception exception);
}

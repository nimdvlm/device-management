package cn.edu.bupt.UtilComponents;

import cn.edu.bupt.utils.ResponceUtil;
import com.google.gson.JsonObject;
import org.springframework.stereotype.Component;

/**
 * Created by tangjialiang on 2018/1/10.
 *
 */

@Component
public class ResponceUtilImp implements ResponceUtil{
    @Override
    public String onSuccess(String msg) {
        JsonObject errorInfoJson = new JsonObject() ;
        errorInfoJson.addProperty("responce_code", 0);
        errorInfoJson.addProperty("responce_msg", msg);
        return errorInfoJson.toString() ;
    }

    @Override
    public String onFail(String msg) {
        JsonObject errorInfoJson = new JsonObject() ;
        errorInfoJson.addProperty("responce_code", 1);
        errorInfoJson.addProperty("responce_msg", msg);
        return errorInfoJson.toString() ;
    }
}

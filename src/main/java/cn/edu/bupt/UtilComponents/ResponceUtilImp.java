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
        JsonObject InfoJson = new JsonObject() ;
        InfoJson.addProperty("responce_code", 0);
        InfoJson.addProperty("responce_msg", msg);
        return InfoJson.toString() ;
    }

    @Override
    public String onSuccess(JsonObject jsonObject) {
        return this.onSuccess(jsonObject.getAsString()) ;
    }

    @Override
    public String onFail(String msg) {
        JsonObject InfoJson = new JsonObject() ;
        InfoJson.addProperty("responce_code", 1);
        InfoJson.addProperty("responce_msg", msg);
        return InfoJson.toString() ;
    }

    @Override
    public String onFail(Exception exception) {
        return this.onFail(exception.toString()) ;
    }


}

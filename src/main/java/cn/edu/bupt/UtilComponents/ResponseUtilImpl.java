package cn.edu.bupt.UtilComponents;

import cn.edu.bupt.utils.ResponseUtil;
import com.google.gson.JsonObject;
import org.springframework.stereotype.Component;

/**
 * Created by tangjialiang on 2018/1/10.
 *
 */

@Component
public class ResponseUtilImpl implements ResponseUtil {
    @Override
    public String onSuccess(String msg) {
        return msg ;
    }

    @Override
    public String onSuccess(JsonObject jsonObject) {
        return this.onSuccess(jsonObject.toString()) ;
    }

    @Override
    public String onFail(String msg) {
        JsonObject InfoJson = new JsonObject() ;
        InfoJson.addProperty("response_code", 1);
        InfoJson.addProperty("response_msg", msg);
        return InfoJson.toString() ;
    }

    @Override
    public String onFail(Exception exception) {
        return this.onFail(exception.toString()) ;
    }


}

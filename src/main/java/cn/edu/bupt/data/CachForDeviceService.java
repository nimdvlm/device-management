package cn.edu.bupt.data;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Administrator on 2017/12/26.
 */
public class CachForDeviceService {
    private static Map<String,Map<String,JsonObject>> map = new HashMap<>();

    public static void put(String deviceId,JsonObject obj){
        JsonArray array = obj.get("services").getAsJsonArray();
        Map<String,JsonObject> currMap  = new HashMap<>();
        for(JsonElement json:array){
            JsonObject object = json.getAsJsonObject();
            currMap.put(object.get("serviceName").getAsString(),object);
        }
        map.put(deviceId,currMap);
    }

    public static JsonObject get(String deviceId,String  serviceName){
        if(map.containsKey(deviceId)){
            Map<String,JsonObject> curr = map.get(deviceId);
            if(curr.containsKey(serviceName)){
                return curr.get(serviceName);
            }
        }
        return null;
    }
}

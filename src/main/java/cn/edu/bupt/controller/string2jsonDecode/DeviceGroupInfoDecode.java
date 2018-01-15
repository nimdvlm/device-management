package cn.edu.bupt.controller.string2jsonDecode;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import static cn.edu.bupt.utils.TimeConvertUtil.TimeStamp2Date;

/**
 * Created by tangjialiang on 2018/1/10.
 */
public class DeviceGroupInfoDecode {

    public static JsonElement groupArr(String jsonStr) {
        JsonArray groupJsonArr = new JsonArray();
        JsonObject parsed = (JsonObject)new JsonParser().parse(jsonStr);

        for(JsonElement i : parsed.getAsJsonArray("data")) {
            JsonObject item = (JsonObject) i ;
            JsonObject aGroup = new JsonObject();

            try {
                aGroup.addProperty("id", item.get("id").getAsJsonObject().get("id").getAsString());
            } catch (Exception e) {
                aGroup.addProperty("id", "");
            }
            try {
                String data = TimeStamp2Date(((JsonObject)item).get("createdTime").getAsString() ,"");
                aGroup.addProperty("createdTime", data);
            } catch (Exception e) {
                aGroup.addProperty("createdTime", "");
            }
            try {
                aGroup.addProperty("name", item.get("name").getAsString());
            } catch (Exception e) {
                aGroup.addProperty("name", "");
            }
            try {
                aGroup.addProperty("tenantId", item.get("tenantId").getAsJsonObject().get("id").getAsString());
            } catch (Exception e) {
                aGroup.addProperty("tenantId", "");
            }
            try {
                aGroup.addProperty("customerId", item.get("customerId").getAsJsonObject().get("id").getAsString());
            } catch (Exception e) {
                aGroup.addProperty("customerId", "");
            }
            groupJsonArr.add(aGroup);
        }

        return groupJsonArr ;
    }
}


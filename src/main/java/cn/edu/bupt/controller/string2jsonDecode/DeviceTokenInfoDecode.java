package cn.edu.bupt.controller.string2jsonDecode;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

public class DeviceTokenInfoDecode {

    public static JsonElement deviceToken(String jsonStr){

        JsonObject aToken = new JsonObject();
        JsonObject parsed = (JsonObject)new JsonParser().parse(jsonStr);

        try{
                aToken.addProperty("credentialsId",parsed.get("credentialsId").getAsString());
            }catch(Exception e){
                aToken.addProperty("credentialsId","");
            }
        return aToken;
    }
}

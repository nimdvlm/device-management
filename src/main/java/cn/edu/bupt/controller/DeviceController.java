package cn.edu.bupt.controller;

import cn.edu.bupt.utils.HttpUtil;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by Administrator on 2017/12/23.
 */
@RestController
@RequestMapping("/api/device")
@Slf4j
public class DeviceController {

    public static final String DEVICE_ID = "deviceId";

    @Value("${bupt.thingsboard.host}")
    String thingsboardHost ;

    @Value("${bupt.thingsboard.port}")
    String thingsboardPort ;

    private String getServer() {
        return thingsboardHost+":"+thingsboardPort ;
    }

    @Autowired
    HttpServletRequest request;

    @RequestMapping(value = "/allDevices", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    private String getDevices() {
        String requestAddr = "/api/tenant/devices" ;

        StringBuffer param = new StringBuffer();
        param.append("limit").append("=").append("30");

        requestAddr = requestAddr + "?"+param ;

        String responseContent = null ;
        try {
            responseContent = HttpUtil.sendGetToThingsboard("http://" + getServer() + requestAddr,
                    null,
                    request.getSession()) ;
        } catch (Exception e) {
            return getErrorMsg(e) ;
        }

        try {
            JsonArray deviceJsonArr = (JsonArray)DeviceInfoDecode.deviceArr(responseContent) ;
            return deviceJsonArr.toString() ;
        } catch (Exception e) {
            return getErrorMsg(e) ;
        }

    }


    @RequestMapping(value = "/token/{deviceId}", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    private String getDeviceToken(@PathVariable String deviceId) {
        String requestAddr = "/api/device/"+deviceId+"/credentials" ;
        String responseContent = null ;
        try{
            responseContent = HttpUtil.sendGetToThingsboard("http://" + getServer() + requestAddr,
                    null,
                    request.getSession());
        }catch(Exception e){
            return getErrorMsg(e) ;
        }
        JsonArray deviceJsonArr = (JsonArray)DeviceInfoDecode.deviceArr(responseContent) ;
        return deviceJsonArr.toString() ;
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ResponseBody
    private String createDevice(@RequestBody String deviceInfo) {
        String requestAddr = "/api/device" ;

        /**
         * 这里的deviceInfo为json
         * {"name":"test0name","type":"default","additionalInfo":{"description":"jhdajd"}}
         */
        JsonObject deviceInfoJson = (JsonObject)new JsonParser().parse(deviceInfo);

        String responseContent = null ;
        try {
            responseContent = HttpUtil.sendPostToThingsboard("http://" + getServer() + requestAddr,
                    null,
                    deviceInfoJson,
                    request.getSession()) ;
        } catch (Exception e) {
            return getErrorMsg(e) ;
        }

        return responseContent ;
    }

    @RequestMapping(value = "/delete/{deviceId}", method = RequestMethod.GET)
    @ResponseBody
    public String delete(@PathVariable(DEVICE_ID) String strDeviceId) {
        String requestAddr ="http://"+getServer()+String.format("/api/device/%s", strDeviceId);
        try{
            String responseContent = HttpUtil.sendDeletToThingsboard(requestAddr,request.getSession());
            return responseContent ;
        }catch(Exception e){
            return getErrorMsg(e) ;
        }
    }

    private String getErrorMsg(Exception e) {
        JsonObject errorInfoJson = new JsonObject() ;
        errorInfoJson.addProperty("responce_code", 1);
        errorInfoJson.addProperty("responce_msg", "can't link to thingsboard: " + e);
        return errorInfoJson.toString() ;
    }
}



class DeviceInfoDecode {

    public static JsonElement deviceArr(String jsonStr) {

        JsonArray deviceJsonArr = new JsonArray();

        JsonElement parse = new JsonParser().parse(jsonStr);
        JsonObject parsed = (JsonObject) parse ;

        for(JsonElement item : parsed.getAsJsonArray("data")) {
            JsonObject aDevice = new JsonObject();
            // status\createdTime\additionalInfo\type\name
            try {
                aDevice.addProperty("status", "");
            } catch (Exception e) {
                aDevice.addProperty("status", "");
            }
            try {
                aDevice.addProperty("deviceId", ((JsonObject)item).get("id").getAsJsonObject().get("id").getAsString());
            } catch (Exception e) {
                aDevice.addProperty("deviceId", "");
            }
            try {
                aDevice.addProperty("createdTime", ((JsonObject)item).get("createdTime").getAsString());
            } catch (Exception e) {
                aDevice.addProperty("createdTime", "");
            }
            try {
                aDevice.addProperty("additionalInfo",  ((JsonObject)item).get("additionalInfo").getAsJsonObject().get("description").getAsString());
            } catch (Exception e) {
                aDevice.addProperty("additionalInfo",  "");
            }
            try {
                aDevice.addProperty("type",  ((JsonObject)item).get("type").getAsString());
            } catch (Exception e) {
                aDevice.addProperty("type",  "");
            }
            try {
                aDevice.addProperty("name",  ((JsonObject)item).get("name").getAsString());
            } catch (Exception e) {
                aDevice.addProperty("name",  "");
            }
            deviceJsonArr.add(aDevice);
        }

        return deviceJsonArr ;
    }
}

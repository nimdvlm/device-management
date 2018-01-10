package cn.edu.bupt.controller;

import cn.edu.bupt.utils.HttpUtil;
import cn.edu.bupt.utils.ResponceUtil;
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
 *
 * 设备数据的获取
 * -- 该类的所有接口返回采用统一json
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

    @Autowired
    ResponceUtil responseUtil ;

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
            return responseUtil.onFail(e.toString()) ;
        }

        try {
            JsonArray deviceJsonArr = (JsonArray)DeviceInfoDecode.deviceArr(responseContent) ;
            return responseUtil.onSuccess(deviceJsonArr.toString()) ;
        } catch (Exception e) {
            return responseUtil.onFail(e.toString()) ;
        }

    }

    /**
     * abandon. Don't use
     * @param deviceId
     * @return
     */
    @RequestMapping(value = "/token/{deviceId}", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String getDeviceToken(@PathVariable String deviceId) {
        String requestAddr = "/api/device/"+deviceId+"/credentials" ;
        String responseContent = null ;
        try{
            responseContent = HttpUtil.sendGetToThingsboard("http://" + getServer() + requestAddr,
                    null,
                    request.getSession());
        }catch(Exception e){
            return responseUtil.onFail(e.toString()) ;
        }
        JsonArray deviceJsonArr = (JsonArray)DeviceInfoDecode.deviceArr(responseContent) ;
        return responseUtil.onSuccess(deviceJsonArr.toString()) ;
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ResponseBody
    public String createDevice(@RequestBody String deviceInfo) {
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
            return responseUtil.onFail(e.toString()) ;
        }

        return responseUtil.onSuccess(responseContent) ;
    }

    @RequestMapping(value = "/delete/{deviceId}", method = RequestMethod.GET)
    @ResponseBody
    public String delete(@PathVariable(DEVICE_ID) String strDeviceId) {
        String requestAddr ="http://"+getServer()+String.format("/api/device/%s", strDeviceId);
        try{
            String responseContent = HttpUtil.sendDeletToThingsboard(requestAddr,request.getSession());
            return responseUtil.onSuccess(responseContent) ;
        }catch(Exception e){
            return responseUtil.onFail(e.toString()) ;
        }
    }

    @RequestMapping(value = "/accesstoken/{deviceId}", method = RequestMethod.GET)
    @ResponseBody
    public String getDeviceAccessToken(@PathVariable(DEVICE_ID) String strDeviceId) {
        String requestAddr = "http://" + getServer() + "/api/device/"+strDeviceId+"/credentials" ;

        try {
            String responseContent = HttpUtil.sendGetToThingsboard(requestAddr,
                    null,
                    request.getSession()) ;
            try {
                JsonObject jsonR = (JsonObject)new JsonParser().parse(responseContent);
                String credentialsId = jsonR.get("credentialsId").getAsString() ;
                JsonObject jsonObject = new JsonObject();
                jsonObject.addProperty("credentialsId", credentialsId);
                return responseUtil.onSuccess(jsonObject.getAsString()) ;
            } catch (Exception e) {
                return responseUtil.onFail(e.toString()) ;
            }
        } catch (Exception e) {
            return responseUtil.onFail(e.toString()) ;
        }
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

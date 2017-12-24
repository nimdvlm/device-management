package cn.edu.bupt.controller;

import cn.edu.bupt.utils.HttpClientUtil;
import cn.edu.bupt.utils.HttpUtil;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * Created by Administrator on 2017/12/23.
 */
@RestController
@RequestMapping("/api/device")
@Slf4j
public class DeviceController {
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
    private String getDevices() {
        String requestAddr = "/api/tenant/devices" ;
        String token = this.guaranteeSessionToken();

        StringBuffer param = new StringBuffer();
        param.append("limit").append("=").append("1000");

        String responseContent = HttpClientUtil.getInstance()
                .sendHttpGet("http://" + getServer()
                        + requestAddr, param.toString(), token);

        // responseContent = "{\"data\":[{\"id\":{\"entityType\":\"DEVICE\",\"id\":\"57e0bbf0-e3f8-11e7-b3e8-7be00d3e090f\"},\"createdTime\":1513604142383,\"tenantId\":{\"entityType\":\"TENANT\",\"id\":\"8aecfdf0-e0b1-11e7-ba10-43001603409a\"},\"customerId\":{\"entityType\":\"CUSTOMER\",\"id\":\"13814000-1dd2-11b2-8080-808080808080\"},\"groupId\":{\"id\":\"13814000-1dd2-11b2-8080-808080808080\"},\"name\":\"cc\",\"type\":\"default\",\"manufacture\":null,\"deviceType\":null,\"model\":null,\"parentDeviceId\":null,\"method\":null,\"status\":null,\"additionalInfo\":{\"description\":\"cc\"}},{\"id\":{\"entityType\":\"DEVICE\",\"id\":\"8b544b40-e0b1-11e7-ba10-43001603409a\"},\"createdTime\":1513243880948,\"tenantId\":{\"entityType\":\"TENANT\",\"id\":\"8aecfdf0-e0b1-11e7-ba10-43001603409a\"},\"customerId\":{\"entityType\":\"CUSTOMER\",\"id\":\"13814000-1dd2-11b2-8080-808080808080\"},\"groupId\":{\"id\":\"3bcfde90-e3f9-11e7-b3e8-7be00d3e090f\"},\"name\":\"DHT11 Demo Device\",\"type\":\"default\",\"manufacture\":null,\"deviceType\":null,\"model\":null,\"parentDeviceId\":null,\"method\":null,\"status\":null,\"additionalInfo\":{\"description\":\"Demo device that is used in sample applications that upload data from DHT11 temperature and humidity sensor\"}},{\"id\":{\"entityType\":\"DEVICE\",\"id\":\"8b592d40-e0b1-11e7-ba10-43001603409a\"},\"createdTime\":1513243880980,\"tenantId\":{\"entityType\":\"TENANT\",\"id\":\"8aecfdf0-e0b1-11e7-ba10-43001603409a\"},\"customerId\":{\"entityType\":\"CUSTOMER\",\"id\":\"13814000-1dd2-11b2-8080-808080808080\"},\"groupId\":null,\"name\":\"Raspberry Pi Demo Device\",\"type\":\"default\",\"manufacture\":null,\"deviceType\":null,\"model\":null,\"parentDeviceId\":null,\"method\":null,\"status\":null,\"additionalInfo\":{\"description\":\"Demo device that is used in Raspberry Pi GPIO control sample application\"}},{\"id\":{\"entityType\":\"DEVICE\",\"id\":\"8b2ffa60-e0b1-11e7-ba10-43001603409a\"},\"createdTime\":1513243880710,\"tenantId\":{\"entityType\":\"TENANT\",\"id\":\"8aecfdf0-e0b1-11e7-ba10-43001603409a\"},\"customerId\":{\"entityType\":\"CUSTOMER\",\"id\":\"8afae0a0-e0b1-11e7-ba10-43001603409a\"},\"groupId\":null,\"name\":\"Test Device A1\",\"type\":\"default\",\"manufacture\":null,\"deviceType\":null,\"model\":null,\"parentDeviceId\":null,\"method\":null,\"status\":null,\"additionalInfo\":null},{\"id\":{\"entityType\":\"DEVICE\",\"id\":\"8b3fb1d0-e0b1-11e7-ba10-43001603409a\"},\"createdTime\":1513243880813,\"tenantId\":{\"entityType\":\"TENANT\",\"id\":\"8aecfdf0-e0b1-11e7-ba10-43001603409a\"},\"customerId\":{\"entityType\":\"CUSTOMER\",\"id\":\"8afae0a0-e0b1-11e7-ba10-43001603409a\"},\"groupId\":null,\"name\":\"Test Device A2\",\"type\":\"default\",\"manufacture\":null,\"deviceType\":null,\"model\":null,\"parentDeviceId\":null,\"method\":null,\"status\":null,\"additionalInfo\":null},{\"id\":{\"entityType\":\"DEVICE\",\"id\":\"8b457e30-e0b1-11e7-ba10-43001603409a\"},\"createdTime\":1513243880851,\"tenantId\":{\"entityType\":\"TENANT\",\"id\":\"8aecfdf0-e0b1-11e7-ba10-43001603409a\"},\"customerId\":{\"entityType\":\"CUSTOMER\",\"id\":\"8afae0a0-e0b1-11e7-ba10-43001603409a\"},\"groupId\":null,\"name\":\"Test Device A3\",\"type\":\"default\",\"manufacture\":null,\"deviceType\":null,\"model\":null,\"parentDeviceId\":null,\"method\":null,\"status\":null,\"additionalInfo\":null},{\"id\":{\"entityType\":\"DEVICE\",\"id\":\"8b4a3920-e0b1-11e7-ba10-43001603409a\"},\"createdTime\":1513243880882,\"tenantId\":{\"entityType\":\"TENANT\",\"id\":\"8aecfdf0-e0b1-11e7-ba10-43001603409a\"},\"customerId\":{\"entityType\":\"CUSTOMER\",\"id\":\"8afba3f0-e0b1-11e7-ba10-43001603409a\"},\"groupId\":null,\"name\":\"Test Device B1\",\"type\":\"default\",\"manufacture\":null,\"deviceType\":null,\"model\":null,\"parentDeviceId\":null,\"method\":null,\"status\":null,\"additionalInfo\":null},{\"id\":{\"entityType\":\"DEVICE\",\"id\":\"8b507ab0-e0b1-11e7-ba10-43001603409a\"},\"createdTime\":1513243880923,\"tenantId\":{\"entityType\":\"TENANT\",\"id\":\"8aecfdf0-e0b1-11e7-ba10-43001603409a\"},\"customerId\":{\"entityType\":\"CUSTOMER\",\"id\":\"8afc4030-e0b1-11e7-ba10-43001603409a\"},\"groupId\":{\"id\":\"13814000-1dd2-11b2-8080-808080808080\"},\"name\":\"Test Device C1\",\"type\":\"default\",\"manufacture\":\"test-manufacture\",\"deviceType\":\"test-deviceType\",\"model\":\"test-model\",\"parentDeviceId\":null,\"method\":null,\"status\":null,\"additionalInfo\":null}],\"nextPageLink\":null,\"hasNext\":false}" ;
        JsonArray deviceJsonArr = (JsonArray)DeviceInfoDecode.deviceArr(responseContent) ;

        return deviceJsonArr.toString() ;
    }

    private String guaranteeSessionToken() {
        HttpSession session = request.getSession();
        String token = (String)session.getAttribute("token");
        if(token == null || token.isEmpty()) {
            boolean accessToken = HttpUtil.getAccessToken(session);
            request.setAttribute("token", token);
        }
        return token ;
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

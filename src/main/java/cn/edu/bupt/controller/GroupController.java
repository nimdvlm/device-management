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
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * Created by Administrator on 2017/12/23.
 */
@RestController
@RequestMapping("/api/group")
@Slf4j
public class GroupController {

    @Value("${bupt.thingsboard.host}")
    String thingsboardHost ;

    @Value("${bupt.thingsboard.port}")
    String thingsboardPort ;

    @Autowired
    HttpServletRequest request;

    /**
     * @return
     */
    @RequestMapping(value = "/allGroups", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String devicegroupList() {
        String requestAddr = "/api/group/groups" ;

        String token = this.guaranteeSessionToken();

        StringBuffer param = new StringBuffer();
        param.append("limit").append("=").append("1000");

        String responseContent = HttpClientUtil.getInstance()
                .sendHttpGet("http://" + getServer()
                        + requestAddr, param.toString(), token);

        JsonArray groupJsonArr = (JsonArray)DeviceGroupInfoDecode.groupArr(responseContent);

        return groupJsonArr.toString() ;
    }

    /**
     * 该接口的requestBody为包含一个groupName的json
     * @param deviceGroupInfo
     * @return
     */
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ResponseBody
    public String create(@RequestBody String deviceGroupInfo) {
        String requestAddr = "/api/group/save" ;

        String token = this.guaranteeSessionToken();

        String responseContent = HttpClientUtil.getInstance()
                .sendHttpPost("http://" + getServer()
                        + requestAddr, deviceGroupInfo, token) ;

        return responseContent ;
    }

    /**
     * @param deviceGroupId
     * @return
     */
    @RequestMapping(value = "/delete/{deviceGroupId}", method = RequestMethod.GET)
    @ResponseBody
    public String delete(@PathVariable String deviceGroupId) {
        String requestAddr = String.format("/api/group/delete/%s", deviceGroupId);

        String token = this.guaranteeSessionToken();

        String responseContent = HttpClientUtil.getInstance()
                .sendHttpGet("http://" + getServer()
                        + requestAddr, "", token) ;

        return responseContent ;
    }

    /**
     * @param gId
     * @return
     * @throws Exception
     */
    @RequestMapping(value = "/{groupId}/devices", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String getDevicesByGroupId(@PathVariable("groupId") String gId) throws Exception {
        int limit = 1000 ;
        String requestAddr = String.format("/api/group/%s/devices", gId);
        requestAddr = requestAddr ;

        String token = this.guaranteeSessionToken();

        String responseContent = HttpClientUtil.getInstance()
                .sendHttpGet("http://" + getServer()
                        + requestAddr, "limit="+limit, token) ;
        try {
            JsonArray deviceJsonArr = (JsonArray) DeviceInfoDecode.deviceArr(responseContent);
            return deviceJsonArr.toString() ;
        } catch (Exception e) {

        }
        return "error occur!!" ;
    }

    @RequestMapping(value = "/device/{deviceId}/group/{groupId}", method = RequestMethod.GET)
    @ResponseBody
    public String assignDeviceToGroup(@PathVariable("deviceId") String dId,@PathVariable("groupId") String gId) throws Exception {
        String requestAddr = String.format("/api/group/device/%s/group/%s", dId, gId);

        String token = this.guaranteeSessionToken();

        String responseContent = HttpClientUtil.getInstance()
                .sendHttpGet("http://" + getServer()
                        + requestAddr, "", token) ;
        return responseContent ;
    }

    @RequestMapping(value = "/unassign/{deviceId}", method = RequestMethod.GET)
    @ResponseBody
    public String unAssignDeviceFromGroup(@PathVariable("deviceId") String dId) throws Exception {
        String requestAddr = String.format("/api/group/unassign/%s", dId);

        String token = this.guaranteeSessionToken();

        String responseContent = HttpClientUtil.getInstance()
                .sendHttpGet("http://" + getServer()
                        + requestAddr, "", token) ;
        return responseContent ;
    }

    private String guaranteeSessionToken() {
        HttpSession session = request.getSession();
        String token = (String)session.getAttribute("token");
        if(token == null || token.isEmpty()) {
            boolean accessToken = HttpUtil.getAccessToken(session);
            token = (String)session.getAttribute("token") ;
        }
        return token ;
    }

    private String getServer() {
        return thingsboardHost+":"+thingsboardPort ;
    }
}


class DeviceGroupInfoDecode {
    public static JsonElement groupArr(String jsonStr) {
        JsonArray groupJsonArr = new JsonArray();
        JsonObject parsed = (JsonObject)new JsonParser().parse(jsonStr);

        for(JsonElement i : parsed.getAsJsonArray("data")) {
            JsonObject item = (JsonObject) i ;
            JsonObject aGroup = new JsonObject();

            try {
                aGroup.addProperty("id", item.get("id").getAsJsonObject().get("id").getAsString());
            } catch (Exception e) {
                aGroup.addProperty("id", "hhaha");
            }
            try {
                aGroup.addProperty("createdTime", item.get("createdTime").getAsString());
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


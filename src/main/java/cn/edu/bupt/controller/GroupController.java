package cn.edu.bupt.controller;

import cn.edu.bupt.utils.HttpUtil;
import cn.edu.bupt.utils.ResponceUtil;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by Administrator on 2017/12/23.
 *
 * 设备组数据的获取
 * -- 该类的所有接口返回采用统一json
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

    @Autowired
    ResponceUtil responceUtil ;

    /**
     * @return
     */
    @RequestMapping(value = "/allGroups", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String devicegroupList() {
        String requestAddr = "/api/group/groups" ;

        StringBuffer param = new StringBuffer();
        param.append("limit").append("=").append("1000");

        String responseContent = null ;
        try {
            responseContent = HttpUtil.sendGetToThingsboard("http://" + getServer() + requestAddr + "?" + param.toString(),
                    null,
                    request.getSession());
        } catch (Exception e) {
            return responceUtil.onFail(e.toString()) ;
        }

        JsonArray groupJsonArr = (JsonArray)DeviceGroupInfoDecode.groupArr(responseContent);

        return responceUtil.onSuccess(groupJsonArr.toString()) ;
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

        String responseContent = null ;
        try {
            responseContent = HttpUtil.sendPostToThingsboard("http://" + getServer() + requestAddr,
                    null,
                    (JsonObject) new JsonParser().parse(deviceGroupInfo),
                    request.getSession());
        } catch (Exception e) {
            return responceUtil.onFail(e.toString()) ;
        }

        return responceUtil.onSuccess(responseContent) ;
    }

    /**
     * @param deviceGroupId
     * @return
     */
    @RequestMapping(value = "/delete/{deviceGroupId}", method = RequestMethod.GET)
    @ResponseBody
    public String delete(@PathVariable String deviceGroupId) {
        String requestAddr = String.format("/api/group/delete/%s", deviceGroupId);

        String responseContent = null ;
        try {
            responseContent = HttpUtil.sendGetToThingsboard("http://" + getServer() + requestAddr,
                    null,
                    request.getSession());
        } catch (Exception e) {
            return responceUtil.onFail(e.toString()) ;
        }

        return responceUtil.onSuccess(responseContent) ;
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
        requestAddr = requestAddr  + "?limit="+limit;

        String responseContent = HttpUtil.sendGetToThingsboard("http://" + getServer() + requestAddr,
                null,
                request.getSession()) ;
        try {
            JsonArray deviceJsonArr = (JsonArray) DeviceInfoDecode.deviceArr(responseContent);
            return responceUtil.onSuccess(deviceJsonArr.toString()) ;
        } catch (Exception e) {
            return responceUtil.onFail(e.toString()) ;
        }
    }

    @RequestMapping(value = "/device/{deviceId}/group/{groupId}", method = RequestMethod.GET)
    @ResponseBody
    public String assignDeviceToGroup(@PathVariable("deviceId") String dId,@PathVariable("groupId") String gId) throws Exception {
        String requestAddr = String.format("/api/group/device/%s/group/%s", dId, gId);

        String responseContent = null ;
        try {
            responseContent = HttpUtil.sendGetToThingsboard("http://" + getServer() + requestAddr,
                    null,
                    request.getSession()) ;
        } catch (Exception e) {
            return responceUtil.onFail(e.toString()) ;
        }

        return responceUtil.onSuccess(responseContent) ;
    }

    @RequestMapping(value = "/unassign/{deviceId}", method = RequestMethod.GET)
    @ResponseBody
    public String unAssignDeviceFromGroup(@PathVariable("deviceId") String dId) throws Exception {
        String requestAddr = String.format("/api/group/unassign/%s", dId);

        String responseContent = null ;
        try {
            responseContent = HttpUtil.sendGetToThingsboard("http://" + getServer() + requestAddr,
                    null,
                    request.getSession()) ;
        } catch (Exception e) {
            return responceUtil.onFail(e.toString()) ;
        }
        return responceUtil.onSuccess(responseContent) ;
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
                aGroup.addProperty("id", "");
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


package cn.edu.bupt.controller;

import cn.edu.bupt.controller.string2jsonDecode.DeviceGroupInfoDecode;
import cn.edu.bupt.controller.string2jsonDecode.DeviceInfoDecode;
import cn.edu.bupt.utils.HttpUtil;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;


/**
 * Created by Administrator on 2017/12/23.
 *
 * 设备组数据的获取
 * -- 该类的所有接口返回采用统一json
 */
@RestController
@RequestMapping("/api/group")
@Slf4j
public class GroupController extends DefaultThingsboardAwaredController{

    /**
     * @return
     */
    @ApiOperation(value="获取租户所有设备组", notes="获取租户所有设备组")
    @RequestMapping(value = "/alltenantgroups/{tenantId}", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String devicegroupList(@PathVariable Integer tenantId) {
        String requestAddr = "/api/v1/groups/tenant/" + tenantId ;

        StringBuffer param = new StringBuffer();
        param.append("limit").append("=").append("100");

        String responseContent = null ;
        try {
            responseContent = HttpUtil.sendGetToThingsboard("http://" + getDeviceAccessServer() + requestAddr + "?" + param.toString(),
                    null,
                    request.getSession());
        } catch (Exception e) {
            return retFail(e.toString()) ;
        }

        JsonArray groupJsonArr = (JsonArray) DeviceGroupInfoDecode.groupArr(responseContent);

        return retSuccess(groupJsonArr.toString()) ;
    }

    /**
     * 该接口的requestBody为包含一个groupName的json
     * @param deviceGroupInfo
     * @return
     */
    @RequestMapping(value = "/create", method = RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String create(@RequestBody String deviceGroupInfo) {
        String requestAddr = "/api/v1/group" ;

        String responseContent = null ;
        try {
            responseContent = HttpUtil.sendPostToThingsboard("http://" + getDeviceAccessServer() + requestAddr,
                    null,
                    (JsonObject) new JsonParser().parse(deviceGroupInfo),
                    request.getSession());
        } catch (Exception e) {
            return retFail(e.toString()) ;
        }

        return retSuccess(responseContent) ;
    }

    /**
     * @param deviceGroupId
     * @return
     */
    @ApiOperation(value="删除设备组", notes="删除设备组")
    @ApiImplicitParam(name = "deviceGroupId", value = "设备组ID", required = true, dataType = "String", paramType = "path")
    @RequestMapping(value = "/delete/{deviceGroupId}", method = RequestMethod.DELETE, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String delete(@PathVariable String deviceGroupId) {
        String requestAddr = String.format("/api/group/%s", deviceGroupId);

        String responseContent = null ;
        try {
            responseContent = HttpUtil.sendDeletToThingsboard("http://" + getDeviceAccessServer() + requestAddr,
                    request.getSession());
        } catch (Exception e) {
            return retFail(e.toString()) ;
        }

        return retSuccess(responseContent) ;
    }

    /**
     * @param gId
     * @return
     * @throws Exception
     */
    @ApiOperation(value="获取设备组下的所有设备", notes="获取设备组下的所有设备")
    @ApiImplicitParam(name = "groupId", value = "设备组ID", required = true, dataType = "String", paramType = "path")
    @RequestMapping(value = "/{groupId}/devices", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String getDevicesByGroupId(@PathVariable("groupId") String gId) throws Exception {
        int limit = 1000 ;
        String requestAddr = String.format("/api/v1/group/devices/%s", gId);
        requestAddr = requestAddr  + "?limit="+limit;

        String responseContent = HttpUtil.sendGetToThingsboard("http://" + getDeviceAccessServer() + requestAddr,
                null,
                request.getSession()) ;
        try {
            JsonArray deviceJsonArr = (JsonArray) DeviceInfoDecode.deviceArr(responseContent);
            return retSuccess(deviceJsonArr.toString()) ;
        } catch (Exception e) {
            return retFail(e.toString()) ;
        }
    }

    @ApiOperation(value="分配设备到设备组", notes="分配设备到设备组")
    @ApiImplicitParams({ @ApiImplicitParam(name = "deviceId", value = "设备Id", required = true, dataType = "String",paramType = "path"),
            @ApiImplicitParam(name = "groupId", value = "设备组Id", required = true, dataType = "String",paramType = "path")})
    @RequestMapping(value = "/assign/{deviceId}/{groupId}", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String assignDeviceToGroup(@PathVariable("deviceId") String dId,@PathVariable("groupId") String gId) throws Exception {
        String requestAddr = String.format("/api/v1/assign/group/%s/%s", gId, dId);

        String responseContent = null ;
        try {
            responseContent = HttpUtil.sendGetToThingsboard("http://" + getDeviceAccessServer() + requestAddr,
                    null,
                    request.getSession()) ;
        } catch (Exception e) {
            return retFail(e.toString()) ;
        }

        return retSuccess(responseContent) ;
    }

    @ApiOperation(value="移除设备组中的设备", notes="移除设备组中的设备")
    @ApiImplicitParams({ @ApiImplicitParam(name = "deviceId", value = "设备Id", required = true, dataType = "String",paramType = "path"),
            @ApiImplicitParam(name = "groupId", value = "设备组Id", required = true, dataType = "String",paramType = "path")})
    @RequestMapping(value = "/unassign/{deviceId}/{groupId}", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String unAssignDeviceFromGroup(@PathVariable("deviceId") String dId,@PathVariable("groupId") String gId) throws Exception {
        String requestAddr = String.format("/api/v1/unassign/group/%s/%s", gId,dId);

        String responseContent = null ;
        try {
            responseContent = HttpUtil.sendGetToThingsboard("http://" + getDeviceAccessServer() + requestAddr,
                    null,
                    request.getSession()) ;
        } catch (Exception e) {
            return retFail(e.toString()) ;
        }
        return retSuccess(responseContent) ;
    }
}

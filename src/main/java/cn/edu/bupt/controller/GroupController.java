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

import javax.servlet.http.HttpSession;


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
     * 该接口的requestBody为包含一个groupName的json
     * @param deviceGroupInfo
     * @return
     */
    //增
    @RequestMapping(value = "/create", method = RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String create(@RequestBody String deviceGroupInfo) {

        JsonObject groupInfoJson = (JsonObject)new JsonParser().parse(deviceGroupInfo);
        groupInfoJson.addProperty("tenantId", getTenantId());
        groupInfoJson.addProperty("customerId", getCustomerId());
        String requestAddr = "/api/v1/deviceaccess/group" ;

        String responseContent = null ;
        try {
            responseContent = HttpUtil.sendPostToThingsboard("http://" + getDeviceAccessServer() + requestAddr,
                    null,
                    groupInfoJson,
                    request.getSession());
        } catch (Exception e) {
            return retFail(e.toString()) ;
        }
        return retSuccess(responseContent) ;
    }

    //删
    @ApiOperation(value="删除设备组", notes="删除设备组")
    @ApiImplicitParam(name = "deviceGroupId", value = "设备组ID", required = true, dataType = "String", paramType = "path")
    @RequestMapping(value = "/delete/{groupId}", method = RequestMethod.DELETE, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String delete(@PathVariable String groupId) {
        String requestAddr = String.format("/api/v1/deviceaccess/group/%s", groupId);

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
     * @return
     */
    //查
    @ApiOperation(value="获取租户所有设备组", notes="获取租户所有设备组")
    @RequestMapping(value = "/allgroups", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String devicegroupList(@RequestParam int limit, @RequestParam(required = false) String textSearch,
                                  @RequestParam(required = false) String idOffset,
                                  @RequestParam(required = false) String textOffset) {


        String requestAddr = "/api/v1/deviceaccess/groups/tenant/" + getTenantId() +"?limit=" + limit;
        if(textSearch != null){
            requestAddr = requestAddr + "&textSearch=" + textSearch;
        }
        if(idOffset != null){
            requestAddr = requestAddr + "&idOffset=" + idOffset;
        }
        if(textOffset != null){
            requestAddr = requestAddr + "&textOffset=" + textOffset;
        }

        String responseContent = null ;
        try {
            responseContent = HttpUtil.sendGetToThingsboard("http://" + getDeviceAccessServer() + requestAddr ,
                    null,
                    request.getSession());
        } catch (Exception e) {
            return retFail(e.toString()) ;
        }
        return retSuccess(decode(responseContent)) ;
    }


    /**
     * @param gId
     * @return
     * @throws Exception
     */
    //获取设备组下的所有设备
    @ApiOperation(value="获取设备组下的所有设备", notes="获取设备组下的所有设备")
    @ApiImplicitParam(name = "groupId", value = "设备组ID", required = true, dataType = "String", paramType = "path")
    @RequestMapping(value = "/{groupId}/devices", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String getDevicesByGroupId(@PathVariable("groupId") String gId, @RequestParam int limit,
                                      @RequestParam(required = false) String textSearch,
                                      @RequestParam(required = false) String idOffset,
                                      @RequestParam(required = false) String textOffset) throws Exception {

        String requestAddr = String.format("/api/v1/deviceaccess/group/devices/%s", gId);
        requestAddr = requestAddr  + "?limit=" + limit;
        if(textSearch != null){
            requestAddr = requestAddr + "&textSearch=" + textSearch;
        }
        if(idOffset != null){
            requestAddr = requestAddr + "&idOffset=" + idOffset;
        }
        if(textOffset != null){
            requestAddr = requestAddr + "&textOffset=" + textOffset;
        }

        String responseContent = HttpUtil.sendGetToThingsboard("http://" + getDeviceAccessServer() + requestAddr,
                null,
                request.getSession()) ;
        try {
            return retSuccess(decode(responseContent)) ;
        } catch (Exception e) {
            return retFail(e.toString()) ;
        }
    }

    //分配设备到设备组
    @ApiOperation(value="分配设备到设备组", notes="分配设备到设备组")
    @ApiImplicitParams({ @ApiImplicitParam(name = "deviceId", value = "设备Id", required = true, dataType = "String",paramType = "path"),
            @ApiImplicitParam(name = "groupId", value = "设备组Id", required = true, dataType = "String",paramType = "path")})
    @RequestMapping(value = "/assign/{deviceId}/{groupId}", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String assignDeviceToGroup(@PathVariable("deviceId") String dId,@PathVariable("groupId") String gId) throws Exception {
        String requestAddr = String.format("/api/v1/deviceaccess/assign/group/%s/%s", gId, dId);

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

    //移除设备组中的设备
    @ApiOperation(value="移除设备组中的设备", notes="移除设备组中的设备")
    @ApiImplicitParams({ @ApiImplicitParam(name = "deviceId", value = "设备Id", required = true, dataType = "String",paramType = "path"),
            @ApiImplicitParam(name = "groupId", value = "设备组Id", required = true, dataType = "String",paramType = "path")})
    @RequestMapping(value = "/unassign/{deviceId}/{groupId}", method = RequestMethod.DELETE, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String unAssignDeviceFromGroup(@PathVariable("deviceId") String dId,@PathVariable("groupId") String gId) throws Exception {
        String requestAddr = String.format("/api/v1/deviceaccess/unassign/group/%s/%s", gId,dId);

        String responseContent = null ;
        try {
            responseContent = HttpUtil.sendDeletToThingsboard("http://" + getDeviceAccessServer() + requestAddr,
                    request.getSession()) ;
        } catch (Exception e) {
            return retFail(e.toString()) ;
        }
        return retSuccess(responseContent) ;
    }


    //以下是客户层面的设备组操作

    //获取客户管理的设备组
    @RequestMapping(value = "/customerGroups", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String getCustomerGroups(@RequestParam int limit, @RequestParam(required = false) String textSearch,
                                  @RequestParam(required = false) String idOffset,
                                  @RequestParam(required = false) String textOffset) {


        String requestAddr = "/api/v1/deviceaccess/groups/customer/" + getCustomerId() +"?limit=" + limit;
        if(textSearch != null){
            requestAddr = requestAddr + "&textSearch=" + textSearch;
        }
        if(idOffset != null){
            requestAddr = requestAddr + "&idOffset=" + idOffset;
        }
        if(textOffset != null){
            requestAddr = requestAddr + "&textOffset=" + textOffset;
        }

        String responseContent = null ;
        try {
            responseContent = HttpUtil.sendGetToThingsboard("http://" + getDeviceAccessServer() + requestAddr ,
                    null,
                    request.getSession());
        } catch (Exception e) {
            return retFail(e.toString()) ;
        }
        return retSuccess(decode(responseContent)) ;
    }





    public String decode(String str){
        JsonObject jsonObject = (JsonObject)new JsonParser().parse(str);
        String a=jsonObject.getAsJsonArray("data").toString();
        return a;
    }

   /* public Integer getTenantId(){
        HttpSession session = request.getSession();
        String res = HttpUtil.getAccessToken(session);
        JsonObject parsed = (JsonObject)new JsonParser().parse(res);
        Integer tenantId = parsed.get("tenant_id").getAsInt();
        return tenantId;
    }
*/

}

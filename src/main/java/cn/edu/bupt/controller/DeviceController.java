package cn.edu.bupt.controller;

import cn.edu.bupt.controller.string2jsonDecode.DeviceInfoDecode;
import cn.edu.bupt.controller.string2jsonDecode.DeviceTokenInfoDecode;
import cn.edu.bupt.utils.HttpUtil;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;


/**
 * Created by Administrator on 2017/12/23.
 *
 * 设备数据的获取
 * -- 该类的所有接口返回采用统一json
 */
@RestController
@RequestMapping("/api/device")
@Slf4j
public class DeviceController extends DefaultThingsboardAwaredController {

    public static final String DEVICE_ID = "deviceId";

    /**
     * 获取租户所有设备的信息
     * @return
     */
    @ApiOperation(value="获取租户所有设备的信息", notes="获取租户所有设备的信息")
    @RequestMapping(value = "/alltenantdevices/{tenantId}", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String getDevices(@PathVariable Integer tenantId) {
        String requestAddr = "/api/v1/tenant/devices/"  + tenantId ;

        StringBuffer param = new StringBuffer();
        param.append("limit").append("=").append("30");

        requestAddr = requestAddr + "?" + param ;

        String responseContent = null ;
        try {
            responseContent = HttpUtil.sendGetToThingsboard("http://" + getDeviceAccessServer() + requestAddr,
                    null,
                    request.getSession()) ;
        } catch (Exception e) {
            return retFail(e.toString()) ;
        }

        try {
            JsonArray deviceJsonArr = (JsonArray)DeviceInfoDecode.deviceArr(responseContent) ;
            return retSuccess(deviceJsonArr.toString()) ;
        } catch (Exception e) {
            return retFail(e.toString()) ;
        }

    }

    /**
     * @deprecated
     * @param deviceId
     * @return
     */
    //此方法后台不存在
    @ApiOperation(value = "得到设备的accesstoken", notes = "根据deviceId得到设备的accesstoken")
    @ApiImplicitParam(name = "deviceId", value = "设备ID", required = true, dataType = "String", paramType = "path")
    @RequestMapping(value = "/updatecoordinate/{deviceId}", method = RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String updateDeviceCoordinate(@PathVariable String deviceId,@RequestBody String json) {
        String requestAddr = "/api/device/updatecoordinate/"+deviceId ;
        String responseContent = null ;
        try{
            responseContent = HttpUtil.sendPostToThingsboard("http://" + getDeviceAccessServer() + requestAddr,
                    null,
                    new JsonParser().parse(json).getAsJsonObject(),
                    request.getSession());
        }catch(Exception e){
            return retFail(e.toString()) ;
        }
        return retSuccess(responseContent);
    }


    @RequestMapping(value = "/token/{deviceId}", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String getDeviceToken(@PathVariable String deviceId) {
        String requestAddr = "/api/v1/credentialbyid/" + deviceId ;
        String responseContent = null ;
        try{
            responseContent = HttpUtil.sendGetToThingsboard("http://" + getDeviceAccessServer() + requestAddr,
                    null,
                    request.getSession());
        }catch(Exception e){
            return retFail(e.toString()) ;
        }
        JsonObject token = (JsonObject)DeviceTokenInfoDecode.deviceToken(responseContent);
        return retSuccess(token.toString());
    }

    @ApiOperation(value = "得到设备的accesstoken", notes = "根据deviceId得到设备的accesstoken <br /> {\"name\":\"test0name\",\"type\":\"default\",\"additionalInfo\":{\"description\":\"jhdajd\"}}")
    @ApiImplicitParam(name="deviceInfo", value = "设备信息JSON", required = true, paramType = "body")
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ResponseBody
    public String createDevice(@RequestBody String deviceInfo) {
        String requestAddr = "/api/v1/device" ;

        /**
         * 这里的deviceInfo为json
         * {"name":"test0name","type":"default","additionalInfo":{"description":"jhdajd"}}
         */
        JsonObject deviceInfoJson = (JsonObject)new JsonParser().parse(deviceInfo);

        String responseContent = null ;
        try {
            responseContent = HttpUtil.sendPostToThingsboard("http://" + getDeviceAccessServer() + requestAddr,
                    null,
                    deviceInfoJson,
                    request.getSession()) ;
        } catch (Exception e) {
            return retFail(e.toString()) ;
        }

        return retSuccess(responseContent) ;
    }

    @ApiOperation(value = "删除设备", notes = "根据deviceId删除设备")
    @ApiImplicitParam(name="deviceId", value = "设备ID", required = true, paramType = "path", dataType = "String")
    @RequestMapping(value = "/delete/{deviceId}", method = RequestMethod.DELETE)
    @ResponseBody
    public String delete(@PathVariable(DEVICE_ID) String strDeviceId) {
        String requestAddr ="http://"+ getDeviceAccessServer() +String.format("/api/v1/device/%s", strDeviceId);
        try{
            String responseContent = HttpUtil.sendDeletToThingsboard(requestAddr,request.getSession());
            return retSuccess(responseContent) ;
        }catch(Exception e){
            return retFail(e.toString()) ;
        }
    }

    //此方法与获取token方法区别，未改
    @ApiOperation(value = "得到设备的accesstoken", notes = "根据deviceId得到设备的accesstoken")
    @ApiImplicitParam(name = "strDeviceId", value = "设备ID", required = true, dataType = "String", paramType = "path")
    @RequestMapping(value = "/accesstoken/{deviceId}", method = RequestMethod.GET)
    @ResponseBody
    public String getDeviceAccessToken(@PathVariable(DEVICE_ID) String strDeviceId) {
        String requestAddr = "http://" + getDeviceAccessServer() + "/api/device/"+strDeviceId+"/credentials" ;

        try {
            String responseContent = HttpUtil.sendGetToThingsboard(requestAddr,
                    null,
                    request.getSession()) ;
            try {
                JsonObject jsonR = (JsonObject)new JsonParser().parse(responseContent);
                String credentialsId = jsonR.get("credentialsId").getAsString() ;
                JsonObject jsonObject = new JsonObject();
                jsonObject.addProperty("credentialsId", credentialsId);
                return retSuccess(jsonObject.toString()) ;
            } catch (Exception e) {
                return retFail(e.toString()) ;
            }
        } catch (Exception e) {
            return retFail(e.toString()) ;
        }
    }

    @ApiOperation(value = "得到parentId设备的设备信息", notes = "得到parentId设备的设备信息")
    @ApiImplicitParam(name = "parentDeviceId", value = "父设备ID", required = true, dataType = "String", paramType = "path")
    @RequestMapping(value = "/parentDevices/{parentDeviceId}", method = RequestMethod.GET)
    @ResponseBody
    public String getParentDevices(@PathVariable String parentDeviceId) {
        String requestAddr = "http://" + getDeviceAccessServer() + "/api/v1/parentdevices/"+parentDeviceId + "?limit=5";

            try{
                String responseContent = HttpUtil.sendGetToThingsboard(requestAddr,
                        null,
                        request.getSession());
                return retSuccess(responseContent) ;
            }catch(Exception e){
                return retFail(e.toString()) ;
            }
    }
}

package cn.edu.bupt.controller;

import cn.edu.bupt.controller.string2jsonDecode.DeviceInfoDecode;
import cn.edu.bupt.utils.HttpUtil;
import com.google.gson.JsonArray;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

/**
 * Created by whr on 2018/1/15.
 *  -- 该类为3Dwebgis提供接口
 *  -- 该类的所有接口返回采用统一json
 */

@RestController
@RequestMapping("/api/3Dwebgis")
@Slf4j
public class WebGis3DController extends DefaultThingsboardAwaredController {

    public static final String DEVICE_ID = "deviceId";

    @RequestMapping(value = "/all3Ddevices", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    private String get3Ddevices() {
        String requestAddr = "/api/tenant/devices?limit=20";

        String responseContent = null;
        try {
            responseContent = HttpUtil.sendGetToThingsboard("http://" + getServer() + requestAddr,
                    null,
                    request.getSession());
        } catch (Exception e) {
            return retFail(e.toString());
        }

        try {
            JsonArray device3DJsonArr = (JsonArray) DeviceInfoDecode.deviceArr(responseContent);
            return retSuccess(device3DJsonArr.toString());
        } catch (Exception e) {
            return retFail(e.toString());
        }
    }

    @RequestMapping(value = "/device/{deviceId}", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    public String getDevice(@PathVariable("deviceId") String dId){
        String requestAddr = String.format("/api/device/%s", dId);

        String responseContent = null ;
        try {
            responseContent = HttpUtil.sendGetToThingsboard("http://" + getServer() + requestAddr,
                    null,
                    request.getSession()) ;
        } catch (Exception e) {
            return retFail(e.toString()) ;
        }
        return retSuccess(responseContent) ;
    }


    @RequestMapping(value = "/search/{textSearch}", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String searchDevices(@PathVariable String textSearch) {
        String requestAddr = "/api/tenant/devices" ;

        StringBuffer s = new StringBuffer();
        s.append("textSearch=").append(textSearch).append("&").
                append("limit").append("=").append("3");

        requestAddr = requestAddr + "?" + s ;

        String responseContent = null ;
        try {
            responseContent = HttpUtil.sendGetToThingsboard("http://" + getServer() + requestAddr,
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


}




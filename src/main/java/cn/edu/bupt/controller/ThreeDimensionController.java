package cn.edu.bupt.controller;

import cn.edu.bupt.controller.string2jsonDecode.DeviceInfoDecode;
import cn.edu.bupt.utils.HttpUtil;
import com.google.gson.JsonArray;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

/**
 * Created by Administrator on 2017/12/23.
 *
 *  -- 该类的所有接口返回采用统一json
 */

@RestController
@RequestMapping("/api/3Dwebgis")
@Slf4j
public class ThreeDimensionController extends DefaultThingsboardAwaredController {

    public static final String DEVICE_ID = "deviceId";

    @RequestMapping(value = "/all3Ddevices", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    private String getthreeDdevices() {
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
            JsonArray threeDdeviceJsonArr = (JsonArray) DeviceInfoDecode.deviceArr(responseContent);
            return retSuccess(threeDdeviceJsonArr.toString());
        } catch (Exception e) {
            return retFail(e.toString());
        }
    }

    @RequestMapping(value = "/device/{deviceId}", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    public String searchDevice(@PathVariable("deviceId") String dId){
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
}




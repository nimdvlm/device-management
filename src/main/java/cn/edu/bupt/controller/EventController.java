package cn.edu.bupt.controller;

import cn.edu.bupt.utils.HttpUtil;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/event")
@Slf4j
public class EventController extends DefaultThingsboardAwaredController {


    @RequestMapping(value = "/{deviceId}", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String getDevices(@PathVariable("deviceId") String deviceId,
                             @RequestParam int limit,
                             @RequestParam long startTime,
                             @RequestParam long endTime,
                             @RequestParam(required = false) boolean ascOrder) {

        String requestAddr = "/api/v1/event/"  + getTenantId() +
                "/" + deviceId + "?limit=" + limit + "&startTime=" + startTime
                + "&endTime=" + endTime;
        if(ascOrder == true){
            requestAddr = requestAddr + "&ascOrder=" + ascOrder;
        }

        String responseContent = null ;
        try {
            responseContent = HttpUtil.sendGetToThingsboard("http://" + getDeviceAccessServer() + requestAddr,
                    null,
                    request.getSession()) ;
        } catch (Exception e) {
            return retFail(e.toString()) ;
        }
        try {
            JsonObject j = (JsonObject)new JsonParser().parse(responseContent);
            String a = j.getAsJsonArray("data").toString();
            a = a.replace("\"\\{","\\{");
            a = a.replace("\\}\"","\\}");
            return retSuccess(a);
        } catch (Exception e) {
            return retFail(e.toString());
        }

    }
}

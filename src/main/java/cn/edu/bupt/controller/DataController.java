package cn.edu.bupt.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import cn.edu.bupt.utils.HttpUtil;

/**
 * Created by liyou on 2018/1/15.
 */

@RestController
@RequestMapping("/api/data")
public class DataController extends DefaultThingsboardAwaredController{

    @RequestMapping(value="/getHistoricalData/{deviceId}/{startTime}/{endTime}", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    public String getHistoricalData(@PathVariable("deviceId") String deviceId, @PathVariable("startTime") String startTime, @PathVariable("endTime") String endTime)
    {
        String requestKeyAddr = "/api/plugins/telemetry/DEVICE/"+deviceId+"/keys/TIMESERIES";

        String responseKeyContent = null ;
        try {
            responseKeyContent = HttpUtil.sendGetToThingsboard("http://" + getServer() + requestKeyAddr,
                    null,
                    request.getSession());
        } catch (Exception e) {
            return retFail(e.toString()) ;
        }

        responseKeyContent=responseKeyContent.replaceAll("[\\[\\]]","");
        responseKeyContent=responseKeyContent.replaceAll("\"","");

        String requestHistoricalDataAddr = "/api/plugins/telemetry/DEVICE/"+ deviceId
                + "/values/TIMESERIES?keys=" +responseKeyContent
                + "&startTs="+startTime
                + "&endTs="+endTime
                + "&interval=0&limit=100";

        String responseHistoricalDataContent = null ;
        try {
            responseHistoricalDataContent = HttpUtil.sendGetToThingsboard("http://" + getServer() + requestHistoricalDataAddr,
                    null,
                    request.getSession());
        } catch (Exception e) {
            return retFail(e.toString()) ;
        }

        return retSuccess(responseHistoricalDataContent);
    }

    @RequestMapping(value="/getAttribute/{deviceId}")
    public String getAttributes(@PathVariable("deviceId") String deviceId)
    {
        String requestKeyAddr = "/api/plugins/telemetry/DEVICE/"+deviceId+"/keys/ATTRIBUTES";

        String responseKeyAttributeContent = null ;
        try {
            responseKeyAttributeContent = HttpUtil.sendGetToThingsboard("http://" + getServer() + requestKeyAddr,
                    null,
                    request.getSession());
        } catch (Exception e) {
            return retFail(e.toString()) ;
        }

        responseKeyAttributeContent=responseKeyAttributeContent.replaceAll("[\\[\\]]","");
        responseKeyAttributeContent=responseKeyAttributeContent.replaceAll("\"","");

        String requestHistoricalDataAddr = "/api/plugins/telemetry/DEVICE/"+ deviceId
                + "/values/ATTRIBUTES?keys=" +responseKeyAttributeContent;

        String responseAttributeDataContent = null ;
        try {
            responseAttributeDataContent = HttpUtil.sendGetToThingsboard("http://" + getServer() + requestHistoricalDataAddr,
                    null,
                    request.getSession());
        } catch (Exception e) {
            return retFail(e.toString()) ;
        }

        return retSuccess(responseAttributeDataContent);
    }
}

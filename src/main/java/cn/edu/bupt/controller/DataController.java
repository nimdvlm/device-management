package cn.edu.bupt.controller;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;
import cn.edu.bupt.utils.HttpUtil;


/**
 * Created by liyou on 2018/1/15.
 */

@RestController
@RequestMapping("/api/data")
public class DataController extends DefaultThingsboardAwaredController{


    //后台无此方法，应该是从卡夫卡拿实时数据
    @RequestMapping(value="/getKeyData/{deviceId}", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    public String getKeyData(@PathVariable("deviceId") String deviceId) {
        String requestKeyAddr = "/api/v1/data/alllatestdata/" + deviceId ;

        String responseKeyContent = null;
        try {
            responseKeyContent = HttpUtil.sendGetToThingsboard("http://" + getDeviceAccessServer() + requestKeyAddr,
                    null,
                    request.getSession());
        } catch (Exception e) {
            return retFail(e.toString());
        }
        return retSuccess(responseKeyContent);
    }

    //获取所有最新数据
    @RequestMapping(value="/getlatestData/{deviceId}", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    public String getlatestData(@PathVariable("deviceId") String deviceId)
    {
        /*String responseKeyContent=getKeyData(deviceId);
        responseKeyContent=responseKeyContent.replaceAll("[\\[\\]]","");
        responseKeyContent=responseKeyContent.replaceAll("\"","");*/

        String requestHistoricalDataAddr = "/api/v1/data/alllatestdata/"+ deviceId;


        String responseHistoricalDataContent = null ;
        try {
            responseHistoricalDataContent = HttpUtil.sendGetToThingsboard("http://" + getDeviceAccessServer() + requestHistoricalDataAddr,
                    null,
                    request.getSession());
        } catch (Exception e) {
            return retFail(e.toString()) ;
        }

        return retSuccess(responseHistoricalDataContent);
    }


    //从某时间段的设备历史数据,device-access不一定能用
    @RequestMapping(value="/getHistoricalData/{deviceId}", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    public String getHistoricalData(@PathVariable("deviceId") String deviceId,
                                    @RequestParam String key,
                                    @RequestParam String startTs,
                                    @RequestParam String endTs,
                                    @RequestParam int limit)
    {
        /*String responseKeyContent=getKeyData(deviceId);
        responseKeyContent=responseKeyContent.replaceAll("[\\[\\]]","");
        responseKeyContent=responseKeyContent.replaceAll("\"","");*/

        String requestHistoricalDataAddr = "/api/v1/data/alldata/"+ deviceId
                + "?key=" + key
                + "&startTs="+ startTs
                + "&endTs="+ endTs
                + "&limit=" + limit;

        String responseHistoricalDataContent = null ;
        try {
            responseHistoricalDataContent = HttpUtil.sendGetToThingsboard("http://" + getDeviceAccessServer() + requestHistoricalDataAddr,
                    null,
                    request.getSession());
        } catch (Exception e) {
            return retFail(e.toString()) ;
        }

        return retSuccess(responseHistoricalDataContent);
    }


    //获取所有遥测数据的key
    @RequestMapping(value="/allKeys/{deviceId}", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    public String getAllKeys(@PathVariable("deviceId") String deviceId) {
        String requestKeyAddr = "/api/v1/data/allKeys/" + deviceId ;

        String responseContent = null;
        try {
            responseContent = HttpUtil.sendGetToThingsboard("http://" + getDeviceAccessServer() + requestKeyAddr,
                    null,
                    request.getSession());
        } catch (Exception e) {
            return retFail(e.toString());
        }
        return retSuccess(responseContent);
    }



    //获取所有属性
    @RequestMapping(value="/getKeyAttribute/{deviceId}", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    public String getKeyAttributes(@PathVariable("deviceId") String deviceId) {
        String requestKeyAddr = "/api/v1/allattributes/" + deviceId ;

        String responseKeyAttributeContent = null;
        try {
            responseKeyAttributeContent = HttpUtil.sendGetToThingsboard("http://" + getDeviceAccessServer() + requestKeyAddr,
                    null,
                    request.getSession());
        } catch (Exception e) {
            return retFail(e.toString());
        }
        return retSuccess(responseKeyAttributeContent);
    }

    //获取属性对应键的值
    @ApiOperation(value="test - tjl", notes="根据device的id来指定操作")
    @ApiImplicitParam(name = "deviceId", value = "设备ID", required = true, dataType = "String", paramType = "path")
    @RequestMapping(value="/getAttribute/{deviceId}/{key}", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    public String getValueAttribute(@PathVariable("deviceId") String deviceId, @PathVariable String key)
    {
        /*String responseKeyAttributeContent=getKeyAttributes(deviceId);

        responseKeyAttributeContent=responseKeyAttributeContent.replaceAll("[\\[\\]]","");
        responseKeyAttributeContent=responseKeyAttributeContent.replaceAll("\"","");*/

        String requestHistoricalDataAddr = "/api/v1/attributes/"+ deviceId
                + "/" +key;

        String responseAttributeDataContent = null ;
        try {
            responseAttributeDataContent = HttpUtil.sendGetToThingsboard("http://" + getDeviceAccessServer() + requestHistoricalDataAddr,
                    null,
                    request.getSession());
        } catch (Exception e) {
            return retFail(e.toString()) ;
        }

        return retSuccess(responseAttributeDataContent);
    }
}

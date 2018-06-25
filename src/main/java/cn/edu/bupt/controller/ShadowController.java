package cn.edu.bupt.controller;

import cn.edu.bupt.data.CachForDeviceService;
import cn.edu.bupt.utils.HttpUtil;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.TreeMap;
import java.util.TreeSet;
import java.util.concurrent.atomic.AtomicInteger;


/**
 * Created by Administrator on 2017/12/23.
 *
 *  -- 该类的所有接口返回采用统一json
 */
@RestController
@RequestMapping("/api/shadow")
@Slf4j
public class ShadowController extends DefaultThingsboardAwaredController {

    private static AtomicInteger requester = new AtomicInteger();
    
    @RequestMapping(value = "/{deviceId}",method = RequestMethod.GET)
    public String getDeviceShadow(@PathVariable("deviceId") String deviceId){
        String url = "http://"+getDeviceAccessServer()+"/api/v1/deviceaccess/device/"+deviceId;
        try{
        String res = HttpUtil.sendGetToThingsboard(url,new HashMap<>(),request.getSession());
        JsonObject body = new JsonParser().parse(res).getAsJsonObject();
        JsonElement manufacturerName = body.get("manufacture");
        JsonElement deviceTypeName = body.get("deviceType");
        JsonElement modelName = body.get("model");
        if(manufacturerName==null||deviceTypeName==null||modelName==null) return null;

        String url1 = "http://"+getServiceManagementServer()+"api/v1/servicemanagement/ability/"+manufacturerName.getAsString()
                +"/"+deviceTypeName.getAsString()+"/"+modelName.getAsString();
        String serviceDes = HttpUtil.sendGetToThingsboard(url1,new HashMap<>(),(request.getSession()));

//        JsonObject body = new JsonObject();
//        body.addProperty("requestName","get");
////        JsonObject res = new JsonObject();
//        try{
//            String s = HttpUtil.sendPostToThingsboard(url,null,body,request.getSession());
////            res.addProperty("response_code",0);
//            JsonObject obj = new JsonParser().parse(s).getAsJsonObject();
//            CachForDeviceService.put(deviceId,obj);
////            res.add("response_msg",obj);
            return responseUtil.onSuccess(serviceDes) ;
        }catch(Exception e){
            return retFail(e.toString());
        }
    }
    @RequestMapping(value = "/task/list/{deviceId}",method = RequestMethod.GET)
    public String taskLists(@PathVariable("deviceId") String deviceId){
        String url = "http://"+getDeviceAccessServer()+"/api/shadow/list/"+deviceId;
//        JsonObject res = new JsonObject();
        try{
            String s = HttpUtil.sendGetToThingsboard(url,null,request.getSession());
    //        JsonObject obj = new JsonParser().parse(s).getAsJsonObject();
            return  retSuccess(s);
        }catch(Exception e){
            return retFail(e.toString());
        }
    }

    @RequestMapping(value = "/task/cancel/{deviceId}/{taskId}",method = RequestMethod.GET)
    public String cancelTask(@PathVariable("deviceId") String deviceId,@PathVariable String taskId){
        String url = "http://"+getDeviceAccessServer()+"/api/shadow/cancel/"+deviceId+"/"+taskId;
        try{
            String s = HttpUtil.sendGetToThingsboard(url,null,request.getSession());
           // JsonObject obj = new JsonParser().parse(s).getAsJsonObject();
         // return responseUtil.onSuccess(obj) ;
           return  retSuccess(s);
        }catch(Exception e){
            return retFail(e.toString());
        }
    }




    @RequestMapping(value = "/control/{deviceId}",method = RequestMethod.POST)
    public String controlDevice(@RequestBody String bd,@PathVariable("deviceId") String deviceId){
        String url ;
//        JsonObject body = new JsonObject();
//        body.addProperty("requestName","serviceCall");
        JsonObject paramsAndServiceName = new JsonParser().parse(bd).getAsJsonObject();
//
//        if(paramsAndServiceName.has("startTime")){
//            if(paramsAndServiceName.has("period")){
//                url =  "http://"+getDeviceAccessServer()+"/api/shadow/"+deviceId+"/period/"+
//                        paramsAndServiceName.get("startTime").getAsString()+"/"+paramsAndServiceName.get("period").getAsString();
//                paramsAndServiceName.remove("startTime");
//                paramsAndServiceName.remove("period");
//            }else{
//                url =  "http://"+getDeviceAccessServer()+"/api/shadow/"+deviceId+"/delay/"+
//                        paramsAndServiceName.get("startTime").getAsString();
//                paramsAndServiceName.remove("startTime");
//            }
//        }else{
//            url = "http://"+getDeviceAccessServer()+"/api/shadow/"+deviceId;
//        }
//
////        String serviceNmae = paramsAndServiceName.get("serviceName").getAsString();
////        JsonObject service = CachForDeviceService.get(deviceId,serviceName);
////        paramsAndServiceName.remove("serviceName");
////        service.get("serviceBody").getAsJsonObject().add("params",paramsAndServiceName);
////        body.add("requestBody",service);
//        body.add("requestBody",paramsAndServiceName);
//        JsonObject res = new JsonObject();
        try{
            url = "http://"+getDeviceAccessServer()+"/api/v1/deviceaccess/rpc/"+deviceId+"/"+requester.getAndIncrement();
            String s = HttpUtil.sendPostToThingsboard(url,null,paramsAndServiceName,request.getSession());
//            res.addProperty("response_code",0);
//            res.addProperty("response_msg",s);
            return retSuccess(s);
        }catch(Exception e){
            return retFail(e.toString());
        }
    }
}

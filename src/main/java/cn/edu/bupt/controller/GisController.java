package cn.edu.bupt.controller;

import cn.edu.bupt.App;
import com.google.gson.JsonObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Administrator on 2017/12/26.
 */
@RestController
@RequestMapping("/api/gis")
@Slf4j
public class GisController {

    Map<String,String> map = new HashMap<String,String>();
    {
        map.put("uid4","9b870020-d026-11e7-a71a-974188b66f66");//ws
        map.put("uid5","9b829350-d026-11e7-a71a-974188b66f66");//pm2.59b829350-d026-11e7-a71a-974188b66f66
        map.put("uid1","21c6f6d0-bd45-11e7-b3aa-0bb30bb377bd");//开
        map.put("uid2","21c6f6d0-bd45-11e7-b3aa-0bb30bb377bd");//关

    }

    @RequestMapping("/getmodel.do")
    public String getSensors() {
        System.out.print("get model");
        JsonObject obj = new JsonObject();
        obj.addProperty("传感器","upload/sensor_center.stl");
        obj.addProperty("摄像头","upload/shexiangtou.stl");

        return obj.toString();
    }

    @RequestMapping("/getdata.do")
    public String getData(@PathParam( "uid")String uid) throws Exception{
        System.out.println("getdata :"+uid);
           String res = null;
        if("uid4".equals(uid)){
            res = "26 ℃";
        }else{
            res = "33";
        }
        return res;
    }

    @RequestMapping("/control.do")
    public String control(@PathParam("uid")String uid) throws Exception{
//        System.out.println("control :"+uid);
//        ThingsBoardApi api =  ThingsBoardApi.getInstance("10.108.217.227",8080);
//        String token = api.api_token("tenant@thingsboard.org","tenant");
//        String responce =  null;
//        if("uid1".equals(uid)){
//            responce = api.api_RPC(map.get(uid),token,"setValue_1138530",true);
//        }else{
//            responce = api.api_RPC(map.get(uid),token,"setValue_1138530",false);
//        }
//        System.out.println(responce);
        return "rpc cpmmd send ok";
    }
}

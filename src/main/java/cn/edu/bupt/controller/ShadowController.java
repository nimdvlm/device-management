package cn.edu.bupt.controller;

import cn.edu.bupt.utils.HttpUtil;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by Administrator on 2017/12/23.
 */
@RestController
@RequestMapping("/api/shadow")
@Slf4j
public class ShadowController {
    @Value("${bupt.thingsboard.host}")
    String thingsboardHost ;

    @Value("${bupt.thingsboard.port}")
    String thingsboardPort ;

    @Autowired
    HttpServletRequest request;

    @RequestMapping("/api/shadow/{deviceId}")
    public String getDeviceShadow(@PathVariable("deviceId") String deviceId){
        String url = getServer()+"/api/shadow/"+deviceId;
        JsonObject body = new JsonObject();
        body.addProperty("requestName","get");
        JsonObject res = new JsonObject();
        try{
            String s = HttpUtil.sendPostToThingsboard(url,null,body,request.getSession());
            res.addProperty("responce_code",0);
            res.add("responce_msg",new JsonParser().parse(s));
            return res.toString();
        }catch(Exception e){
            res.addProperty("responce_code",1);
            res.addProperty("responce_msg","get deviceShadow failed");
            return res.toString();
        }
    }

    @RequestMapping("/api/shadow/control/{deviceId}")
    public String controlDevice(@RequestBody String bd,@PathVariable("deviceId") String deviceId){
        String url = getServer()+"/api/shadow/"+deviceId;
        JsonObject body = new JsonObject();
        body.addProperty("requestName","serviceCall");
        body.add("requestBody",new JsonParser().parse(bd));
        JsonObject res = new JsonObject();
        try{
            String s = HttpUtil.sendPostToThingsboard(url,null,body,request.getSession());
            res.addProperty("responce_code",0);
            res.addProperty("responce_msg",s);
            return res.toString();
        }catch(Exception e){
            res.addProperty("responce_code",1);
            res.addProperty("responce_msg","control failed");
            return res.toString();
        }
    }

    private String getServer() {
        return thingsboardHost+":"+thingsboardPort ;
    }
}

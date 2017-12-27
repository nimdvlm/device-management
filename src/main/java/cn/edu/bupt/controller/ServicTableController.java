package cn.edu.bupt.controller;

import cn.edu.bupt.data.CachForDeviceService;
import cn.edu.bupt.utils.HttpUtil;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by Administrator on 2017/12/26.
 */
@RestController
@RequestMapping("/api/service")
@Slf4j
public class ServicTableController {
    @Value("${bupt.thingsboard.host}")
    String thingsboardHost ;

    @Value("${bupt.thingsboard.port}")
    String thingsboardPort ;

    @Autowired
    HttpServletRequest request;

    @RequestMapping("/saveGroup")
    public String saveDeviceTable(@RequestBody String json) {
        String url = "http://"+getServer()+"/api/servicetable/saveServiceGroup";
        try{
            String responce = HttpUtil.sendPostToThingsboard(url,null,new JsonParser().parse(json).getAsJsonObject(),request.getSession());
            return responce;
        }catch(Exception e){
            e.printStackTrace();
            return "保存失败";
        }
    }

    @RequestMapping("/saveServiceToGroup")
    public String saveServiceToGroup(@RequestBody String json) {
        String url = "http://"+getServer()+"/api/servicetable/add";
        try{
            String responce = HttpUtil.sendPostToThingsboard(url,null,new JsonParser().parse(json).getAsJsonObject(),request.getSession());
            return responce;
        }catch(Exception e){
            e.printStackTrace();
            return "保存失败";
        }
    }

    @RequestMapping("/serviceTables")
    public String serviceTableLists() {
        String url = "http://"+getServer()+"/api/servicetable/getAll";
        try{
            return HttpUtil.sendGetToThingsboard(url,null,request.getSession());
        }catch(Exception e){
            e.printStackTrace();
            return "保存失败";
        }
    }

    @RequestMapping(value = "/services/{manufacture}/{deviceType}/{model}", method = RequestMethod.GET)
    @ResponseBody
    public String serviceTableList(@PathVariable String manufacture,@PathVariable String deviceType,@PathVariable String model) {
        String requestAddr = String.format("/services/%s/%s/%s", manufacture, deviceType, model) ;
        String url = "http://"+getServer() + requestAddr;
        try{
            return HttpUtil.sendGetToThingsboard(url,null,request.getSession());
        }catch(Exception e){
            JsonObject errorInfoJson = new JsonObject() ;
            errorInfoJson.addProperty("responce_code", 1);
            errorInfoJson.addProperty("responce_msg", "can't link to thingsboard: " + e);
            return errorInfoJson.toString() ;
        }
    }

    private String getServer() {
        return thingsboardHost+":"+thingsboardPort ;
    }
}

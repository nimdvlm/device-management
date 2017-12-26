package cn.edu.bupt.controller;

import cn.edu.bupt.data.CachForDeviceService;
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

    @RequestMapping("/save")
    public String saveDeviceTable(@RequestBody String json) {
        String url = "http://"+getServer()+"/api/servicetable/save";
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

    private String getServer() {
        return thingsboardHost+":"+thingsboardPort ;
    }
}

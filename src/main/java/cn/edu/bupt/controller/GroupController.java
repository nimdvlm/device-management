package cn.edu.bupt.controller;

import cn.edu.bupt.utils.HttpClientUtil;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

/**
 * Created by Administrator on 2017/12/23.
 */
@RestController
@RequestMapping("/api/group")
@Slf4j
public class GroupController {

    @Value("${bupt.thingsboard.host}")
    String thingsboardHost ;

    @Value("${bupt.thingsboard.port}")
    String thingsboardPort ;

    @Autowired
    HttpServletRequest request;

    @RequestMapping(value = "/noauth/devicegroup/data", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String devicegroupList() {
        String requestAddr = "/api/group/groups" ;

        String token = (String)request.getSession().getAttribute("token");

        StringBuffer param = new StringBuffer();
        param.append("limit").append("=").append("100");

        String responseContent = HttpClientUtil.getInstance()
                .sendHttpGet("http://" + getServer()
                        + requestAddr, param.toString(), token);

        JsonElement parse = new JsonParser().parse(responseContent);
        JsonObject parsed = (JsonObject) parse ;

        return parsed.toString() ;
    }

    @RequestMapping(value = "/noauth/devicegroup/create", method = RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String create(@RequestBody String deviceGroupInfo) {
        String requestAddr = "/api/group/save" ;

        String token = (String)request.getSession().getAttribute("token");

        String responseContent = HttpClientUtil.getInstance()
                .sendHttpPost("http://" + getServer()
                        + requestAddr, deviceGroupInfo, token) ;

        JsonElement parse = new JsonParser().parse(responseContent);
        JsonObject parsed = (JsonObject) parse ;

        return parsed.toString() ;
    }

    @RequestMapping(value = "/noauth/devicegroup/delete", method = RequestMethod.GET)
    @ResponseBody
    public String delete(@RequestParam String deviceGroupId) {
        String requestAddr = String.format("/api/group/delete/%s", deviceGroupId);

        String token = (String)request.getSession().getAttribute("token");

        String responseContent = HttpClientUtil.getInstance()
                .sendHttpGet("http://" + getServer()
                        + requestAddr, "", token) ;

        JsonElement parse = new JsonParser().parse(responseContent);
        JsonObject parsed = (JsonObject) parse ;

        return parsed.toString() ;
    }

    @PostConstruct
    public void test() {
        log.info("============== the info of DeviceGroup ==============") ;
        log.info("thingsboard: ++++ " + getServer());
        log.info("request: ++++ " + this.request.toString()) ;
    }

    private String getServer() {
        return thingsboardHost+":"+thingsboardPort ;
    }
}

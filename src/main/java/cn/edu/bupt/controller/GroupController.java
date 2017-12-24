package cn.edu.bupt.controller;

import cn.edu.bupt.utils.HttpClientUtil;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by Administrator on 2017/12/23.
 */
@RestController
@RequestMapping("/api/group")
public class GroupController {

    @Value("${bupt.thingsboard.server}")
    String thingsboardAddress ;

    @Autowired
    private HttpServletRequest request;

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

    private String getServer() {
        return thingsboardAddress ;
    }
}

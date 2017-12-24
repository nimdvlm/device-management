package cn.edu.bupt.controller;

import cn.edu.bupt.utils.HttpClientUtil;
import cn.edu.bupt.utils.HttpUtil;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * Created by Administrator on 2017/12/23.
 */
@RestController
@RequestMapping("/api/device")
@Slf4j
public class DeviceController {
    @Value("${bupt.thingsboard.host}")
    String thingsboardHost ;

    @Value("${bupt.thingsboard.port}")
    String thingsboardPort ;

    private String getServer() {
        return thingsboardHost+":"+thingsboardPort ;
    }

    @Autowired
    HttpServletRequest request;

    @RequestMapping(value = "/allDevices", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    private String getDevices() {
        String requestAddr = "/api/tenant/devices" ;
        String token = this.guaranteeSessionToken();

        StringBuffer param = new StringBuffer();
        param.append("limit").append("=").append("100");

        String responseContent = HttpClientUtil.getInstance()
                .sendHttpGet("http://" + getServer()
                        + requestAddr, param.toString(), token);

        JsonElement parse = new JsonParser().parse(responseContent);
        JsonObject parsed = (JsonObject) parse ;
        String jsonStr = parsed.toString();

        /**
         *  status\createdTime\additionalInfo\type\name
         *  在data下的列表中
         {
         "id": {
         "entityType": "DEVICE",
         "id": "9b944690-d026-11e7-a71a-974188b66f66"
         },
         "createdTime": 1511424989561,
         "tenantId": {
         "entityType": "TENANT",
         "id": "a2b168b0-b7ec-11e7-8fc0-55922b5d47f6"
         },
         "customerId": {
         "entityType": "CUSTOMER",
         "id": "13814000-1dd2-11b2-8080-808080808080"
         },
         "name": "curtain_1",  ---> name
         "type": "default",
         "additionalInfo": null
         },
         */

        return jsonStr ;
    }

    private String guaranteeSessionToken() {
        HttpSession session = request.getSession();
        String token = (String)session.getAttribute("token");
        if(token == null || token.isEmpty()) {
            boolean accessToken = HttpUtil.getAccessToken(session);
            request.setAttribute("token", token);
            // todo throw NoToken
        }
        return token ;
    }
}

package cn.edu.bupt.controller;

import cn.edu.bupt.utils.HttpUtil;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

/**
 * Created by CZX on 2018/5/6.
 */
@RestController
@RequestMapping("/api/account")
@Slf4j
public class TenantController extends DefaultThingsboardAwaredController{

    public static final String API_PREFIX = "/api/v1/account/";

    @RequestMapping(value = "/tenant",params = {"tenantId"}, method = RequestMethod.GET)
    @ResponseBody
    public String getTenantById(@RequestParam Integer tenantId){
        String requestAddr = API_PREFIX+"tenant";
        StringBuffer param = new StringBuffer();
        param.append("tenantId").append("=").append(tenantId);
        requestAddr = requestAddr + "?" + param ;
        String responseContent = null ;
        try {
            responseContent = HttpUtil.sendGetToThingsboard("http://" + getAccountServer() + requestAddr,
                    null,
                    request.getSession()) ;
            return responseContent;
        } catch (Exception e) {
            return retFail(e.toString()) ;
        }
    }

    @RequestMapping(value = "/tenant", method = RequestMethod.POST)
    @ResponseBody
    public String createTenant(@RequestBody String tenantInfo) {
        String requestAddr = API_PREFIX + "tenant";
        JsonObject TenantInfoJson = (JsonObject) new JsonParser().parse(tenantInfo);
        String responseContent = null;
        try {
            responseContent = HttpUtil.sendPostToThingsboard("http://" + getAccountServer() + requestAddr,
                    null,
                    TenantInfoJson,
                    request.getSession());
            return responseContent;
        } catch (Exception e) {
            return retFail(e.toString());
        }
    }

    @RequestMapping(value = "/tenant", method = RequestMethod.PUT)
    @ResponseBody
    public String updateTenant(@RequestBody String tenantInfo) {
        String requestAddr = API_PREFIX + "tenant";
        JsonObject TenantInfoJson = (JsonObject) new JsonParser().parse(tenantInfo);
        String responseContent = null;
        try {
            responseContent = HttpUtil.sendPutToThingsboard("http://" + getAccountServer() + requestAddr,
                    null,
                    TenantInfoJson,
                    request.getSession());
            return responseContent;
        } catch (Exception e) {
            return retFail(e.toString());
        }
    }

    @Transactional
    @RequestMapping(value = "/tenant",params = {"tenantId"}, method = RequestMethod.DELETE)
    @ResponseStatus(value = HttpStatus.OK)
    public void deleteTenant(@RequestParam Integer tenantId) {
        String requestAddr = API_PREFIX + "tenant";
        StringBuffer param = new StringBuffer();
        param.append("tenantId").append("=").append(tenantId);
        requestAddr = requestAddr + "?" + param ;
        String responseContent = null;
        try {
            responseContent = HttpUtil.sendDeletToThingsboard("http://" + getAccountServer() + requestAddr,
                    request.getSession());
        } catch (Exception e) {
        }
    }

    @RequestMapping(value = "/tenants", params = {  "limit","page"  }, method = RequestMethod.GET)
    @ResponseBody
    public String getTenants(@RequestParam int limit,
                               @RequestParam int page) {
        String requestAddr = API_PREFIX + "tenants";
        StringBuffer param = new StringBuffer();
        param.append("limit").append("=").append(limit).append("&").append("page").append("=").append(page);
        requestAddr = requestAddr + "?" + param ;
        String responseContent = null;
        try {
            responseContent = HttpUtil.sendGetToThingsboard("http://" + getAccountServer() + requestAddr,
                    null,
                    request.getSession()) ;
            return responseContent;
        } catch (Exception e) {
            return retFail(e.toString()) ;
        }
    }
}

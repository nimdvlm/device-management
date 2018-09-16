package cn.edu.bupt.controller;

import cn.edu.bupt.utils.HttpUtil;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.extern.slf4j.Slf4j;
import okhttp3.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

/**
 * Created by CZX on 2018/5/6.
 */
@RestController
@RequestMapping("/api/account")
@Slf4j
public class TenantController extends DefaultThingsboardAwaredController{

    @Autowired
    private HttpServletResponse response;

    public static final String API_PREFIX = "/api/v1/account/";

    @RequestMapping(value = "/tenant",params = {"tenantId"}, method = RequestMethod.GET)
    @ResponseBody
    public String getTenantById(@RequestParam Integer tenantId){
        String requestAddr = API_PREFIX+"tenant";
        StringBuffer param = new StringBuffer();
        param.append("tenantId").append("=").append(tenantId);
        requestAddr = requestAddr + "?" + param ;
        try {
            Response responseContent = HttpUtil.sendGet("http://" + getAccountServer() + requestAddr,
                    null,
                    request.getSession()) ;
            response.setStatus(responseContent.code());
            return responseContent.body().string();
        } catch (Exception e) {
            return retFail(e.toString()) ;
        }
    }

    @RequestMapping(value = "/tenant", method = RequestMethod.POST)
    @ResponseBody
    public String createTenant(@RequestBody String tenantInfo) {
        String requestAddr = API_PREFIX + "tenant";
        JsonObject TenantInfoJson = (JsonObject) new JsonParser().parse(tenantInfo);
        try {
            Response responseContent = HttpUtil.sendPost("http://" + getAccountServer() + requestAddr,
                    null,
                    TenantInfoJson,
                    request.getSession());
            response.setStatus(responseContent.code());
            return responseContent.body().string();
        } catch (Exception e) {
            return retFail(e.toString());
        }
    }

    @RequestMapping(value = "/tenant", method = RequestMethod.PUT)
    @ResponseBody
    public String updateTenant(@RequestBody String tenantInfo) {
        String requestAddr = API_PREFIX + "tenant";
        JsonObject TenantInfoJson = (JsonObject) new JsonParser().parse(tenantInfo);
        try {
            Response responseContent = HttpUtil.sendPut("http://" + getAccountServer() + requestAddr,
                    null,
                    TenantInfoJson,
                    request.getSession());
            response.setStatus(responseContent.code());
            return responseContent.body().string();
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
        try {
            Response responseContent = HttpUtil.sendDelet("http://" + getAccountServer() + requestAddr,
                    request.getSession());
            response.setStatus(responseContent.code());
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
        try {
            Response responseContent = HttpUtil.sendGet("http://" + getAccountServer() + requestAddr,
                    null,
                    request.getSession()) ;
            response.setStatus(responseContent.code());
            return responseContent.body().string();
        } catch (Exception e) {
            return retFail(e.toString()) ;
        }
    }

    @RequestMapping(value = "/tenant/updateSuspendedStatus", params = {  "suspended","tenantId" }, method = RequestMethod.PUT)
    @ResponseBody
    public void updateSuspended(@RequestParam Boolean suspended,@RequestParam int tenantId) {
        String requestAddr = API_PREFIX + "updateSuspendedStatus";
        StringBuffer param = new StringBuffer();
        param.append("suspended").append("=").append(suspended).append("&").append("id").append("=").append(tenantId);
        requestAddr = requestAddr + "?" + param ;
        try {
            Response responseContent = HttpUtil.sendPut("http://" + getAccountServer() + requestAddr,
                    null,
                    null,
                    request.getSession()) ;
            response.setStatus(responseContent.code());
            responseContent.body().string();
        } catch (Exception e) {
            retFail(e.toString()) ;
        }
    }
}

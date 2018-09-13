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

@RestController
@RequestMapping("/api/account")
@Slf4j
public class UserController extends DefaultThingsboardAwaredController{

    @Autowired
    private HttpServletResponse response;

    public static final String API_PREFIX = "/api/v1/account/";

    @RequestMapping(value = "/user",params = {"userId"}, method = RequestMethod.GET)
    @ResponseBody
    public String getUserById(@RequestParam Integer userId){
        String requestAddr = API_PREFIX+"user";
        StringBuffer param = new StringBuffer();
        param.append("userId").append("=").append(userId);
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

    @RequestMapping(value = "/tenantAdmin", method = RequestMethod.POST)
    @ResponseBody
    public String createTenantAdmin(@RequestBody String userInfo){
        String requestAddr = API_PREFIX+"tenantAdmin";
        JsonObject UserInfoJson = (JsonObject) new JsonParser().parse(userInfo);
        try {
            Response responseContent = HttpUtil.sendPost("http://" + getAccountServer() + requestAddr,
                    null,
                    UserInfoJson,
                    request.getSession());
            response.setStatus(responseContent.code());
            return responseContent.body().string();
        } catch (Exception e) {
            return retFail(e.toString());
        }
    }

    @RequestMapping(value = "/customerUser", method = RequestMethod.POST)
    @ResponseBody
    public String createCustomerUser(@RequestBody String userInfo){
        String requestAddr = API_PREFIX+"customerUser";
        JsonObject UserInfoJson = (JsonObject) new JsonParser().parse(userInfo);
        try {
            Response responseContent = HttpUtil.sendPost("http://" + getAccountServer() + requestAddr,
                    null,
                    UserInfoJson,
                    request.getSession());
            response.setStatus(responseContent.code());
            return responseContent.body().string();
        } catch (Exception e) {
            return retFail(e.toString());
        }
    }

    @RequestMapping(value = "/user", method = RequestMethod.PUT)
    @ResponseBody
    public String updateUser(@RequestBody String userInfo) {
        String requestAddr = API_PREFIX + "update";
        JsonObject UserInfoJson = (JsonObject) new JsonParser().parse(userInfo);
        try {
            Response responseContent = HttpUtil.sendPut("http://" + getAccountServer() + requestAddr,
                    null,
                    UserInfoJson,
                    request.getSession());
            response.setStatus(responseContent.code());
            return responseContent.body().string();
        } catch (Exception e) {
            return retFail(e.toString());
        }
    }

    @Transactional
    @RequestMapping(value = "/user",params = {"userId"}, method = RequestMethod.DELETE)
    @ResponseStatus(value = HttpStatus.OK)
    public void deleteUser(@RequestParam Integer userId) {
        String requestAddr = API_PREFIX + "user";
        StringBuffer param = new StringBuffer();
        param.append("userId").append("=").append(userId);
        requestAddr = requestAddr + "?" + param ;
        try {
            Response responseContent = HttpUtil.sendDelet("http://" + getAccountServer() + requestAddr,
                    request.getSession());
            response.setStatus(responseContent.code());
        } catch (Exception e) {
        }
    }

    @RequestMapping(value = "/tenant/users", params = {  "tenantId","limit","page"  }, method = RequestMethod.GET)
    @ResponseBody
    public String getTenantAdmins(@RequestParam Integer tenantId,
                                  @RequestParam int limit,
                                  @RequestParam int page) {
        String requestAddr = API_PREFIX + "tenant/users";
        StringBuffer param = new StringBuffer();
        param.append("tenantId").append("=").append(tenantId).append("&").append("limit").append("=").append(limit).append("&").append("page").append("=").append(page);
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

    @RequestMapping(value = "/tenant/usersPage", params = {  "tenantId","limit"}, method = RequestMethod.GET)
    @ResponseBody
    public String getTenantAdminsPage(@RequestParam Integer tenantId,
                                  @RequestParam int limit) {
        String requestAddr = API_PREFIX + "tenant/usersPages";
        StringBuffer param = new StringBuffer();
        param.append("tenantId").append("=").append(tenantId).append("&").append("limit").append("=").append(limit);
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

    @RequestMapping(value = "/customer/users", params = {  "customerId","limit","page"  }, method = RequestMethod.GET)
    @ResponseBody
    public String getCustomerUsers(@RequestParam Integer customerId,
                             @RequestParam int limit,
                             @RequestParam int page) {
        String requestAddr = API_PREFIX + "customer/users";
        StringBuffer param = new StringBuffer();
        param.append("customerId").append("=").append(customerId).append("&").append("limit").append("=").append(limit).append("&").append("page").append("=").append(page);
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

    @RequestMapping(value = "/customer/usersPage", params = {  "customerId","limit"}, method = RequestMethod.GET)
    @ResponseBody
    public String getCustomerUsersPage(@RequestParam Integer customerId,
                                   @RequestParam int limit) {
        String requestAddr = API_PREFIX + "customer/usersPages";
        StringBuffer param = new StringBuffer();
        param.append("customerId").append("=").append(customerId).append("&").append("limit").append("=").append(limit);
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

}
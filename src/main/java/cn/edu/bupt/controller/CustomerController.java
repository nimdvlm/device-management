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
 * Created by CZX on 2018/5/5.
 */
@RestController
@RequestMapping("/api/account")
@Slf4j
public class CustomerController extends DefaultThingsboardAwaredController{

    public static final String API_PREFIX = "/api/v1/account/";

    @Autowired
    private HttpServletResponse response;

    @RequestMapping(value = "/customer",params = {"customerId"}, method = RequestMethod.GET)
    @ResponseBody
    public String getCustomerById(@RequestParam Integer customerId){
        String requestAddr = API_PREFIX+"customer";
        StringBuffer param = new StringBuffer();
        param.append("customerId").append("=").append(customerId);
        requestAddr = requestAddr + "?" + param ;
        try {
            Response responseContent = HttpUtil.sendGet("http://" + getAccountServer() + requestAddr,
                    null,
                    request.getSession()) ;
            response.setStatus(responseContent.code());
            return responseContent.body().string();
        } catch (Exception e) {
            throw new RuntimeException(e.toString());
        }
    }

    @RequestMapping(value = "/customerName",params = {"customerId"}, method = RequestMethod.GET)
    @ResponseBody
    public String getCustomerName(@RequestParam Integer customerId){
        String requestAddr = API_PREFIX+"customerName";
        StringBuffer param = new StringBuffer();
        param.append("customerId").append("=").append(customerId);
        requestAddr = requestAddr + "?" + param ;
        try {
            Response responseContent = HttpUtil.sendGet("http://" + getAccountServer() + requestAddr,
                    null,
                    request.getSession()) ;
            response.setStatus(responseContent.code());
            return responseContent.body().string();
        } catch (Exception e) {
            throw new RuntimeException(e.toString());
        }
    }

    @RequestMapping(value = "/customer", method = RequestMethod.POST)
    @ResponseBody
    public String createCustomer(@RequestBody String customerInfo) {
        String requestAddr = API_PREFIX + "customer";
        JsonObject CustomerInfoJson = (JsonObject) new JsonParser().parse(customerInfo);
        try {
            Response responseContent = HttpUtil.sendPost("http://" + getAccountServer() + requestAddr,
                    null,
                    CustomerInfoJson,
                    request.getSession());
            response.setStatus(responseContent.code());
            return responseContent.body().string();
        } catch (Exception e) {
            throw new RuntimeException(e.toString());
        }
    }

    @RequestMapping(value = "/customer", method = RequestMethod.PUT)
    @ResponseBody
    public String updateCustomer(@RequestBody String customerInfo) {
        String requestAddr = API_PREFIX + "customer";
        JsonObject CustomerInfoJson = (JsonObject) new JsonParser().parse(customerInfo);
        try {
            Response responseContent = HttpUtil.sendPut("http://" + getAccountServer() + requestAddr,
                    null,
                    CustomerInfoJson,
                    request.getSession());
            response.setStatus(responseContent.code());
            return responseContent.body().string();
        } catch (Exception e) {
            throw new RuntimeException(e.toString());
        }
    }

    @Transactional
    @RequestMapping(value = "/customer",params = {"customerId"}, method = RequestMethod.DELETE)
    @ResponseStatus(value = HttpStatus.OK)
    public void deleteCustomer(@RequestParam Integer customerId) {
        String requestAddr = API_PREFIX + "customer";
        StringBuffer param = new StringBuffer();
        param.append("customerId").append("=").append(customerId).append("&tenantId=").append(getTenantId());
        requestAddr = requestAddr + "?" + param ;
        try {
            Response responseContent = HttpUtil.sendDelet("http://" + getAccountServer() + requestAddr,
                    request.getSession());
            response.setStatus(responseContent.code());
        } catch (Exception e) {
            throw new RuntimeException(e.toString());
        }
    }

    @RequestMapping(value = "/customers", params = {  "limit","page"  }, method = RequestMethod.GET)
    @ResponseBody
    public String getCustomers(@RequestParam int limit,
                               @RequestParam int page) {
        String requestAddr = API_PREFIX + "customers";
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
            throw new RuntimeException(e.toString());
        }
    }

    @RequestMapping(value = "/customersPage", params = { "limit"}, method = RequestMethod.GET)
    @ResponseBody
    public String getCustomersPage(@RequestParam int limit) {
        String requestAddr = API_PREFIX + "customersPages";
        StringBuffer param = new StringBuffer();
        param.append("limit").append("=").append(limit);
        requestAddr = requestAddr + "?" + param ;
        try {
            Response responseContent = HttpUtil.sendGet("http://" + getAccountServer() + requestAddr,
                    null,
                    request.getSession()) ;
            response.setStatus(responseContent.code());
            return responseContent.body().string();
        } catch (Exception e) {
            throw new RuntimeException(e.toString());
        }
    }

}

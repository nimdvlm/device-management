package cn.edu.bupt.controller;

import cn.edu.bupt.utils.HttpUtil;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.extern.slf4j.Slf4j;
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
        String responseContent = null ;
        try {
            responseContent = HttpUtil.sendGetToThingsboard("http://" + getAccountServer() + requestAddr,
                    null,
                    request.getSession()) ;
            ResStatus(responseContent);
            return responseContent;
        } catch (Exception e) {
            return retFail(e.toString()) ;
        }
    }

    @RequestMapping(value = "/customerName",params = {"customerId"}, method = RequestMethod.GET)
    @ResponseBody
    public String getCustomerName(@RequestParam Integer customerId){
        String requestAddr = API_PREFIX+"customerName";
        StringBuffer param = new StringBuffer();
        param.append("customerId").append("=").append(customerId);
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

    @RequestMapping(value = "/customer", method = RequestMethod.POST)
    @ResponseBody
    public String createCustomer(@RequestBody String customerInfo) {
        String requestAddr = API_PREFIX + "customer";
        JsonObject CustomerInfoJson = (JsonObject) new JsonParser().parse(customerInfo);
        String responseContent = null;
        try {
            responseContent = HttpUtil.sendPostToThingsboard("http://" + getAccountServer() + requestAddr,
                    null,
                    CustomerInfoJson,
                    request.getSession());
            ResStatus(responseContent);
            return responseContent;
        } catch (Exception e) {
            return retFail(e.toString());
        }
    }

    @RequestMapping(value = "/customer", method = RequestMethod.PUT)
    @ResponseBody
    public String updateCustomer(@RequestBody String customerInfo) {
        String requestAddr = API_PREFIX + "customer";
        JsonObject CustomerInfoJson = (JsonObject) new JsonParser().parse(customerInfo);
        String responseContent = null;
        try {
            responseContent = HttpUtil.sendPutToThingsboard("http://" + getAccountServer() + requestAddr,
                    null,
                    CustomerInfoJson,
                    request.getSession());
            ResStatus(responseContent);
            return responseContent;
        } catch (Exception e) {
            return retFail(e.toString());
        }
    }

    @Transactional
    @RequestMapping(value = "/customer",params = {"customerId"}, method = RequestMethod.DELETE)
    @ResponseStatus(value = HttpStatus.OK)
    public void deleteCustomer(@RequestParam Integer customerId) {
        String requestAddr = API_PREFIX + "customer";
        StringBuffer param = new StringBuffer();
        param.append("customerId").append("=").append(customerId);
        requestAddr = requestAddr + "?" + param ;
        String responseContent = null;
        try {
            responseContent = HttpUtil.sendDeletToThingsboard("http://" + getAccountServer() + requestAddr,
                    request.getSession());
            ResStatus(responseContent);
        } catch (Exception e) {
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

    @RequestMapping(value = "/customersPage", params = { "limit"}, method = RequestMethod.GET)
    @ResponseBody
    public String getCustomersPage(@RequestParam int limit) {
        String requestAddr = API_PREFIX + "customersPages";
        StringBuffer param = new StringBuffer();
        param.append("limit").append("=").append(limit);
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

    private void ResStatus(String responseContent){
        JsonObject responseJson = (JsonObject) new JsonParser().parse(responseContent);
        if(responseJson.has("status")){
            response.setStatus(responseJson.get("status").getAsInt());
        }
    }
}

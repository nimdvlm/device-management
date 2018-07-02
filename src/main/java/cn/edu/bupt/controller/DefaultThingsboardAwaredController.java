package cn.edu.bupt.controller;

import cn.edu.bupt.utils.HttpUtil;
import cn.edu.bupt.utils.ResponseUtil;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * Created by tangjialiang on 2018/1/10.
 *
 * - 包含了一些thingsboard的基本信息
 * - 包含了一些基本的处理方法
 */


public class DefaultThingsboardAwaredController {

    @Value("${device-access.host}")
    String deviceAccessHost;

    @Value("${device-access.port}")
    String deviceAccessPort;

    @Value("${smart_ruler.host}")
    String smartRulerHost;

    @Value("${smart_ruler.port}")
    String smartRulerPort;

    @Value("${service-management.host}")
    String serviceManagementHost;

    @Value("${service-management.port}")
    String serviceManagementPort;

    @Value("${bupt.thingsboard.host}")
    String thingsboardHost ;

    @Value("${bupt.thingsboard.port}")
    String thingsboardPort ;

    @Value("${account.host}")
    String accountHost ;

    @Value("${account.port}")
    String accountPort ;

    @Autowired
    HttpServletRequest request;

    @Autowired
    ResponseUtil responseUtil ;

    //为了不报错，暂时不要删除这个方法
    protected String getServer(){
        return "";
    }


    protected String getDeviceAccessServer() {
        return deviceAccessHost+":"+ deviceAccessPort ;
    }

    protected String getSmartRulerServer() {
        return smartRulerHost+":"+smartRulerPort ;
    }

    protected String getAccountServer(){return accountHost+":"+accountPort ; }

    protected String getServiceManagementServer() {
        return serviceManagementHost+":"+serviceManagementPort ;
    }

    protected String retSuccess(String msg) {
        return responseUtil.onSuccess(msg) ;
    }

    protected String retFail(String msg) {
        return responseUtil.onFail(msg) ;
    }

    public Integer getTenantId(){
        HttpSession sess = request.getSession();
        String res = HttpUtil.getAccessToken(sess);
        JsonObject jo = (JsonObject)new JsonParser().parse(res);
        Integer tenantId = jo.get("tenant_id").getAsInt();
        return tenantId;
    }

    public Integer getCustomerId(){
        HttpSession sess = request.getSession();
        String res = HttpUtil.getAccessToken(sess);
        JsonObject jo = (JsonObject)new JsonParser().parse(res);
        Integer customerId = jo.get("customer_id").getAsInt();
        return customerId;
    }
}

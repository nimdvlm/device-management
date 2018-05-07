package cn.edu.bupt.controller;

import cn.edu.bupt.utils.ResponceUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import javax.servlet.http.HttpServletRequest;

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
    ResponceUtil responceUtil ;

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
        return responceUtil.onSuccess(msg) ;
    }

    protected String retFail(String msg) {
        return responceUtil.onFail(msg) ;
    }
}

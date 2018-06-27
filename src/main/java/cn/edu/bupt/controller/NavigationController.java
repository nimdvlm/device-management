package cn.edu.bupt.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by Administrator on 2017/12/23.
 *
 * 返回的字符串在处理上为静态资源的地址
 */
@Controller
@Slf4j
public class NavigationController {

    @Autowired
    private HttpServletRequest request;

    @RequestMapping("/")
    public String  index() {
        return "template/home";
    }

    @RequestMapping("/signin")
    public String  login() {
        return "static/login/index";
    }

    @RequestMapping("/modifyPassword")
    public String  modifyPassword() {
        return "static/login/modifyPassword";
    }

    @RequestMapping("/home")
    public String  getHomepage() {
        return "static/login/chooseIndex";
    }

    @RequestMapping("/thingsUserManager")
    public String  getUserThingManager() {
        return "static/thingsManage/side-menu-user";
    }

    @RequestMapping("/thingsTenantManager")
    public String  getTenantThingManager() {
        return "static/thingsManage/side-menu-tenantManager";
    }

    @RequestMapping("/thingsSystemManager")
    public String  getSystemThingManager() {
        return "static/thingsManage/side-menu-systemManager";
    }

    @RequestMapping("/homePage")
    public String  device_group() {
        return "static/thingsManage/homePage";
    }

    @RequestMapping("/deviceList")
    public String  homepages() {
        return "static/thingsManage/deviceList";
    }

    @RequestMapping("/deviceGroup")
    public String  homepage() {
        return "static/thingsManage/deviceGroup";
    }

    @RequestMapping("/service")
    public String  services() {
        return "static/thingsManage/service";
    }

    @RequestMapping("/rules")
    public String  rules() {
        return "static/thingsManage/rules";
    }

    @RequestMapping("/plugins")
    public String  plugins() { return "static/thingsManage/plugins"; }

    @RequestMapping("/evaluate")
    public String  assess() { return "static/thingsManage/evaluate"; }

    @RequestMapping("/widgetsLibrary")
    public String  widgetsLibrary() { return "static/thingsManage/widgetsLibrary"; }

    @RequestMapping("/dashboard")
    public String  dashboard() { return "static/thingsManage/dashboard"; }

    @RequestMapping("/customer")
    public String  customer() {
        return "static/thingsManage/customer";
    }

    @RequestMapping("/tenant")
    public String  tenant() {
        return "static/thingsManage/tenant";
    }

    @RequestMapping("/customerUser")
    public String customerUserCtrl() {return "static/thingsManage/customerUser";}

    @RequestMapping("/statisticsDevice")
    public String statisticsDevice() { return  "static/bigData/device1"; }

    @RequestMapping("/statisticsData")
    public String statisticsData() {return  "static/bigData/statisticsdata";}

    @RequestMapping("/realtimeDevice")
    public String realtimeDevice() {return "static/bigData/device2";}

    @RequestMapping("/realtimeData")
    public String realtimeData() {return "static/bigData/dydatatrue";}

    @RequestMapping("/historicalData")
    public String historicalData() {return "static/bigData/hisdata";}
}

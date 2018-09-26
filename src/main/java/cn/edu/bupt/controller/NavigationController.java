package cn.edu.bupt.controller;

import cn.edu.bupt.utils.HttpUtil;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.extern.slf4j.Slf4j;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

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

    @Autowired
    private HttpServletResponse response;

    @RequestMapping("/")
    public String  index() {
        return "template/home";
    }

    @RequestMapping("/signin")
    public String  login() { return "static/login/index"; }

    @RequestMapping("/modifyPassword")
    public String  modifyPassword() {
        return "static/login/modifyPassword";
    }

    @RequestMapping("/rolePool")
    public String  getRolePool() {
        return "static/auth/RolePool";
    }

    @RequestMapping("/userPool")
    public String  getUserPool() {
        return "static/auth/UserPool";
    }

    @RequestMapping("/allocationCenterIndex")
    public String  allocationCenter() {
        return "static/allocationCenter/allocationCenterIndex";
    }

    @RequestMapping("/KUBERNETESIndex")
    public String  KUBERNETES() { return "static/KUBERNETES/KUBERNETESIndex"; }

    @RequestMapping("/logCenterIndex")
    public String  logCenterIndex() {
        return "static/logCenter/logCenterIndex";
    }

    @RequestMapping("/home")
    public String  getHomepage() {
        return "static/login/chooseIndex";
    }

    @RequestMapping("/autoLogin")
    public String  autoLogin(@RequestParam String username, @RequestParam String password,@RequestParam String module){
        HttpSession session = request.getSession();
        session.setAttribute("username", username);
        session.setAttribute("password", password);

        String res = HttpUtil.getAccessToken(session);
        JsonObject responseJson = (JsonObject) new JsonParser().parse(res);
        if(responseJson.has("error")){
            session.removeAttribute("username");
            session.removeAttribute("password");
            throw new IllegalArgumentException(responseJson.get("error_description").getAsString());
        }else if(responseJson.has("access_token")){
            UsernamePasswordToken usernamePasswordToken=new UsernamePasswordToken(username,password);
            Subject subject = SecurityUtils.getSubject();
            subject.login(usernamePasswordToken);   //完成登录
        }

        Cookie userLevel = new Cookie("userLevel",responseJson.get("authority").getAsString());
        Cookie tenantId = new Cookie("tenantId",responseJson.get("tenant_id").getAsString());
        Cookie userId = new Cookie("userId",responseJson.get("user_id").getAsString());
        Cookie customerId = new Cookie("customerId",responseJson.get("customer_id").getAsString());
        response.addCookie(userLevel);
        response.addCookie(tenantId);
        response.addCookie(userId);
        response.addCookie(customerId);
        String authority = responseJson.get("authority").getAsString();
        module = module.toLowerCase();
        switch(module){
            case "thingsmanager":
                if(authority.equals("TENANT_ADMIN")) {
                    return "redirect:/thingsTenantManager";
                }else if(authority.equals("SYS_ADMIN")){
                    return "redirect:/thingsSystemManager";
                }else{
                    return "redirect:/thingsUserManager";
                }

            case "bigdata":
                return "redirect:/bigData/device1.html?id="+responseJson.get("user_id").getAsString();

            case "gis":
                return "redirect:http://39.104.189.84:8800/?id="+responseJson.get("user_id").getAsString()+"&token="+responseJson.get("access_token").getAsString();

            case "disconf":
                return "redirect:http://39.104.189.84:30090/main.html";

            case "log":
                return "redirect:http://39.104.189.84:30190";

            case "k8s":
                return "redirect:http://39.104.189.84:30000/";

            case "auth":
                return "redirect:/userPool";

            default:
                throw new IllegalArgumentException("Bad Module Name");


        }

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

    @RequestMapping("/deviceModelManagement")
    public String deviceModelManagement() {return "static/thingsManage/deviceModelManagement";}

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
    public String statisticsDevice() {
        return  "static/bigData/device1";
    }

    @RequestMapping("/statisticsData")
    public String statisticsData() {
        return  "static/bigData/statisticsdata";
    }

    @RequestMapping("/realtimeDevice")
    public String realtimeDevice() {
        return "static/bigData/device2";
    }

    @RequestMapping("/realtimeData")
    public String realtimeData() {
        return "static/bigData/dydatatrue";
    }

    @RequestMapping("/historicalData")
    public String historicalData() {return "static/bigData/hisdata";}
    @RequestMapping("/homeTenant")
    public String homeTenant() {return "static/thingsManage/homeTenant";}
    @RequestMapping("/tenantAdmin")
    public String tenantAdmin() {return "static/thingsManage/tenantAdmin";}

}

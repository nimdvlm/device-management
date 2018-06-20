package cn.edu.bupt.controller;

import cn.edu.bupt.utils.HttpUtil;
import com.fasterxml.jackson.databind.JsonNode;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Created by tangjialiang on 2018/1/7.
 *
 * 用户登录接口
 */
@RestController
@RequestMapping("/api/user")
public class LoginController extends DefaultThingsboardAwaredController {

    @Autowired
    private HttpServletRequest request;

    @Autowired
    private HttpServletResponse response;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String login(@RequestBody String body){
        JsonObject json1 = new JsonParser().parse(body).getAsJsonObject();
        String username = json1.get("username").getAsString() ;
        String password = json1.get("password").getAsString() ;
        HttpSession session = request.getSession();

        session.setAttribute("username", username);
        session.setAttribute("password", password);

        String res = HttpUtil.getAccessToken(session);
        JsonObject responseJson = (JsonObject) new JsonParser().parse(res);
        if(responseJson.has("error")){
            response.setStatus(400);
            session.removeAttribute("username");
            session.removeAttribute("password");
        }else if(responseJson.has("access_token")){
            UsernamePasswordToken usernamePasswordToken=new UsernamePasswordToken(username,password);
            Subject subject = SecurityUtils.getSubject();
            subject.login(usernamePasswordToken);   //完成登录
        }
        return res;
//        JsonObject json = new JsonObject();
//        if(res){ // 成功登录
//            UsernamePasswordToken usernamePasswordToken=new UsernamePasswordToken(username,password);
//            Subject subject = SecurityUtils.getSubject();
//            subject.login(usernamePasswordToken);   //完成登录
//
//            json.addProperty("responce_code",0);
//            json.addProperty("responce_msg","login ok");
//            response.setStatus(200);
//        }else{
//            json.addProperty("responce_code",1);
//            json.addProperty("responce_msg","wrong username or password");
//            session.removeAttribute("username");
//            session.removeAttribute("password");
//            response.setStatus(401);
//        }
//        return json.toString();
    }

    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public String logout(HttpServletRequest request, HttpServletResponse response){
        HttpSession session = request.getSession();
        String token = (String) session.getAttribute("token");
        boolean res = HttpUtil.logout(token);
        if(res) {
            session.removeAttribute("username");
            session.removeAttribute("password");
            Subject subject = SecurityUtils.getSubject();
            subject.logout();
            return retSuccess("success to logout");
        }else {
            return retFail("fail to logout");
        }
    }

    @RequestMapping(value = "/changePassword", method = RequestMethod.PUT)
    public String changePassword (
            @RequestBody String changePasswordRequest) {
        String requestAddr = "/api/v1/account/changePassword";
        JsonObject PasswordInfoJson = (JsonObject) new JsonParser().parse(changePasswordRequest);
        String responseContent = null;
        try {
            responseContent = HttpUtil.sendPutToThingsboard("http://" + getAccountServer() + requestAddr,
                    null,
                    PasswordInfoJson,
                    request.getSession());
            if(responseContent.equals("")){
                return "succeed to change password!";
            }else {
                JsonObject responseJson = (JsonObject) new JsonParser().parse(responseContent);
                if (responseJson.has("status")) {
                    response.setStatus(responseJson.get("status").getAsInt());
                }
                return responseContent;
            }
        } catch (Exception e) {
            return retFail(e.toString());
        }

    }

    @RequestMapping(value = "/refreshToken", method = RequestMethod.POST)
    public String refreshToken () {
        HttpSession session = request.getSession();
        String refresh_token = session.getAttribute("refreshToken").toString();
        String res = HttpUtil.refreshToken(refresh_token);
        JsonObject newAccessTokenJson = (JsonObject) new JsonParser().parse(res);
        session.setAttribute("token",newAccessTokenJson.get("access_token").getAsString());
        session.setAttribute("refreshToken",newAccessTokenJson.get("refresh_token").getAsString());
        return newAccessTokenJson.get("access_token").getAsString();
    }

}
package cn.edu.bupt.controller;

import cn.edu.bupt.utils.HttpUtil;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Created by tangjialiang on 2018/1/7.
 *
 */
@RestController
@RequestMapping("/api/user")
public class LoginController {
    @Autowired
    private HttpServletRequest request;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String login(@RequestBody String body){
        JsonObject json1 = new JsonParser().parse(body).getAsJsonObject();
        String username = json1.get("username").getAsString() ;
        String password = json1.get("password").getAsString() ;
        HttpSession session = request.getSession();

        session.setAttribute("username", username);
        session.setAttribute("password", password);

        boolean res = HttpUtil.getAccessToken(session);

        JsonObject json = new JsonObject();
        if(res){ // 成功登录
            UsernamePasswordToken usernamePasswordToken=new UsernamePasswordToken(username,password);
            Subject subject = SecurityUtils.getSubject();
            subject.login(usernamePasswordToken);   //完成登录

            json.addProperty("responce_code",0);
            json.addProperty("responce_msg","login ok");
        }else{
            json.addProperty("responce_code",1);
            json.addProperty("responce_msg","wrong username or password");
            session.removeAttribute("username");
            session.removeAttribute("password");
        }
        return json.toString();
    }

    @RequestMapping(value = "/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response){
        HttpSession session = request.getSession();
        session.removeAttribute("username");
        session.removeAttribute("password");
        JsonObject json = new JsonObject();
        Subject subject = SecurityUtils.getSubject();
        subject.logout();
        json.addProperty("responce_code",0);
        json.addProperty("responce_msg","logout ok");

        return "redirect:/homepage";
    }

}
package cn.edu.bupt.controller;

import cn.edu.bupt.utils.HttpUtil;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Created by Administrator on 2017/12/24.
 */
@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private HttpServletRequest request;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String login(@RequestBody String body){
        JsonObject json1 = new JsonParser().parse(body).getAsJsonObject();
        HttpSession session = request.getSession();
        session.setAttribute("username",json1.get("username"));
        session.setAttribute("password",json1.get("password"));
        boolean res = HttpUtil.getAccessToken(session);
        JsonObject json = new JsonObject();
        if(res){
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
        json.addProperty("responce_code",0);
        json.addProperty("responce_msg","logout ok");

        return "redirect:/homepage";
    }

}
package cn.edu.bupt.controller;

import cn.edu.bupt.utils.HttpUtil;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;


/**
 * Created by liyou on 2018/1/11.
 */
@RestController
@RequestMapping("/api/Token")
public class HttpController
{
    @RequestMapping(value = "/getToken", method = {RequestMethod.GET, RequestMethod.POST})
    public String getToken(HttpSession session)
    {

        HttpUtil.getAccessToken(session);
        String token=session.getAttribute("token").toString();
        return token;
    }
}

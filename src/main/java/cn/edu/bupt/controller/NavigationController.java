package cn.edu.bupt.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


import javax.servlet.http.HttpServletRequest;

/**
 * Created by Administrator on 2017/12/23.
 */
@Controller
@Slf4j
public class NavigationController {

    @Autowired
    private HttpServletRequest request;

    @RequestMapping("/")
    public String  index() {
        return "index";
    }

    @RequestMapping("/login")
    public String  login() {
        return "login";
    }

    @RequestMapping("/logout")
    public String  logout() {
        return "logout";
    }

    @RequestMapping("/homepage")
    public String  homepage() {
        return "homepage";
    }

}

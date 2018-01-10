package cn.edu.bupt.controller;

import cn.edu.bupt.utils.ResponceUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by Administrator on 2018/1/10.
 */
@RestController
@RequestMapping("/api/rule")
public class RuleController {
    @Value("${bupt.thingsboard.host}")
    String thingsboardHost ;

    @Value("${bupt.thingsboard.port}")
    String thingsboardPort ;

    @Autowired
    HttpServletRequest request;

    @Autowired
    ResponceUtil responceUtil;

    private String getServer() {
        return thingsboardHost+":"+thingsboardPort ;
    }
}

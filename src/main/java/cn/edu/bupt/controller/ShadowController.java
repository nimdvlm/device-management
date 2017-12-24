package cn.edu.bupt.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Administrator on 2017/12/23.
 */
@RestController
@RequestMapping("/api/shadow")
@Slf4j
public class ShadowController {
    @Value("${bupt.thingsboard.host}")
    String thingsboardHost ;

    @Value("${bupt.thingsboard.port}")
    String thingsboardPort ;

    private String getServer() {
        return thingsboardHost+":"+thingsboardPort ;
    }
}

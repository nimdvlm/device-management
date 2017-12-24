package cn.edu.bupt.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Administrator on 2017/12/23.
 */
@RestController
@RequestMapping("/api/device")
@Slf4j
public class DeviceController {
    @Value("${bupt.thingsboard.host}")
    String thingsboardHost ;

    @Value("${bupt.thingsboard.port}")
    String thingsboardPort ;

    @RequestMapping(value = "/allDevices", method = RequestMethod.GET)
    private String getDevices() {
        return thingsboardHost+":"+thingsboardPort ;
    }
}

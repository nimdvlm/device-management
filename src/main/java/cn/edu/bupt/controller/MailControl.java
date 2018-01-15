package cn.edu.bupt.controller;

import cn.edu.bupt.controller.sendEmailMethod.SendMail;
import org.omg.CORBA.Request;
import org.springframework.http.HttpRequest;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by liyou on 2018/1/11.
 */

@RestController
@RequestMapping("/api/mail")
public class MailControl extends DefaultThingsboardAwaredController{

    @RequestMapping(value = "/sendMail", method = RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
    public void sendMail(@RequestParam("to[]") String[] to,@RequestParam("subject") String subject,@RequestParam("text") String text) throws Exception {
        SendMail sendMail=new SendMail();
        String s=sendMail.sendEmail(to,subject,text);
    }
}

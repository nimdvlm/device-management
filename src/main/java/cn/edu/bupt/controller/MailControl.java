package cn.edu.bupt.controller;

import cn.edu.bupt.controller.sendEmailMethod.SendMail;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by hasee on 2018/1/11.
 */

@RestController
@RequestMapping("/mail")
public class MailControl extends DefaultThingsboardAwaredController{

    @RequestMapping("/sendMail")
    public void sendMail(@RequestParam("to") String[] to,@RequestParam("subject") String subject,@RequestParam("text") String text) throws Exception {
        SendMail sendMail=new SendMail();
        String s=sendMail.sendEmail(to,subject,text);
        System.out.println(s);
    }
}

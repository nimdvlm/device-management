package cn.edu.bupt.controller;

import cn.edu.bupt.config.MySessionContext;
import cn.edu.bupt.utils.CodeUtil;
import cn.edu.bupt.utils.HttpUtil;
import com.fasterxml.jackson.databind.JsonNode;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.session.Session;
import org.apache.shiro.session.mgt.SessionKey;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.subject.support.DefaultSubjectContext;
import org.apache.shiro.web.session.mgt.WebSessionKey;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.http.HttpSessionContext;
import java.awt.image.RenderedImage;
import java.util.Map;

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
        if(session.getAttribute("needCode")!=null&&(Boolean)session.getAttribute("needCode")){
            return "验证码错误，请重试！";
        }
        session.setAttribute("username", username);
        session.setAttribute("password", password);

        String res = HttpUtil.getAccessToken(session);
        JsonObject responseJson = (JsonObject) new JsonParser().parse(res);
        if(responseJson.has("error")){
            response.setStatus(400);
            session.removeAttribute("username");
            session.removeAttribute("password");
            if(session.getAttribute("failures")==null){
                session.setAttribute("failures",1);
            }else{
                int temp = (Integer)session.getAttribute("failures");
                temp++;
                session.setAttribute("failures",temp);
                if(temp>=3){
                    session.setAttribute("needCode",true);
                }
                return "登录失败超过三次，登录时请输入验证码。";
            }
        }else if(responseJson.has("access_token")){
            UsernamePasswordToken usernamePasswordToken=new UsernamePasswordToken(username,password);
            Subject subject = SecurityUtils.getSubject();
            subject.login(usernamePasswordToken);
        }
        return res;
//        JsonObject json = new JsonObject();
//        if(res){ // 成功登录
//            UsernamePasswordToken usernamePasswordToken=new UsernamePasswordToken(username,password);
//            Subject subject = SecurityUtils.getSubject();
//            subject.login(usernamePasswordToken);   //完成登录
//
//            json.addProperty("response_code",0);
//            json.addProperty("response_msg","login ok");
//            response.setStatus(200);
//        }else{
//            json.addProperty("response_code",1);
//            json.addProperty("response_msg","wrong username or password");
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

    @RequestMapping(value = "/authorize/{sessionId}", method = RequestMethod.GET)
    @ResponseBody
    public String authorize(@PathVariable("sessionId") String sessionId){

//        String sessionID = request.getRequestedSessionId();
//        String sessionID = sessionId;
//        boolean status = false;

        MySessionContext myc= MySessionContext.getInstance();
        HttpSession sess = myc.getSession(sessionId);
//        request.changeSessionId();
//
//        SessionKey key = new WebSessionKey(sessionID,request,response);
//        try{
//            Session se = SecurityUtils.getSecurityManager().getSession(key);
//
//            Object obj = se.getAttribute(DefaultSubjectContext.AUTHENTICATED_SESSION_KEY);
//            if(obj != null){
//                status = (Boolean) obj;
//            }
//        }catch(Exception e){
//            e.printStackTrace();
//        }finally{
//            Session se = null;
//            Object obj = null;
//        }

        if(sess != null){
            return sess.getAttribute("token").toString();
        }else {
            response.setStatus(401);
            return "unauthorized";
        }
    }

    @RequestMapping(value = "/authorize", method = RequestMethod.GET)
    @ResponseBody
    public String authorize(){

        return request.getRequestedSessionId();

    }

    @RequestMapping(value = "/getVerify")
    public void getVerify(HttpServletRequest request, HttpServletResponse response) {
        try {
            //设置相应类型,告诉浏览器输出的内容为图片
            response.setContentType("image/jpeg");
            //设置响应头信息，告诉浏览器不要缓存此内容
            response.setHeader("Pragma", "No-cache");
            response.setHeader("Cache-Control", "no-cache");
            response.setDateHeader("Expire", 0);
            Map<String,Object> map = CodeUtil.generateCodeAndPic();
            HttpSession session = request.getSession();
            session.removeAttribute("code");
            session.setAttribute("code",map.get("code"));
            try {
                // 将内存中的图片通过流动形式输出到客户端
                ImageIO.write((RenderedImage) map.get("codePic"), "JPEG", response.getOutputStream());
            } catch (Exception e) {

            }

        } catch (Exception e) {

        }
    }

    @RequestMapping(value = "/verifyCode/{code}")
    public boolean checkCode(HttpServletRequest request, @PathVariable("code") String code) {
        HttpSession session = request.getSession();
        if(session.getAttribute("code")!=null){
            String result = session.getAttribute("code").toString();
            System.out.println(session.getAttribute("code"));
            System.out.println(code);
            if(result.equals(code)){
                session.setAttribute("needCode",false);
                return true;
            }else {
                session.setAttribute("needCode",true);
                return false;
            }
        }
        return true;
    }

}
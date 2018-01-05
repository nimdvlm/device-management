package cn.edu.bupt.utils;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * Created by Administrator on 2017/12/23.
 * 在启动的时候不能使用
 */
@Component
public class HttpUtil {

    @Value("${bupt.thingsboard.login_url}")
    private void getLogin(String loginUrl) {
        tokenurl = loginUrl ;
    }

    private static final OkHttpClient httpClient = new OkHttpClient();
    private static final MediaType JSON = MediaType.parse("application/json; charset=utf-8");
    private static String  tokenurl = "http://10.108.219.8:8080/api/auth/login";


    public static String sendPostToThingsboard(String url, Map<String,String> headers, JsonObject requestBody,HttpSession session) throws Exception{

        RequestBody body = RequestBody.create(JSON, requestBody.toString());
        Request.Builder buider = new Request.Builder()
                .url(url)
                .post(body);

        String tocken = (String)session.getAttribute("token");
        if(tocken==null){
            getAccessToken(session);
        }
        tocken = (String)session.getAttribute("token");
        buider.header("X-Authorization","Bearer "+tocken);

        if(headers!=null){
            for(Map.Entry<String,String> entry:headers.entrySet()){
                buider.header(entry.getKey(),entry.getValue());
            }
        }
        Request request = buider.build();
//        Response response = httpClient.newCall(request).execute();
//        if(response.isSuccessful()){
//            return response.body().string();
//        }else if(response.code() == 401){
//            getAccessToken(session);
//            Response response1 = httpClient.newCall(request).execute();
//            if(response1.isSuccessful()){
//                return response1.body().string();
//            }else{
//                return "";
//            }
//        }
//        return "";
        return sendRequireToThingsboard(request, session);
    }

    public static String sendDeletToThingsboard(String url,HttpSession session) throws Exception{
        Request.Builder buider = new Request.Builder()
                .url(url)
                .delete() ;
        String tocken = (String)session.getAttribute("token");
        if(tocken==null){
            getAccessToken(session);
        }
        tocken = (String)session.getAttribute("token");
        buider.header("X-Authorization","Bearer "+tocken);
        Request request = buider.build();
//        Response response = httpClient.newCall(request).execute();
//        if(response.isSuccessful()){
//            return response.body().string();
//        }else if(response.code() == 401){
//            getAccessToken(session);
//            Response response1 = httpClient.newCall(request).execute();
//            if(response1.isSuccessful()){
//                return response1.body().string();
//            }else{
//                return "";
//            }
//        }
//        return "";
        return sendRequireToThingsboard(request, session);
    }

    public static String sendGetToThingsboard(String url, Map<String,String> headers, HttpSession session) throws Exception{

        Request.Builder buider = new Request.Builder()
                .url(url)
                .get() ;


        String tocken = (String)session.getAttribute("token");
        if(tocken==null){
            getAccessToken(session);
        }
        tocken = (String)session.getAttribute("token");
        buider.header("X-Authorization","Bearer "+tocken);

        if(headers!=null){
            for(Map.Entry<String,String> entry:headers.entrySet()){
                buider.header(entry.getKey(),entry.getValue());
            }
        }
        Request request = buider.build();
//        Response response = httpClient.newCall(request).execute();
//        if(response.isSuccessful()){
//            return response.body().string();
//        }else if(response.code() == 401){
//            getAccessToken(session);
//            Response response1 = httpClient.newCall(request).execute();
//            if(response1.isSuccessful()){
//                return response1.body().string();
//            }else{
//                return "";
//            }
//        }
        return sendRequireToThingsboard(request, session);
    }

    public static boolean getAccessToken(HttpSession session){
//        JsonPrimitive username = (JsonPrimitive)session.getAttribute("username");
//        JsonPrimitive password = (JsonPrimitive)session.getAttribute("password");
//        if(username==null||password==null) return false;
        JsonObject json = new JsonObject();
//        json.addProperty("username",username.getAsString());
//        json.addProperty("password",password.getAsString());
        json.addProperty("username","tenant@thingsboard.org");
        json.addProperty("password","tenant");
        RequestBody body = RequestBody.create(JSON, json.toString());
        Request.Builder buider = new Request.Builder()
                .url(tokenurl)
                .post(body);
        Request request = buider.build();
        try{
            // 第一次获取token
            Response response = execute(request);
            if(response.isSuccessful()){
                String res = response.body().string();
                JsonObject obj = new JsonParser().parse(res).getAsJsonObject();
                session.setAttribute("token",obj.get("token").getAsString());
                session.setAttribute("refreshToken",obj.get("refreshToken").getAsString());
                return true;
            }else{
                throw new Exception("the first fail!") ;
            }
        }catch (Exception e){
            // 第二次获取token
            try {
                Response response = execute(request);
                String res = response.body().string();
                JsonObject obj = new JsonParser().parse(res).getAsJsonObject();
                session.setAttribute("token",obj.get("token").getAsString());
                session.setAttribute("refreshToken",obj.get("refreshToken").getAsString());
                return true ;
            } catch (IOException e1) {
            }
            return false;
        }
    }

    private static String sendRequireToThingsboard(Request request, HttpSession session) throws Exception{
        Response response = httpClient.newCall(request).execute();
        if(response.isSuccessful()){
            return response.body().string();
        }else if(response.code() == 401){
            getAccessToken(session);
            Response response1 = httpClient.newCall(request).execute();
            if(response1.isSuccessful()){
                return response1.body().string();
            }else{
                return "";
            }
        }
        return "";
    }

    /**
     * 同步方法
     * @param request
     * @return
     * @throws IOException
     */
    public static Response execute(Request request) throws IOException {
        return mOkHttpClient.newCall(request).execute() ;
    }

    private static final OkHttpClient mOkHttpClient = new OkHttpClient.Builder()
            .connectTimeout(10, TimeUnit.SECONDS)
            .readTimeout(20, TimeUnit.SECONDS)
            .build();
}

package cn.edu.bupt.utils;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import okhttp3.*;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Map;

/**
 * Created by Administrator on 2017/12/23.
 */
public class HttpUtil {

    private static final OkHttpClient httpClient = new OkHttpClient();
    private static final MediaType JSON = MediaType.parse("application/json; charset=utf-8");
    private static final String  tockenurl = "http://10.108.217.227:8080/api/auth/login";


    public static String sendPostToThingsboard(String url, Map<String,String> headers, JsonObject requestBody,HttpSession session) throws Exception{

        RequestBody body = RequestBody.create(JSON, requestBody.toString());
        Request.Builder buider = new Request.Builder()
                .url(url)
                .post(body);

        String tocken = (String)session.getAttribute("token");
        buider.header("X-Authorization","Bearer "+tocken);

        if(headers!=null){
            for(Map.Entry<String,String> entry:headers.entrySet()){
                buider.header(entry.getKey(),entry.getValue());
            }
        }
        Request request = buider.build();
        Response response = httpClient.newCall(request).execute();
        if(response.isSuccessful()){
            return response.body().string();
        }else if(response.code() == 401){
            return "";
        }
        return "";
    }

    public static String sendGetToThingsboard(String url, Map<String,String> headers, HttpSession session) throws Exception{

        Request.Builder buider = new Request.Builder()
                .url(url)
                .get() ;

        String tocken = (String)session.getAttribute("token");
        buider.header("X-Authorization","Bearer "+tocken);

        if(headers!=null){
            for(Map.Entry<String,String> entry:headers.entrySet()){
                buider.header(entry.getKey(),entry.getValue());
            }
        }
        Request request = buider.build();
        Response response = httpClient.newCall(request).execute();
        if(response.isSuccessful()){
            return response.body().string();
        }else if(response.code() == 401){
            return "";
        }
        return "";
    }

    public static boolean getAccessToken(HttpSession session){
        Object username = session.getAttribute("username");
        Object password = session.getAttribute("username");
        if(username==null||password==null) return false;
        JsonObject json = new JsonObject();
        json.addProperty("username",(String)username);
        json.addProperty("password",(String)password);
        RequestBody body = RequestBody.create(JSON, json.toString());
        Request.Builder buider = new Request.Builder()
                .url(tockenurl)
                .post(body);
        Request request = buider.build();
        try{
            Response response = httpClient.newCall(request).execute();
            if(response.isSuccessful()){
                String res = response.body().string();
                JsonObject obj = new JsonParser().parse(res).getAsJsonObject();
                session.setAttribute("tocken",obj.get("tocken").getAsString());
                session.setAttribute("refreshToken","obj.get(\"tocken\").getAsString()");
                return true;
            }else{
                return false;
            }
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }

    public static void main(String[] args){
        try{

           // Response response =  getAccessToken("tenant@thingsboard.org","tenant");
          //  System.out.println(response.body().string());

        }catch(Exception e){

        }
    }
}

package cn.edu.bupt.controller;

import cn.edu.bupt.utils.HttpUtil;
import com.google.gson.JsonArray;
import com.google.gson.JsonParser;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;

/**
 * Created by Administrator on 2018/1/18.
 */

@RestController
@RequestMapping("/api/plugin")
public class PluginController extends DefaultThingsboardAwaredController{
    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    @RequestMapping(value = "/allPlugins",method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    public String getAllPlugins(){
        String requestAddr = "/api/plugin/all";

        String responseContent = null;
        try{
            responseContent = HttpUtil.sendGetToThingsboard("http://" + getSmartRulerServer() + requestAddr,
                    null,
                    request.getSession());

        }catch(Exception e){
            return retFail(e.toString()) ;
        }
        JsonArray array = new JsonParser().parse(responseContent).getAsJsonArray();
        return retSuccess(array.toString());
    }

    @RequestMapping(value = "/state/{url}",method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    public String getStates(@PathVariable("url") String url){
        String requestAddr = "/api/plugin/state";

        String responseContent = null;
        try{
            responseContent = HttpUtil.sendGetToThingsboard("http://" + url + requestAddr,
                    null,
                    request.getSession());

        }catch(Exception e){
            return retFail(e.toString()) ;
        }

        String responseBody="{\"state\":\""+responseContent+"\"}" ;
        return retSuccess(responseBody);
    }

    //无前端添加删除插件方式
    /**
    @RequestMapping(value = "/savePlugin",method = RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
    public String savePlugin(@RequestBody String json){
        String requestAddr = "/api/plugin";
        String responseContent = null;
        try{
            responseContent = HttpUtil.sendPostToThingsboard("http://" + getServer() + requestAddr,
                    null,new JsonParser().parse(json).getAsJsonObject(),
                    request.getSession());

        }catch(Exception e){
            return retFail(e.toString()) ;
        }
        return retSuccess(responseContent);
    }

    @RequestMapping(value = "/deletePlugin/{pluginId}",method = RequestMethod.DELETE, produces = {"application/json;charset=UTF-8"})
    public String deletePlugin(@PathVariable String pluginId){
        String requestAddr = "/api/plugin/"+pluginId;
        String responseContent = null;
        try{
            responseContent = HttpUtil.sendDeletToThingsboard("http://" + getServer() + requestAddr,
                    request.getSession());
        }catch(Exception e){
            return retFail(e.toString()) ;
        }
        return retSuccess(responseContent);
    }
**/

    @RequestMapping(value = "/suspend/{url}",method = RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
    public String suspend(@PathVariable("url") String url){
        String requestAddr = "/api/plugin/suspend";

        String responseContent = null;
        try{
            responseContent = HttpUtil.sendPostToThingsboard("http://" + url + requestAddr,
                    null,null,
                    request.getSession());

        }catch(Exception e){
            return retFail(e.toString()) ;
        }
        return retSuccess(responseContent);
    }

    @RequestMapping(value = "/activate/{url}",method = RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
    public String activate(@PathVariable("url") String url){
        String requestAddr = "/api/plugin/active";

        String responseContent = null;
        try{
            responseContent = HttpUtil.sendPostToThingsboard("http://" + url + requestAddr,
                    null,null,
                    request.getSession());

        }catch(Exception e){
            return retFail(e.toString()) ;
        }
        return retSuccess(responseContent);
    }
}

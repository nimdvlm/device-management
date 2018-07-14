package cn.edu.bupt.controller;

import cn.edu.bupt.utils.HttpUtil;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;

/**
 * Created by Administrator on 2018/1/10.
 *
 * 规则接口
 */
@RestController
@RequestMapping("/api/rule")
public class RuleController extends DefaultThingsboardAwaredController{
    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");



    @RequestMapping(value = "/allRules",method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    private String getRules()
    {
        String requestAddr = "/api/v1/smartruler/rules";

        StringBuffer param = new StringBuffer();
        param.append("limit").append("=").append("30");

        requestAddr = requestAddr + "?" + param ;

        String responseContent = null;
        try{
            responseContent = HttpUtil.sendGetToThingsboard("http://" + getSmartRulerServer() + requestAddr,
                    null,
                    request.getSession());

        }catch(Exception e){
            return retFail(e.toString()) ;
        }

        JsonArray newArray = encodeJson(responseContent);
        return retSuccess(newArray.toString());
    }

    @RequestMapping(value = "/{ruleId}",method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    private String getARules(@PathVariable("ruleId") String ruleId)
    {
        String requestAddr = "/api/v1/smartruler/rule/"+ruleId;

        String responseContent = null;
        try{
            responseContent = HttpUtil.sendGetToThingsboard("http://" + getSmartRulerServer() + requestAddr,
                    null,
                    request.getSession());

        }catch(Exception e){
            return retFail(e.toString()) ;
        }

        JsonArray newArray = encodeJson(responseContent);
        return retSuccess(newArray.toString());
    }

    @RequestMapping(value = "/ruleByTenant",method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    private String getRulesByTenantId()
    {
        String requestAddr = "/api/v1/smartruler/ruleByTenant/"+getTenantId();

        StringBuffer param = new StringBuffer();
        param.append("limit").append("=").append("30");

        requestAddr = requestAddr + "?" + param ;

        String responseContent = null;
        try{
            responseContent = HttpUtil.sendGetToThingsboard("http://" + getSmartRulerServer() + requestAddr,
                    null,
                    request.getSession());

        }catch(Exception e){
            return retFail(e.toString()) ;
        }


        JsonArray newArray = encodeJson(responseContent);
        return retSuccess(newArray.toString());
    }

    @RequestMapping(value = "/ruleByTenant/{textSearch}",method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    private String getRulesByTenantIdAndText(@PathVariable("textSearch") String textSearch)
    {
        String requestAddr = "/api/v1/smartruler/ruleByTenant/"+getTenantId()+"/"+textSearch;

        StringBuffer param = new StringBuffer();
        param.append("limit").append("=").append("30");

        requestAddr = requestAddr + "?" + param ;

        String responseContent = null;
        try{
            responseContent = HttpUtil.sendGetToThingsboard("http://" + getSmartRulerServer() + requestAddr,
                    null,
                    request.getSession());

        }catch(Exception e){
            return retFail(e.toString()) ;
        }

        JsonArray newArray = encodeJson(responseContent);
        return retSuccess(newArray.toString());
    }

    @RequestMapping(value = "/tenant",method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String getTenant()
    {
        String responseBody = "{\"tenantId\":\""+getTenantId()+"\"}";
        return responseBody;
    }

    @RequestMapping(value = "/allFilters",method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String getFilters()
    {
        String requestAddr = "/api/filter/filters";

        String responseContent = null;
        try{
            responseContent=HttpUtil.sendGetToThingsboard("http://" + getSmartRulerServer() + requestAddr,
                    null,
                    request.getSession());
        }catch(Exception e){
            return retFail(e.toString());
        }
        return retSuccess(responseContent);
    }

    @RequestMapping(value = "/allPlugins",method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String getPlugins()
    {
        String requestAddr = "/api/v1/smartruler/plugin/all";

        String responseContent = null;
        try{
            responseContent=HttpUtil.sendGetToThingsboard("http://" + getSmartRulerServer() + requestAddr,
                    null,
                    request.getSession());
        }catch (Exception e){
            return retFail(e.toString());
        }
        return retSuccess(responseContent);
    }
    //无需再捕获插件动作
/**
    @RequestMapping(value = "/allPluginsSchema",method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String getPluginsSchema()
    {
        String requestAddr = "/api/components/PLUGIN";

        String responseContent = null;
        try{
            responseContent=HttpUtil.sendGetToThingsboard("http://" + getServer() + requestAddr,
                    null,
                    request.getSession());
        }catch (Exception e){
            return retFail(e.toString());
        }

        return retSuccess(responseContent);
    }

    @RequestMapping(value = "/getPlugin/{className}/{pluginName}",method = RequestMethod.GET,produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String getPluginsActionSchema(@PathVariable("className") String className,@PathVariable("pluginName") String pluginName)
    {

        String requestAddr = "/api/components/actions/org.thingsboard.server.extensions.core.plugin."+className+"."+pluginName ;
        System.out.println(requestAddr);
        String responseContent = null;
        try{
            responseContent = HttpUtil.sendGetToThingsboard("http://" + getServer() + requestAddr,
                    null,
                    request.getSession());
        }catch(Exception e){
            return retFail(e.toString()) ;
        }
        return retSuccess(responseContent);
    }

    @RequestMapping(value = "/getPluginAction/{className}/{actionName}",method = RequestMethod.GET,produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String getPluginsAction(@PathVariable("className") String className,@PathVariable("actionName") String actionName)
    {

        String requestAddr = "/api/component/org.thingsboard.server.extensions.core.action."+className+"."+actionName ;
        System.out.println(requestAddr);
        String responseContent = null;
        try{
            responseContent = HttpUtil.sendGetToThingsboard("http://" + getServer() + requestAddr,
                    null,
                    request.getSession());
        }catch(Exception e){
            return retFail(e.toString()) ;
        }

       return retSuccess(responseContent);
    }
    **/

    @RequestMapping(value = "/active/{ruleId}",method = RequestMethod.POST)
    @ResponseBody
    public String active(@PathVariable("ruleId") String ruleId)
    {
        String requestAddr = "/api/v1/smartruler/"+ruleId+"/activate";
        JsonObject requestbody=new JsonObject();

        String responseContent = null;
        try{
            responseContent = HttpUtil.sendPostToThingsboard("http://" + getSmartRulerServer() + requestAddr,
                    null,
                    requestbody,
                    request.getSession());
        }catch(Exception e){
            return retFail(e.toString()) ;
        }

        return retSuccess("");
    }

    @RequestMapping(value = "/suspend/{ruleId}",method = RequestMethod.POST)
    @ResponseBody
    public String suspend(@PathVariable("ruleId") String ruleId)
    {
        String requestAddr = "/api/v1/smartruler/"+ruleId+"/suspend";
        JsonObject requestbody=new JsonObject();

        String responseContent = null;
        try{
            responseContent = HttpUtil.sendPostToThingsboard("http://" + getSmartRulerServer() + requestAddr,
                    null,
                    requestbody,
                    request.getSession());
        }catch(Exception e){
            return retFail(e.toString()) ;
        }

        return retSuccess("");
    }

    @RequestMapping(value = "/delete/{ruleId}",method = RequestMethod.DELETE)
    @ResponseBody
    public String deleteRules(@PathVariable("ruleId") String ruleId)
    {
        String requestAddr = "/api/v1/smartruler/remove/"+ruleId;

        String responseContent = null;
        try{
            responseContent = HttpUtil.sendDeletToThingsboard("http://" + getSmartRulerServer() + requestAddr,
                    request.getSession());

        }catch(Exception e){
            return retFail(e.toString()) ;
        }
        return retSuccess("");
    }

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ResponseBody
    public String createRule(@RequestBody String ruleInfo)
    {
        String requestAddr = "/api/v1/smartruler/add";

        JsonObject ruleInfoJson = (JsonObject)new JsonParser().parse(ruleInfo);

        String responseContent = null;
        try{
            responseContent = HttpUtil.sendPostToThingsboard("http://" + getSmartRulerServer() + requestAddr,
                    null,
                    ruleInfoJson,
                    request.getSession());
        }catch(Exception e){
            return retFail(e.toString()) ;
        }

        return retSuccess("");
    }

    private String getErrorMsg(Exception e) {
        JsonObject errorInfoJson = new JsonObject();
        errorInfoJson.addProperty("response_code", 1);
        errorInfoJson.addProperty("response_msg", e.toString());
        return errorInfoJson.toString();
    }

    /*public String getTenantId(){
        HttpSession sess = request.getSession();
        String res = HttpUtil.getAccessToken(sess);
        JsonObject jo = (JsonObject)new JsonParser().parse(res);
        String tenantId = jo.get("tenant_id").getAsString();
        return tenantId;
    }*/

    private JsonArray encodeJson(String responseContent){
        JsonArray newArray = new JsonArray();
        JsonArray array = new JsonParser().parse(responseContent).getAsJsonArray();
        for(JsonElement jsonElement:array){
            JsonObject jsonObject = jsonElement.getAsJsonObject();
            JsonArray transforms = jsonObject.get("transforms").getAsJsonArray();
            JsonArray newTransforms = new JsonArray();
            for(JsonElement transform:transforms){
                JsonObject jsonObj = transform.getAsJsonObject();
                JsonObject requestBody = new JsonParser().parse(jsonObj.get("requestBody").getAsString()).getAsJsonObject()  ;
                try{
                    JsonObject body = new JsonParser().parse(requestBody.get("body").getAsString()).getAsJsonObject();
                    requestBody.remove("body");
                    requestBody.add("body",body);
                } catch (Exception e){

                } finally {
                    jsonObj.remove("requestBody");
                    jsonObj.add("requestBody",requestBody);
                    newTransforms.add(jsonObj);
                }
            }
            jsonObject.remove("transforms");
            jsonObject.add("transforms",newTransforms);
            newArray.add(jsonObject);
        }
        return newArray;
    }
}

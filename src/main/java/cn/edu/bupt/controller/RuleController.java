package cn.edu.bupt.controller;

import cn.edu.bupt.utils.HttpUtil;
import cn.edu.bupt.utils.ResponceUtil;
import netscape.javascript.JSObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

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

    //@Autowired
    //ResponceUtil responceUtil;

    private String getServer() {
        return thingsboardHost+":"+thingsboardPort ;
    }

    @RequestMapping(value = "/allRules",method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    private String getRules()
    {
        String requestAddr = "/api/rules";

        String responseContent = null;
        try{
            responseContent = HttpUtil.sendGetToThingsboard("http://" + getServer() + requestAddr,
                    null,
                    request.getSession());

        }catch(Exception e){
            return getErrorMsg(e) ;
        }

        try {
            JsonArray rulesJsonArr = (JsonArray)RuleInfoDecode.ruleArr(responseContent);
            return rulesJsonArr.toString();
        } catch (Exception e) {
           return getErrorMsg(e) ;
        }
    }

    @RequestMapping(value = "/allFilters",method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String getFilters()
    {
        String requestAddr = "/api/components/FILTER";

        String responseContent = null;
        try{
            responseContent=HttpUtil.sendGetToThingsboard("http://" + getServer() + requestAddr,
                    null,
                    request.getSession());
        }catch(Exception e){
            return getErrorMsg(e);
        }

        try{
            JsonArray filtersJsonArr = (JsonArray)SchemaInfoDecode.schemaArr(responseContent);
            return filtersJsonArr.toString();
        }catch (Exception e) {
            return getErrorMsg(e) ;
        }
    }

    @RequestMapping(value = "/allPlugins",method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String getPlugins()
    {
        String requestAddr = "/api/plugins";

        String responseContent = null;
        try{
            responseContent=HttpUtil.sendGetToThingsboard("http://" + getServer() + requestAddr,
                    null,
                    request.getSession());
        }catch (Exception e){
            return getErrorMsg(e);
        }

        try{
            JsonArray pluginsJsonArr=(JsonArray)PluginInfoDecode.pluginArr(responseContent);
            return pluginsJsonArr.toString();
        }catch (Exception e){
            return getErrorMsg(e);
        }
    }

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
            return getErrorMsg(e);
        }

        try{
            JsonArray pluginsSchemaJsonArr=(JsonArray)SchemaInfoDecode.schemaArr(responseContent);
            return pluginsSchemaJsonArr.toString();
        }catch (Exception e){
            return getErrorMsg(e);
        }
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
            return getErrorMsg(e) ;
        }

        try {
            JsonArray schemaJsonArr = (JsonArray) SchemaInfoDecode.schemaArr(responseContent);
            return schemaJsonArr.toString() ;
        }catch(Exception e){
            return  getErrorMsg(e);
        }
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
            return getErrorMsg(e) ;
        }

       return responseContent;
    }

    private String getErrorMsg(Exception e) {
        JsonObject errorInfoJson = new JsonObject();
        errorInfoJson.addProperty("responce_code", 1);
        errorInfoJson.addProperty("responce_msg", e.toString());
        return errorInfoJson.toString();
    }


}

class RuleInfoDecode {

    public static JsonElement ruleArr(String jsonStr)
    {
        JsonArray ruleJsonArr = new JsonArray();

        JsonElement parse = new JsonParser().parse(jsonStr);
        JsonArray parsed = (JsonArray) parse;
        for(JsonElement i : parsed){
            JsonObject rule=new JsonObject();

            try {
                rule.add("action",((JsonObject)i).get("action").getAsJsonObject());
            } catch (Exception e) {
                rule.addProperty("action", "");
            }

            try {
                rule.addProperty("additionalInfo",((JsonObject)i).get("addtionalInfo").getAsString());
            } catch (Exception e) {
                rule.addProperty("additionalInfo", "");
            }

            try {
                rule.addProperty("createdtime",((JsonObject)i).get("createdtime").getAsString());
            } catch (Exception e) {
                rule.addProperty("createdtime", "");
            }

            try {
                rule.add("filters",((JsonObject)i).get("filters").getAsJsonObject());
            } catch (Exception e) {
                rule.addProperty("filters", "");
            }

            try {
                rule.add("id",((JsonObject)i).get("id").getAsJsonObject());
            } catch (Exception e) {
                rule.addProperty("id", "");
            }

            try {
                rule.addProperty("name",((JsonObject)i).get("name").getAsString());
            } catch (Exception e) {
                rule.addProperty("name", "");
            }

            try {
                rule.addProperty("pluginToken",((JsonObject)i).get("pluginToken").getAsString());
            } catch (Exception e) {
                rule.addProperty("pluginToken", "");
            }

            try {
                rule.add("processor",((JsonObject)i).get("processor").getAsJsonObject());
            } catch (Exception e) {
                rule.addProperty("processor", "");
            }

            try {
                rule.addProperty("state",((JsonObject)i).get("state").getAsString());
            } catch (Exception e) {
                rule.addProperty("state", "");
            }

            try {
                rule.add("tenantId",((JsonObject)i).get("tenantId").getAsJsonObject());
            } catch (Exception e) {
                rule.addProperty("tenantId", "");
            }

            try {
                rule.addProperty("weight",((JsonObject)i).get("weight").getAsString());
            } catch (Exception e) {
                rule.addProperty("weight", "");
            }

            ruleJsonArr.add(rule);
        }

        return ruleJsonArr;
    }
}

class SchemaInfoDecode{
    public static JsonElement schemaArr(String jsonStr)
    {
        JsonArray schemaJsonArr = new JsonArray();

        JsonElement parse = new JsonParser().parse(jsonStr);
        JsonArray parsed = (JsonArray) parse;
        for(JsonElement item : parsed)
        {
            JsonObject schema=new JsonObject();

            try{
                schema.addProperty("action",((JsonObject)item).get("action").getAsString());
            }catch (Exception e){
                schema.addProperty("action","");
            }

            try{
                schema.addProperty("clazz",((JsonObject)item).get("clazz").getAsString());
            }catch (Exception e){
                schema.addProperty("clazz","");
            }

            try{
                schema.add("configurationDescriptor",((JsonObject)item).get("configurationDescriptor").getAsJsonObject());
            }catch (Exception e){
                schema.addProperty("configurationDescriptor","");
            }

            try{
                schema.addProperty("createdTime",((JsonObject)item).get("createdTime").getAsString());
            }catch (Exception e){
                schema.addProperty("createdTime","");
            }

            try{
                schema.add("id",((JsonObject)item).get("id").getAsJsonObject());
            }catch (Exception e){
                schema.addProperty("id","");
            }

            try{
                schema.addProperty("name",((JsonObject)item).get("name").getAsString());
            }catch (Exception e){
                schema.addProperty("name","");
            }

            try{
                schema.addProperty("scope",((JsonObject)item).get("scope").getAsString());
            }catch (Exception e){
                schema.addProperty("scope","");
            }

            try{
                schema.addProperty("type",((JsonObject)item).get("type").getAsString());
            }catch (Exception e){
                schema.addProperty("type","");
            }

            schemaJsonArr.add(schema);
        }
        return schemaJsonArr;
    }
}

class PluginInfoDecode{
    public static JsonElement pluginArr(String jsonStr)
    {
        JsonArray pluginJsonArr = new JsonArray();

        JsonElement parse = new JsonParser().parse(jsonStr);
        JsonArray parsed = (JsonArray) parse;
        for(JsonElement item:parsed)
        {
            JsonObject plugin=new JsonObject();

            try{
                plugin.addProperty("additionalInfo",((JsonObject)item).get("additionalInfo").getAsString());
            }catch(Exception e) {
                plugin.addProperty("additionalInfo","");
            }

            try{
                plugin.addProperty("apiToken",((JsonObject)item).get("apiToken").getAsString());
            }catch(Exception e) {
                plugin.addProperty("apiToken","");
            }

            try{
                plugin.addProperty("clazz",((JsonObject)item).get("clazz").getAsString());
            }catch(Exception e) {
                plugin.addProperty("clazz","");
            }

            try{
                plugin.addProperty("configuration",((JsonObject)item).get("configuration").getAsString());
            }catch(Exception e) {
                plugin.addProperty("configuration","");
            }

            try{
                plugin.addProperty("createdTime",((JsonObject)item).get("createdTime").getAsString());
            }catch(Exception e) {
                plugin.addProperty("createdTime","");
            }

            try{
                plugin.add("id",((JsonObject)item).get("id").getAsJsonObject());
            }catch(Exception e) {
                plugin.addProperty("id","");
            }

            try{
                plugin.addProperty("name",((JsonObject)item).get("name").getAsString());
            }catch(Exception e) {
                plugin.addProperty("name","");
            }

            try{
                plugin.addProperty("publicAccess",((JsonObject)item).get("publicAccess").getAsString());
            }catch(Exception e) {
                plugin.addProperty("publicAccess","");
            }

            try{
                plugin.addProperty("state",((JsonObject)item).get("state").getAsString());
            }catch(Exception e) {
                plugin.addProperty("state","");
            }

            try{
                plugin.add("tenantId",((JsonObject)item).get("tenantId").getAsJsonObject());
            }catch(Exception e) {
                plugin.addProperty("tenantId","");
            }

            pluginJsonArr.add(plugin);
        }
        return pluginJsonArr;
    }

}
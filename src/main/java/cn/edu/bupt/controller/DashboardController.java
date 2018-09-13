package cn.edu.bupt.controller;

import cn.edu.bupt.utils.HttpUtil;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@Slf4j
public class DashboardController extends DefaultThingsboardAwaredController {

    //新增dashboard
    @RequestMapping(value = "/insert", method = RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String insertDashboard(@RequestBody String dashboardinfo){
        String requestAddr = "/api/v1/dashboard/insert" ;

        JsonObject dashboardInfoJson = (JsonObject)new JsonParser().parse(dashboardinfo);

        String responseContent = null ;
        try {
            responseContent = HttpUtil.sendPostToThingsboard("http://" + getDashboardServer() + requestAddr,
                    null,
                    dashboardInfoJson,
                    request.getSession()) ;
        } catch (Exception e) {
            return retFail(e.toString()) ;
        }

        return retSuccess(responseContent) ;
    }

    //新增dashboard实例
    @RequestMapping(value = "/entity/insert", method = RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String insertEntity(@RequestBody String entity){
        String requestAddr = "/api/v1/dashboard/entity/insert" ;

        JsonObject entityjson = (JsonObject)new JsonParser().parse(entity);

        String responseContent = null ;
        try {
            responseContent = HttpUtil.sendPostToThingsboard("http://" + getDashboardServer() + requestAddr,
                    null,
                    entityjson,
                    request.getSession()) ;
        } catch (Exception e) {
            return retFail(e.toString()) ;
        }

        return retSuccess(responseContent) ;
    }

    //删除dashboard
    @RequestMapping(value = "/delete/{Id}", method = RequestMethod.DELETE, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String deleteDashboard(@PathVariable("Id") String dashboardId) {
        String requestAddr ="http://"+ getDeviceAccessServer() +String.format("/api/v1/dashboard/remove/%s", dashboardId);
        try{
            String responseContent = HttpUtil.sendDeletToThingsboard(requestAddr,request.getSession());
            return retSuccess(responseContent) ;
        }catch(Exception e){
            return retFail(e.toString()) ;
        }
    }

    //删除dashboard实例
    @RequestMapping(value = "/entity/delete/{Id}", method = RequestMethod.DELETE, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String deleteEntity(@PathVariable("Id") String entityId) {
        String requestAddr ="http://"+ getDeviceAccessServer() +String.format("/api/v1/dashboard/entity/remove/%s", entityId);
        try{
            String responseContent = HttpUtil.sendDeletToThingsboard(requestAddr,request.getSession());
            return retSuccess(responseContent) ;
        }catch(Exception e){
            return retFail(e.toString()) ;
        }
    }

    //获取所有dashboard
    @RequestMapping(value = "/getAllDashboard", method = RequestMethod.GET)
    @ResponseBody
    public String getAllDashboard(){
        String requestAddr = "/api/v1/dashboard/getAll" ;

        String responseContent = null ;
        try {
            responseContent = HttpUtil.sendGetToThingsboard("http://" + getDashboardServer() + requestAddr,
                    null,
                    request.getSession()) ;
        }catch(Exception e){
            return retFail(e.toString()) ;
        }
        return retSuccess(responseContent);
    }

    //获取所有实例
    @RequestMapping(value = "/entity/getAllEntity", method = RequestMethod.GET)
    @ResponseBody
    public String getAllEntity(){
        String requestAddr = "/api/v1/dashboard/entity/getAllEntity" ;

        String responseContent = null ;
        try {
            responseContent = HttpUtil.sendGetToThingsboard("http://" + getDashboardServer() + requestAddr,
                    null,
                    request.getSession()) ;
        }catch(Exception e){
            return retFail(e.toString()) ;
        }
        return retSuccess(responseContent);
    }

    //获取某dashboard的所有实例
    @RequestMapping(value = "/entity/getByDashboardId/{dashboardId}", method = RequestMethod.GET)
    @ResponseBody
    public String getAllEntity(@PathVariable("dashboardId") Integer dashboardId){
        String requestAddr = "/api/v1/dashboard/entity/getByDashboardId/" + dashboardId ;

        String responseContent = null ;
        try {
            responseContent = HttpUtil.sendGetToThingsboard("http://" + getDashboardServer() + requestAddr,
                    null,
                    request.getSession()) ;
        }catch(Exception e){
            return retFail(e.toString()) ;
        }
        return retSuccess(responseContent);
    }

    @RequestMapping(value = "/entity/updateEntity", method = RequestMethod.PUT, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String updateEntity(@RequestBody String entity){
        String requestAddr = "/api/v1/dashboard/entity/update";

        JsonObject entityjson = (JsonObject)new JsonParser().parse(entity);

        String responseContent = null ;
        try {
            responseContent = HttpUtil.sendPutToThingsboard("http://" + getDashboardServer() + requestAddr,
                    null, entityjson, request.getSession()) ;
            return retSuccess(responseContent) ;
        } catch (Exception e) {
            return retFail(e.toString()) ;
        }

    }

}

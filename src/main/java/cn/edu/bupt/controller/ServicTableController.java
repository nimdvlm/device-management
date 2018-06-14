package cn.edu.bupt.controller;

import cn.edu.bupt.utils.HttpUtil;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

/**
 * Created by Administrator on 2017/12/26.
 *
 *  -- 该类的所有接口返回采用统一json
 */
@RestController
@RequestMapping("/api/v1")
@Slf4j
public class ServicTableController extends DefaultThingsboardAwaredController {

    @RequestMapping(value = "/abilityGroup",method = RequestMethod.POST)
    public String saveGroup(@RequestBody String json) {
        String url = "http://"+getServiceManagementServer()+"/api/v1/servicemanagement/abilityGroup";
        try{
            String responce = HttpUtil.sendPostToThingsboard(url,null,new JsonParser().parse(json).getAsJsonObject(),request.getSession());
            return retSuccess(responce);
        }catch(Exception e){
            return retFail("保存失败: - " + e.toString());
        }
    }

    @RequestMapping(value = "/abilityGroup",method = RequestMethod.GET)
    public String getGroup() {
        String url = "http://"+getServiceManagementServer()+"/api/v1/servicemanagement/abilityGroup";
        try{
            String responce = HttpUtil.sendGetToThingsboard(url,null,request.getSession());
            return retSuccess(responce);
        }catch(Exception e){
            return retFail("保存失败: - " + e.toString());
        }
    }


    @RequestMapping(value="/abilityGroup", method = RequestMethod.DELETE)
    public String deleteGroup(@RequestParam int  modelId) {
        String url = "http://"+getServiceManagementServer()+"/api/v1/servicemanagement/abilityGroup?modelId="+modelId;
        try{
            String responce = HttpUtil.sendDeletToThingsboard(url,request.getSession());
            return retSuccess(responce);
        }catch(Exception e){
            return retFail("删除失败: - " + e.toString());
        }
    }

    @RequestMapping(value = "/ability", method = RequestMethod.POST)
    public String saveServiceToGroup(@RequestBody String json) {
        String url = "http://"+getServiceManagementServer()+"/api/v1/servicemanagement/ability";
        try{
            JsonObject asJsonObject = (JsonObject)new JsonParser().parse(json);
            String responce = HttpUtil.sendPostToThingsboard(url,null, asJsonObject, request.getSession());
            return retSuccess(responce);
        }catch(Exception e){
            return retFail("保存失败: - " + e.toString());
        }
    }

    @RequestMapping(value = "/ability/{abilityId}",method = RequestMethod.DELETE)
    public String deleteServiceFromGroup(@PathVariable int  abilityId) {
        // model
        // manufacture
        // deviceType
        // df
        String url = "http://"+getServiceManagementServer()+"/api/v1/servicemanagement/ability/"+abilityId;
        try{
           // JsonObject asJsonObject = (JsonObject)new JsonParser().parse(json);
            String responce = HttpUtil.sendDeletToThingsboard(url, request.getSession());
            return retSuccess(responce);
        }catch(Exception e){
            return retFail("删除失败: - " + e.toString());
        }
    }

//    @RequestMapping(value = "/serviceTables",method = RequestMethod.GET)
//    public String serviceTableLists() {
//        String url = "http://"+getSmartServiceManagementServer()+"/api/ability/getAll";
//        try{
//            String s = HttpUtil.sendGetToThingsboard(url, null, request.getSession());
//            return retSuccess(s) ;
//        }catch(Exception e){
//            return retFail("保存失败: - " + e.toString());
//        }
//    }

    @RequestMapping(value = "/ability/{modelId}", method = RequestMethod.GET)
    public String serviceTableList(@PathVariable String modelId) {
        String requestAddr = String.format("/api/v1/servicemanagement/ability/%s", modelId) ;
        String url = "http://"+getServiceManagementServer() + requestAddr;
        try{
            String response = HttpUtil.sendGetToThingsboard(url, null, request.getSession());
            return retSuccess(response) ;
        }catch(Exception e){
            return retFail("can't link to thingsboard: " + e) ;
        }
    }

    @RequestMapping(value = "/ability/{manufacturerName}/{deviceTypeName}/{modelName:.+}", method = RequestMethod.GET)
    public String serviceTableList(@PathVariable String manufacturerName,@PathVariable String deviceTypeName,
                                   @PathVariable String modelName ) {
        String requestAddr = String.format("/api/v1/servicemanagement/ability/%s/%s/%s", manufacturerName,deviceTypeName,modelName) ;
        String url = "http://"+getServiceManagementServer() + requestAddr;
        try{
            String response = HttpUtil.sendGetToThingsboard(url, null, request.getSession());
            return retSuccess(response) ;
        }catch(Exception e){
            return retFail("can't link to thingsboard: " + e) ;
        }
    }

    @ApiOperation(value = "获取所有厂商信息", notes = "获取所有厂商信息")
    @RequestMapping(value = "/abilityGroup/manufacturers", method = RequestMethod.GET)
    public String serviceManufacture(@RequestParam(required = false) String keyword){
        String url = "http://" + getServiceManagementServer() + "/api/v1/servicemanagement/abilityGroup/manufacturers";
        if(keyword!=null) url += "?keyword="+keyword;
        try{
            String s = HttpUtil.sendGetToThingsboard(url, null, request.getSession());
            return retSuccess(s) ;
        }catch (Exception e){
            return retFail("获取厂商失败: - " + e.toString());
        }
    }

    @ApiOperation(value = "返回某一厂商下的所有设备类型", notes = "返回某一厂商下的所有设备类型")
    @ApiImplicitParam(name = "manufacture", value = "厂商", required = true, dataType = "String", paramType = "path")
    @RequestMapping(value = "/abilityGroup/deviceTypes", method = RequestMethod.GET)
    public String serviceDeviceType(@RequestParam String manufacturerId,@RequestParam(required = false) String keyword){
        String requestAddr = String.format("/api/v1/servicemanagement/abilityGroup/deviceTypes?manufacturerId=%s", manufacturerId) ;
        String url = "http://" + getServiceManagementServer() + requestAddr;
        if(keyword!=null){
            url +="&keyword="+keyword;
        }
        try{
            String s = HttpUtil.sendGetToThingsboard(url, null, request.getSession());
            return retSuccess(s) ;
        }catch (Exception e){
            return retFail("获取设备类型失败: - " + e.toString());
        }
    }

    @ApiOperation(value = "返回固定某一厂商和设备类型下的所有型号", notes = "返回固定某一厂商和设备类型下的所有型号")
    @ApiImplicitParams({ @ApiImplicitParam(name = "manufacture", value = "厂商", required = true, dataType = "String",paramType = "path"),
            @ApiImplicitParam(name = "deviceType", value = "设备类型", required = true, dataType = "String",paramType = "path")})
    @RequestMapping(value = "/abilityGroup/models", method = RequestMethod.GET)
    public String serviceModel(@RequestParam String manufacturerId,@RequestParam String deviceTypeId,@RequestParam(required = false)  String keyword){
        String requestAddr = String.format("/api/v1/servicemanagement/abilityGroup/models?manufacturerId=%s&deviceTypeId=%s", manufacturerId, deviceTypeId) ;
        String url = "http://"+getServiceManagementServer()+ requestAddr;
        if(keyword!=null){
            url +="&keyword="+keyword;
        }
        try{
            String s = HttpUtil.sendGetToThingsboard(url, null, request.getSession());
            return retSuccess(s) ;
        }catch (Exception e){
            return retFail("获取型号失败: - " + e.toString());
        }
    }

}

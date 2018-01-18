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
@RequestMapping("/api/service")
@Slf4j
public class ServicTableController extends DefaultThingsboardAwaredController {

    @RequestMapping("/saveGroup")
    public String saveDeviceTable(@RequestBody String json) {
        String url = "http://"+getServer()+"/api/servicetable/saveServiceGroup";
        try{
            String responce = HttpUtil.sendPostToThingsboard(url,null,new JsonParser().parse(json).getAsJsonObject(),request.getSession());
            return retSuccess(responce);
        }catch(Exception e){
            return retFail("保存失败: - " + e.toString());
        }
    }

    @RequestMapping("/deleteGroup")
    public String deleteGroup(@RequestBody String json) {
        String url = "http://"+getServer()+"/api/servicetable/deleteServiceGroup";
        try{
            String responce = HttpUtil.sendPostToThingsboard(url,null,new JsonParser().parse(json).getAsJsonObject(),request.getSession());
            return retSuccess(responce);
        }catch(Exception e){
            return retFail("删除失败: - " + e.toString());
        }
    }

    @RequestMapping("/saveServiceToGroup")
    public String saveServiceToGroup(@RequestBody String json) {
        String url = "http://"+getServer()+"/api/servicetable/add";
        try{
            JsonObject asJsonObject = (JsonObject)new JsonParser().parse(json);
            String responce = HttpUtil.sendPostToThingsboard(url,null, asJsonObject, request.getSession());
            return retSuccess(responce);
        }catch(Exception e){
            return retFail("保存失败: - " + e.toString());
        }
    }

    @RequestMapping("/deleteServiceFromGroup")
    public String deleteServiceFromGroup(@RequestBody String json) {
        // model
        // manufacture
        // deviceType
        // df
        String url = "http://"+getServer()+"/api/servicetable/delete";
        try{
            JsonObject asJsonObject = (JsonObject)new JsonParser().parse(json);
            String responce = HttpUtil.sendPostToThingsboard(url,null, asJsonObject, request.getSession());
            return retSuccess(responce);
        }catch(Exception e){
            return retFail("删除失败: - " + e.toString());
        }
    }

    @RequestMapping("/serviceTables")
    public String serviceTableLists() {
        String url = "http://"+getServer()+"/api/servicetable/getAll";
        try{
            String s = HttpUtil.sendGetToThingsboard(url, null, request.getSession());
            return retSuccess(s) ;
        }catch(Exception e){
            return retFail("保存失败: - " + e.toString());
        }
    }

    @RequestMapping(value = "/services/{manufacture}/{deviceType}/{model}/tail", method = RequestMethod.GET)
    public String serviceTableList(@PathVariable String manufacture,@PathVariable String deviceType,@PathVariable String model) {
        String requestAddr = String.format("/api/services/%s/%s/%s", manufacture, deviceType, model) ;
        String url = "http://"+getServer() + requestAddr;
        try{
            String response = HttpUtil.sendGetToThingsboard(url, null, request.getSession());
            return retSuccess(response) ;
        }catch(Exception e){
            return retFail("can't link to thingsboard: " + e) ;
        }
    }

    @ApiOperation(value = "获取所有厂商信息", notes = "获取所有厂商信息")
    @RequestMapping(value = "/manufactures", method = RequestMethod.GET)
    public String serviceManufacture(){
        String url = "http://" + getServer() + "/api/servicetable/manufatures";
        try{
            String s = HttpUtil.sendGetToThingsboard(url, null, request.getSession());
            return retSuccess(s) ;
        }catch (Exception e){
            return retFail("获取厂商失败: - " + e.toString());
        }
    }

    @ApiOperation(value = "返回某一厂商下的所有设备类型", notes = "返回某一厂商下的所有设备类型")
    @ApiImplicitParam(name = "manufacture", value = "厂商", required = true, dataType = "String", paramType = "path")
    @RequestMapping(value = "/{manufacture}/deviceTypes", method = RequestMethod.GET)
    public String serviceDeviceType(@PathVariable String manufacture){
        String requestAddr = String.format("/api/servicetable/%s/deviceTypes", manufacture) ;
        String url = "http://" + getServer() + requestAddr;
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
    @RequestMapping(value = "/{manufacture}/{deviceType}/models", method = RequestMethod.GET)
    public String serviceModel(@PathVariable String manufacture,@PathVariable String deviceType){
        String requestAddr = String.format("/api/servicetable/%s/%s/models", manufacture, deviceType) ;
        String url = "http://"+getServer()+ requestAddr;
        try{
            String s = HttpUtil.sendGetToThingsboard(url, null, request.getSession());
            return retSuccess(s) ;
        }catch (Exception e){
            return retFail("获取型号失败: - " + e.toString());
        }
    }

}

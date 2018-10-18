package cn.edu.bupt.controller;

import cn.edu.bupt.utils.HttpUtil;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/devicetype")
@Slf4j
public class DeviceTypeManagementController extends DefaultThingsboardAwaredController {

    //创建设备型号管理
    @RequestMapping(value = "/insert",method = RequestMethod.POST, produces = {"application/json;charset=UTF-8"})
    public String saveDeviceTypeMana(@RequestBody String json) {
        String url = "http://"+getDeviceTypeManagementServer()+"/api/v1/devicetypemanagement/deviceTypeManagement";
        try{
            String response = HttpUtil.sendPostToThingsboard(url,null,new JsonParser().parse(json).getAsJsonObject(),request.getSession());
            return retSuccess(response);
        }catch(Exception e){
            return retFail("创建失败: - " + e.toString());
        }
    }

    //更新管理组
    @RequestMapping(value = "/update/{modelId}/{deviceTypeId}/{manufacturerId}", method = RequestMethod.PUT,produces = {"application/json;charset=UTF-8"} )
    public String updateDeviceTypeMana(@PathVariable("modelId")Integer modelId, @PathVariable("deviceTypeId")Integer deviceTypeId,
                                     @PathVariable("manufacturerId")Integer manufacturerId, @RequestBody String deviceTypeMana){
        String url = "http://" + getDeviceTypeManagementServer() + "/api/v1/devicetypemanagement/deviceTypeManagement/"+ modelId + "/"+ deviceTypeId + "/"+ manufacturerId;
        try{
            String response = HttpUtil.sendPutToThingsboard(url, null, new JsonParser().parse(deviceTypeMana).getAsJsonObject(), request.getSession());
            return retSuccess(response);
        }catch (Exception e){
            return retFail("更新失败: - " + e.toString());
        }
    }

    //删除管理组
    @RequestMapping(value = "/delete", method = RequestMethod.DELETE, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String deleteDeviceTypeMana(@RequestParam int modelId) {
        String requestAddr ="http://"+ getDeviceTypeManagementServer() +"/api/v1/devicetypemanagement/deviceTypeManagement?modelId="+modelId;
        try{
            String responseContent = HttpUtil.sendDeletToThingsboard(requestAddr,request.getSession());
            return retSuccess(responseContent) ;
        }catch(Exception e){
            return retFail(e.toString()) ;
        }
    }

    //获取管理组
    @RequestMapping(value = "/getAll", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String getAll() {
        String url = "http://"+getDeviceTypeManagementServer()+"/api/v1/devicetypemanagement/deviceTypeManagement";
        try{
            String response = HttpUtil.sendGetToThingsboard(url,null,request.getSession());
            return retSuccess(response);
        }catch(Exception e){
            return retFail("获取失败: - " + e.toString());
        }
    }

    //获取型号
    @RequestMapping(value = "/getById/{modelId}", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"} )
    @ResponseBody
    public String getModelById(@PathVariable("modelId") int modelId){
        String url = "http://" + getDeviceTypeManagementServer() + "/api/v1/devicetypemanagement/deviceTypeManagement/"+modelId;
        try{
            String response = HttpUtil.sendGetToThingsboard(url,null,request.getSession());
            JsonObject obj = (JsonObject)new JsonParser().parse(response);
            String manufacturerName = getManufacturerName(obj.get("manufacturerId").getAsInt());
            String deviceTypeName = getDeviceTypeName(obj.get("deviceTypeId").getAsInt());
            obj.addProperty("manufacturerName", manufacturerName);
            obj.addProperty("deviceTypeName", deviceTypeName);
            return retSuccess(obj.getAsString());
        }catch(Exception e){
            return retFail("获取失败: - " + e.toString());
        }
    }

    //获取厂商名字
    @RequestMapping(value = "/manufacturerName/{manufacturerId}", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"} )
    @ResponseBody
    public String getManufacturerName(@PathVariable("manufacturerId") int manufacturerId){
        String url = "http://" + getDeviceTypeManagementServer() + "/api/v1/devicetypemanagement/deviceTypeManagement/manufacturer/"+ manufacturerId;
        try{
            String response = HttpUtil.sendGetToThingsboard(url,null,request.getSession());
            return retSuccess(response);
        }catch(Exception e){
            return retFail("获取失败: - " + e.toString());
        }
    }

    //获取设备型号名字
    @RequestMapping(value = "/deviceTypeName/{deviceTypeId}", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"} )
    @ResponseBody
    public String getDeviceTypeName(@PathVariable("deviceTypeId") int deviceTypeId){
        String url = "http://" + getDeviceTypeManagementServer() + "/api/v1/devicetypemanagement/deviceTypeManagement/deviceType/"+ deviceTypeId;
        try{
            String response = HttpUtil.sendGetToThingsboard(url,null,request.getSession());
            return retSuccess(response);
        }catch(Exception e){
            return retFail("获取失败: - " + e.toString());
        }
    }

    //获取所有厂商
    @RequestMapping(value = "/getAllmanufacturers", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String getAllManufactures(@RequestParam(required = false) String keyword){
        String url = "http://" + getDeviceTypeManagementServer() + "/api/v1/devicetypemanagement/deviceTypeManagement/manufactures";
        if(keyword!=null) url += "?keyword="+keyword;
        try{
            String s = HttpUtil.sendGetToThingsboard(url, null, request.getSession());
            return retSuccess(s) ;
        }catch (Exception e){
            return retFail("获取厂商失败: - " + e.toString());
        }
    }

    @RequestMapping(value = "/getdeviceTypes", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String getAllDeviceTypes(@RequestParam String manufacturerId,@RequestParam(required = false) String keyword){
        String requestAddr = String.format("/api/v1/devicetypemanagement/deviceTypeManagement/deviceTypes?manufacturerId=%s", manufacturerId) ;
        String url = "http://" + getDeviceTypeManagementServer() + requestAddr;
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

    @RequestMapping(value = "/getmodels", method = RequestMethod.GET, produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String serviceModel(@RequestParam String manufacturerId,@RequestParam String deviceTypeId,@RequestParam(required = false)  String keyword){
        String requestAddr = String.format("/api/v1/devicetypemanagement/deviceTypeManagement/models?manufacturerId=%s&deviceTypeId=%s", manufacturerId, deviceTypeId) ;
        String url = "http://"+getDeviceTypeManagementServer()+ requestAddr;
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

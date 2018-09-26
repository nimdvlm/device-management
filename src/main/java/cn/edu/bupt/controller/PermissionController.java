package cn.edu.bupt.controller;

import cn.edu.bupt.utils.HttpUtil;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import io.swagger.annotations.ApiOperation;
import okhttp3.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * Created by CZX on 2018/9/25.
 */
@RequestMapping("/api/account")
@RestController
public class PermissionController extends DefaultThingsboardAwaredController{

    public static final String API_PREFIX = "/api/v1/account/";

    @Autowired
    private HttpServletResponse response;

    //    {"id":"5,6"}
    @RequestMapping(value = "/permission", params = { "role_id"},method = RequestMethod.POST)
    public void saveRolePermissionRelation(@RequestParam int role_id,
                                           @RequestBody String permission_ids){
        JsonObject permission_ids_json = (JsonObject) new JsonParser().parse(permission_ids);
        String requestAddr = API_PREFIX + "permission";
        StringBuffer param = new StringBuffer();
        param.append("role_id").append("=").append(role_id);
        requestAddr = requestAddr + "?" + param ;
        try {
            Response responseContent = HttpUtil.sendPost("http://" + getAccountServer() + requestAddr,null,
                    permission_ids_json,
                    request.getSession());
            response.setStatus(responseContent.code());
        } catch (Exception e) {
            throw new RuntimeException(e.toString());
        }
    }

    @ApiOperation(value = "删除一个role下的permission")
//    @PreAuthorize("hasAuthority('SYS_ADMIN')")
    @RequestMapping(value = "/permission",params = {  "role_id"  }, method = RequestMethod.DELETE)
    public void deleteRolePermissionRelation(@RequestParam int role_id,
                                             @RequestBody String permission_ids){
            JsonObject permission_ids_json = (JsonObject) new JsonParser().parse(permission_ids);
            String requestAddr = API_PREFIX + "permission";
            StringBuffer param = new StringBuffer();
            param.append("role_id").append("=").append(role_id);
            requestAddr = requestAddr + "?" + param ;
            try {
                Response responseContent = HttpUtil.sendDelet("http://" + getAccountServer() + requestAddr,
                        request.getSession(),permission_ids_json);
                response.setStatus(responseContent.code());
            } catch (Exception e) {
                throw new RuntimeException(e.toString());
            }
    }

    @ApiOperation(value = "根据ID获取role")
//    @PreAuthorize("hasAuthority('SYS_ADMIN')")
    @RequestMapping(value = "/role",params = {  "role_id"  }, method = RequestMethod.GET,produces = "text/html;charset=UTF-8")
    public String getRole(@RequestParam int role_id){
        String requestAddr = API_PREFIX + "role";
        StringBuffer param = new StringBuffer();
        param.append("role_id").append("=").append(role_id);
        requestAddr = requestAddr + "?" + param ;
        try {
            Response responseContent = HttpUtil.sendGet("http://" + getAccountServer() + requestAddr,null,
                    request.getSession());
            response.setStatus(responseContent.code());
            return responseContent.body().string();
        } catch (Exception e) {
            throw new RuntimeException(e.toString());
        }
    }

    @ApiOperation(value = "获取所有role")
//    @PreAuthorize("hasAuthority('SYS_ADMIN')")
    @RequestMapping(value = "/roles", method = RequestMethod.GET,produces = "text/html;charset=UTF-8")
    public String getRoles(){
        String requestAddr = API_PREFIX + "roles";
        try {
            Response responseContent = HttpUtil.sendGet("http://" + getAccountServer() + requestAddr,null,
                    request.getSession());
            response.setStatus(responseContent.code());
            return responseContent.body().string();
        } catch (Exception e) {
            throw new RuntimeException(e.toString());
        }
    }

    @ApiOperation(value = "创建一个role")
//    @PreAuthorize("hasAuthority('SYS_ADMIN')")
    @RequestMapping(value = "/role", method = RequestMethod.POST)
    public String saveRole(@RequestBody String roleInfo){
        JsonObject roleInfoJson = (JsonObject) new JsonParser().parse(roleInfo);
        String requestAddr = API_PREFIX + "role";
        try {
            Response responseContent = HttpUtil.sendPost("http://" + getAccountServer() + requestAddr,null,
                    roleInfoJson,
                    request.getSession());
            response.setStatus(responseContent.code());
            return responseContent.body().string();
        } catch (Exception e) {
            throw new RuntimeException(e.toString());
        }
    }

    @ApiOperation(value = "删除一个role")
//    @PreAuthorize("hasAuthority('SYS_ADMIN')")
    @RequestMapping(value = "/role", method = RequestMethod.DELETE)
    public void deleteRole(@RequestParam Integer roleId){
        String requestAddr = API_PREFIX + "role";
        StringBuffer param = new StringBuffer();
        param.append("roleId").append("=").append(roleId);
        requestAddr = requestAddr + "?" + param ;
        try {
            Response responseContent = HttpUtil.sendDelet("http://" + getAccountServer() + requestAddr,
                    request.getSession());
            response.setStatus(responseContent.code());
        } catch (Exception e) {
            throw new RuntimeException(e.toString());
        }
    }

    @ApiOperation(value = "更新一个role")
//    @PreAuthorize("hasAuthority('SYS_ADMIN')")
    @RequestMapping(value = "/role", method = RequestMethod.PUT)
    public void updateRole(@RequestBody String roleInfo){
        String requestAddr = API_PREFIX + "role";
        JsonObject roleInfoJson = (JsonObject) new JsonParser().parse(roleInfo);
        try {
            Response responseContent = HttpUtil.sendPut("http://" + getAccountServer() + requestAddr,
                    null,
                    roleInfoJson,
                    request.getSession());
            response.setStatus(responseContent.code());
        } catch (Exception e) {
            throw new RuntimeException(e.toString());
        }
    }

    @ApiOperation(value = "获取所有permission")
//    @PreAuthorize("hasAuthority('SYS_ADMIN')")
    @RequestMapping(value = "/permissions",method = RequestMethod.GET,produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String getAllPermissions(){
        String requestAddr = API_PREFIX + "permissions";
        try {
            Response responseContent = HttpUtil.sendGet("http://" + getAccountServer() + requestAddr,null,
                    request.getSession());
            response.setStatus(responseContent.code());
            return responseContent.body().string();
        } catch (Exception e) {
            throw new RuntimeException(e.toString());
        }
    }

    @ApiOperation(value = "获取一个role下分配的permission")
//    @PreAuthorize("hasAuthority('SYS_ADMIN')")
    @RequestMapping(value = "/rolePermission", params = {  "role_id"  },method = RequestMethod.GET,produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String getPermissionsByRoleId(@RequestParam int role_id){
        String requestAddr = API_PREFIX + "rolePermission";
        StringBuffer param = new StringBuffer();
        param.append("role_id").append("=").append(role_id);
        requestAddr = requestAddr + "?" + param ;
        try {
            Response responseContent = HttpUtil.sendGet("http://" + getAccountServer() + requestAddr,null,
                    request.getSession());
            response.setStatus(responseContent.code());
            return responseContent.body().string();
        } catch (Exception e) {
            throw new RuntimeException(e.toString());
        }
    }

    @ApiOperation(value = "获取一个role下还未分配的permission")
//    @PreAuthorize("hasAuthority('SYS_ADMIN')")
    @RequestMapping(value = "/roleNotOwnedPermission", params = {  "role_id"  },method = RequestMethod.GET,produces = "text/html;charset=UTF-8")
    @ResponseBody
    public String getNotOwnedPermissionsByRoleId(@RequestParam int role_id){
        String requestAddr = API_PREFIX + "roleNotOwnedPermission";
        StringBuffer param = new StringBuffer();
        param.append("role_id").append("=").append(role_id);
        requestAddr = requestAddr + "?" + param ;
        try {
            Response responseContent = HttpUtil.sendGet("http://" + getAccountServer() + requestAddr,null,
                    request.getSession());
            response.setStatus(responseContent.code());
            return responseContent.body().string();
        } catch (Exception e) {
            throw new RuntimeException(e.toString());
        }
    }

    @ApiOperation(value = "为一个user分配role")
//    @PreAuthorize("hasAuthority('SYS_ADMIN')")
    @RequestMapping(value = "/user/role", params = { "role_id","user_id"},method = RequestMethod.POST)
    public void saveRoleUserRelation(@RequestParam Integer role_id,
                                     @RequestParam Integer user_id)  {
        String requestAddr = API_PREFIX + "user/role";
        StringBuffer param = new StringBuffer();
        param.append("role_id").append("=").append(role_id).append("&user_id").append("=").append(user_id);
        requestAddr = requestAddr + "?" + param ;
        try {
            Response responseContent = HttpUtil.sendPost("http://" + getAccountServer() + requestAddr,null,null,
                    request.getSession());
            response.setStatus(responseContent.code());
        } catch (Exception e) {
            throw new RuntimeException(e.toString());
        }
    }

    @ApiOperation(value = "为一个user删除role")
//    @PreAuthorize("hasAuthority('SYS_ADMIN')")
    @RequestMapping(value = "/user/role", params = { "role_id","user_id"},method = RequestMethod.DELETE)
    public void deleteRoleUserRelation(@RequestParam Integer role_id,
                                       @RequestParam Integer user_id){
        String requestAddr = API_PREFIX + "user/role";
        StringBuffer param = new StringBuffer();
        param.append("role_id").append("=").append(role_id).append("&user_id").append("=").append(user_id);
        requestAddr = requestAddr + "?" + param ;
        try {
            Response responseContent = HttpUtil.sendDelet("http://" + getAccountServer() + requestAddr,
                    request.getSession());
            response.setStatus(responseContent.code());
        } catch (Exception e) {
            throw new RuntimeException(e.toString());
        }
    }

    @ApiOperation(value = "获取一个用户下的所有extra role")
//    @PreAuthorize("hasAuthority('SYS_ADMIN')")
    @RequestMapping(value = "/roles", params = { "user_id"}, method = RequestMethod.GET,produces = "text/html;charset=UTF-8")
    public String getUserExtraRoles(@RequestParam Integer user_id){
        String requestAddr = API_PREFIX + "roles";
        StringBuffer param = new StringBuffer();
        param.append("user_id").append("=").append(user_id);
        requestAddr = requestAddr + "?" + param ;
        try {
            Response responseContent = HttpUtil.sendGet("http://" + getAccountServer() + requestAddr,null,
                    request.getSession());
            response.setStatus(responseContent.code());
            return responseContent.body().string();
        } catch (Exception e) {
            throw new RuntimeException(e.toString());
        }
    }

    @ApiOperation(value = "获取一个用户下的所有未拥有的extra role")
//    @PreAuthorize("hasAuthority('SYS_ADMIN')")
    @RequestMapping(value = "/notOwnedRoles", params = { "user_id"}, method = RequestMethod.GET,produces = "text/html;charset=UTF-8")
    public String getUserNotOwnedExtraRoles(@RequestParam Integer user_id){
        String requestAddr = API_PREFIX + "notOwnedRoles";
        StringBuffer param = new StringBuffer();
        param.append("user_id").append("=").append(user_id);
        requestAddr = requestAddr + "?" + param ;
        try {
            Response responseContent = HttpUtil.sendGet("http://" + getAccountServer() + requestAddr,null,
                    request.getSession());
            response.setStatus(responseContent.code());
            return responseContent.body().string();
        } catch (Exception e) {
            throw new RuntimeException(e.toString());
        }
    }

    @ApiOperation(value = "获取一个用户下的所有role")
//    @PreAuthorize("hasAuthority('SYS_ADMIN')")
    @RequestMapping(value = "/UserRoles", params = { "user_id"}, method = RequestMethod.GET,produces = "text/html;charset=UTF-8")
    public String getUserRoles(@RequestParam Integer user_id){
        String requestAddr = API_PREFIX + "UserRoles";
        StringBuffer param = new StringBuffer();
        param.append("user_id").append("=").append(user_id);
        requestAddr = requestAddr + "?" + param ;
        try {
            Response responseContent = HttpUtil.sendGet("http://" + getAccountServer() + requestAddr,null,
                    request.getSession());
            response.setStatus(responseContent.code());
            return responseContent.body().string();
        } catch (Exception e) {
            throw new RuntimeException(e.toString());
        }
    }
}

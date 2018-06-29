//设置右侧详情初始状态



mainApp.controller("tenantCtrl",function ($scope,$resource) {


    jQuery('#detailShow').css({'display':''});
    jQuery('#tenantAdministrator').css({'display':'none'});
    jQuery('#tenantThere').css({'display':''});
    jQuery('#createManager').css({'display':'none'});
    $scope.showTenantAue = function () {
        jQuery('#detailShow').css({'display':''});
        jQuery('#tenantAdministrator').css({'display':'none'});
        jQuery('#tenantThere').css({'display':''});
        jQuery('#createManager').css({'display':'none'});
        jQuery('#tenantTow').css({'background-color':'#afd9ee'});
        jQuery('#tenantAue').css({'background-color':'#337ab7'});
    }
    $scope.showTenantTow = function () {
        jQuery('#detailShow').css({'display':'none'});
        jQuery('#tenantAdministrator').css({'display':''});
        jQuery('#tenantThere').css({'display':'none'});
        jQuery('#createManager').css({'display':''});
        jQuery('#tenantTow').css({'background-color':'#337ab7'});
        jQuery('#tenantAue').css({'background-color':'#afd9ee'});
    }


});
$('#createPlugins').validate({
    plugins:{
        pluginName:{required:true},
        pluginType:{required:true},
        pluginURI:{required:true},
        pluginHost:{required:true},
        port:{required:true},
        pluginPath:{required:true},
        pluginMethod:{required:true}
    },
    messages:{

        pluginName:{required:'插件名称不能为空'},
        pluginType:{required:'插件类型不能为空'},
        pluginURI:{required:"URI Scheme name不能为空"},
        pluginHost:{required:"Host不能为空"},
        port:{required:"Port不能为空"},
        pluginPath:{required:"Base Path不能为空"},
        pluginMethod:{required:"Authentication method不能为空"}
    }
});
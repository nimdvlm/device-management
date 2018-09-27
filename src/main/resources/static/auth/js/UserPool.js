var app = new Vue({
    el: '#app',
    data: {
        tenantInfo:[],
        activeItem: '',
        columns: [
            {
                label: 'ID',
                prop: 'id',
                width:50
            },
            {
                label: '用户名',
                prop: 'name'
            },
            {
                label: '权限',
                prop: 'authority'
            },
            {
                label: '邮箱',
                prop: 'email'
            },
            {
                label: '联系电话',
                prop: 'phone'
            }],
        columns_ExtraRole:[
            {
                label: 'ID',
                prop: 'id',
                width:50
            },
            {
                label: '角色名称',
                prop: 'name'
            },
            {
                label: '描述',
                prop: 'description'
            }
        ],
        tableData: [],
        tableData_ExtraRole:[],
        tableData_NotOwnedExtraRole:[],
        dialogVisible_MR:false, //MR=manageRole
        tempUserID:"" //两个函数之间传递
    },
    methods:{
        selected: function (item) {
            var vm=this
            vm.activeItem = item
            vm.getUserByTenant()
        },
        getAllTenants: function () {
            var vm = this
            //获取所有租户
            axios.get("/api/account/tenants?limit=20&page=0").then(function (response) {
                vm.tenantInfo = response.data
                vm.activeItem = vm.tenantInfo[0]
                vm.getUserByTenant()
            }).catch(function (error) {
                console.log(error);
            })
        },
        getUserByTenant:function () {
            var vm = this

            //根据role_id获取role
            axios.get("/api/account/tenant/user", {
                params: {
                    tenantId: vm.activeItem.id
                }
            }).then(function (response) {
                vm.tableData = response.data
            }).catch(function (error) {
                console.log(error);
            })
        },
        manageRole:function (id) {
            var vm=this
            var user_id=id

            if(!vm.dialogVisible_MR){
                vm.dialogVisible_MR=true
                vm.getUserExtraRoles(user_id)
                vm.getUserNotOwnedExtraRoles(user_id)
            }
        },
        getUserExtraRoles:function (id) {
            var vm=this
            var user_id=id
            vm.tempUserID=id

            //获取所有已经拥有的EXTRA ROLE
            axios.get("/api/account/roles", {
                params: {
                    user_id: user_id
                }
            }).then(function (response) {
                vm.tableData_ExtraRole = response.data
            }).catch(function (error) {
                console.log(error);
            })
        },
        getUserNotOwnedExtraRoles:function (id) {
            var vm=this
            var user_id=id

            //获取所有为拥有的EXTRA ROLE
            axios.get("/api/account/notOwnedRoles", {
                params: {
                    user_id: user_id
                }
            }).then(function (response) {
                vm.tableData_NotOwnedExtraRole = response.data
            }).catch(function (error) {
                console.log(error);
            })
        },
        delRoleFromUser:function (id) {
            var vm=this
            var role_id=id
            var user_id=vm.tempUserID
            var text='移除'

            //为一个user删除role
            axios.delete("/api/account/user/role?user_id="+user_id+"&role_id="+role_id).then(function (response) {
                vm.showMessage(response.status, text)
                vm.getUserExtraRoles(user_id)
                vm.getUserNotOwnedExtraRoles(user_id)
            }).catch(function (error) {
                console.log(error);
            })
        },
        addRoleToUser:function (id) {
            var vm=this
            var role_id=id
            var user_id=vm.tempUserID
            var text='添加'

            //为一个user添加role
            axios.post("/api/account/user/role?user_id="+user_id+"&role_id="+role_id).then(function (response) {
                vm.tableData_ExtraRole = response.data
                vm.showMessage(response.status, text)
                vm.getUserExtraRoles(user_id)
                vm.getUserNotOwnedExtraRoles(user_id)
            }).catch(function (error) {
                console.log(error);
            })

        },
        showMessage: function (status, text) {
            var vm = this
            var text = text
            var message = ''
            var type = ''

            switch (status) {
                case 200:
                    message = text + '成功'
                    type = 'success'
                    break;
                case 400:
                    message = text + '失败：参数无效'
                    type = 'warning'
                    break;
                case 401:
                    message = text + '失败：没有权限'
                    type = 'error'
                    break;
                case 403:
                    message = text + '失败：请求被禁止'
                    type = 'error'
                    break;
                case 404:
                    message = text + '失败：没有搜索到请求的资源'
                    type = 'error'
                    break;
                default:
                    message = text + '失败：未知错误'
                    type = 'error'
            }
            vm.$message({
                message: message,
                type: type
            });
        }
    },
    created: function () {
        var vm = this
        vm.getAllTenants()
    }
})
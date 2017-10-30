
module.exports = {
    dataapi: {
        // url: "http://127.0.0.1", // For splitting subdomains, could be an array.
		url: "http://172.29.0.104", // For splitting subdomains, could be an array.
        port: 8086,
        key:'ihealth_datams',
        apis:[
        		{
        			name:"SysUser",
        			url:"/Api/SysUser/",
        			methods:[
        				{
        					method:"Login",
        					action:"GetByLogin",
        					params:{
        						name:'',
        						password:''
        					},
        					result:{
        						data:{
        							//用户信息
        						},
        						success:true,
        						code:0,
        						code_sub:'manager_getlist_success',
        						message:'管理员列表获取成功',
        						description:'管理员列表获取成功',
        						timestamp: new Date().getTime().toString()
        					}
        				},
        				{
        					method:"add",
        					action:"add",
        					params:{
        						name:'',
        						password:''
        					},
        					result:{
        						data:{userid:1},//返回用户id
        						success:true,
        						code:0,
        						code_sub:'manager_add_success',
        						message:'成功',
        						description:'成功',
        						timestamp: new Date().getTime().toString()
        					}
        				},
        				{
        					method:"update",
        					action:"update",
        					params:{
        						id:'',
        						name:'',
        						password:''
        					}
        				},
        				{
        					method:"delete",
        					action:"delete",
        					params:{
        						id:''
        					}
        				}
        			]
        		}]
    }
};
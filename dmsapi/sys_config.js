module.exports = {
	dataapi: {
		// url: "http://127.0.0.1", // For splitting subdomains, could be an array.
		url: "http://172.29.0.70", // For splitting subdomains, could be an array.
		port: 8086,
		key: 'ihealth_datams',
		apis: [
			//系统用户接口
			{
				name: "SysUser",
				url: "/Api/SysUser/",
				methods: [{
					method: "Login",
					action: "GetByLogin",
					params: {
						name: '',
						password: ''
					},
					result: {
						data: {
							//用户信息
						},
						res: {
							success: true,
							code: 0,
							code_sub: '',
							message: '',
							description: '',
							timestamp: new Date().getTime().toString()
						}
					}
				}]
			},
			//系统日志接口
			{
				name: "SysLog",
				url: "/Api/SysLog/",
				methods: [{
						method: "ReqLog",
						action: "ReqLog",
						params: {
							reqUrl: "", //用户请求客户端路径
							reqBody: "", //用户请求的参数
							apiUrl: "", //该操作对应的api接口
							detail: "", //详情
							sysUserId: "" //操作用户id
						},
						result: {
							res: {
								success: true,
								code: 0,
								code_sub: '',
								message: '',
								description: '',
								timestamp: new Date().getTime().toString()
							}
						}
					},
					{
						method: "ErrorLog",
						action: "ErrorLog",
						params: {
							reqUrl: "", //用户请求客户端路径
							reqBody: "", //用户请求的参数
							apiUrl: "", //该操作对应的api接口
							detail: "", //错误信息
							sysUserId: "" //操作用户id
						},
						result: {
							res: {
								success: true,
								code: 0,
								code_sub: '',
								message: '',
								description: '',
								timestamp: new Date().getTime().toString()
							}
						}
					}
				]
			},
		]
	}
};
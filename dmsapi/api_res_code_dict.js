const apidict = {
	SysUser: {
		Name: "SysUser",
		Description: "系统用户接口",
		Url: "/Api/SysUser/",
		Code:"01",
		Apis: {
			GetByLogin: {
				Name: "GetByLogin",
				Description: "通过登录条件获取用户信息",
				Method: "GetByLogin",
				Code:"0101",
				result: {
					data: null,
					res: {
						success: true,
						code: 0,
						code_sub: '',
						message: '',
						description: '',
						timestamp: new Date().getTime().toString()
					}
				},
				codes:{
					noauthor:{
						success: false,
						code: "0101_0",
						code_sub: 'Api_SysUser_GetByLogin_no_author',
						message: '无接口访问权限',
						description: '',
						timestamp: new Date().getTime().toString()
					},
					success:{
						success: true,
						code: "0101_1",
						code_sub: 'Api_SysUser_GetByLogin_success',
						message: '获取成功',
						description: '',
						timestamp: new Date().getTime().toString()
					},
					parameter:{
						success: false,
						code: "0101_2",
						code_sub: 'Api_SysUser_GetByLogin_nosuccess_parameter',
						message: '参数有误',
						description: '',
						timestamp: new Date().getTime().toString()
					},
					nodata:{
						success: false,
						code: "0101_3",
						code_sub: 'Api_SysUser_GetByLogin_nosuccess_nodata',
						message: '无数据',
						description: '',
						timestamp: new Date().getTime().toString()
					},
					syserror:{
						success: false,
						code: -1,
						code_sub: 'Api_SysUser_GetByLogin_syserror',
						message: '系统异常',
						description: '',
						timestamp: new Date().getTime().toString()
					}
				}
			}
		}
	},
	SysLog: {
		Name: "SysLog",
		Description: "系统日志接口",
		Url: "/Api/SysLog/",
		Code:"02",
		Apis: {
			ReqLog: {
				Name: "ReqLog",
				Description: "用户日志",
				Method: "ReqLog",
				Code:"0201",
				result: {
					data:null,
					res: {
						success: true,
						code: 0,
						code_sub: '',
						message: '',
						description: '',
						timestamp: new Date().getTime().toString()
					}
				},
				codes:{
					noauthor:{
						success: false,
						code: "0201_0",
						code_sub: 'Api_SysLog_ReqLog_no_author',
						message: '无接口访问权限',
						description: '',
						timestamp: new Date().getTime().toString()
					},
					success:{
						success: true,
						code: "0201_1",
						code_sub: 'Api_SysLog_ReqLog_success',
						message: '记录成功',
						description: '',
						timestamp: new Date().getTime().toString()
					},
					parameter:{
						success: false,
						code: "0201_2",
						code_sub: 'Api_SysLog_ReqLog_nosuccess_parameter',
						message: '参数有误',
						description: '',
						timestamp: new Date().getTime().toString()
					},
					syserror:{
						success: false,
						code: -1,
						code_sub: 'Api_SysLog_ReqLog_syserror',
						message: '系统异常',
						description: '',
						timestamp: new Date().getTime().toString()
					}
				}
			},
			ErrorLog: {
				Name: "ErrorLog",
				Description: "错误日志",
				Method: "ErrorLog",
				Code:"0202",
				result: {
					data:null,
					res: {
						success: true,
						code: 0,
						code_sub: '',
						message: '',
						description: '',
						timestamp: new Date().getTime().toString()
					}
				},
				codes:{
					noauthor:{
						success: false,
						code: "0202_0",
						code_sub: 'Api_SysLog_ErrorLog_no_author',
						message: '无接口访问权限',
						description: '',
						timestamp: new Date().getTime().toString()
					},
					success:{
						success: true,
						code: "0202_1",
						code_sub: 'Api_SysLog_ErrorLog_success',
						message: '记录成功',
						description: '',
						timestamp: new Date().getTime().toString()
					},
					parameter:{
						success: false,
						code: "0202_2",
						code_sub: 'Api_SysLog_ErrorLog_nosuccess_parameter',
						message: '参数有误',
						description: '',
						timestamp: new Date().getTime().toString()
					},
					syserror:{
						success: false,
						code: -1,
						code_sub: 'Api_SysLog_ErrorLog_syserror',
						message: '系统异常',
						description: '',
						timestamp: new Date().getTime().toString()
					}
				}
			}
		}
	}
}

module.exports=apidict;
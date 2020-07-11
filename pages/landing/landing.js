let app = getApp();
let api = require('../../utils/api.js')
Page({
	data: {
		hasUserInfo:true
	},
	onLoad: function (options) {
		let token = wx.getStorageSync('token')
		let openid = wx.getStorageSync('openid')
//用户是否授权
		wx.getSetting({
      success: res => {
				if (res.authSetting['scope.userInfo']) {
					wx.getUserInfo({
            success: res => {
							app.globalData.userInfo = res.userInfo
							if(token){
								this.getHomeTab()
							}else{
								this.login(this.getHomeTab)
							}
						}})
				}else{
					this.setData({
						hasUserInfo:false
					})
				}
			}})

	},
	  //登录
		login(fn) {
			// 登录
				wx.login({
				  success: res => {
				    let params = {
				      "code": res.code
				    }
				    api.getWeixinOpenId(params)
				      .then(res => {
				        if(res.data.openid){
									wx.setStorageSync('openid', res.data.openid)
				          let params2 = {
				            unionId: res.data.openid,
				            openid:res.data.openid,
				            nickName:app.globalData.userInfo.nickName,
				            headUrl:app.globalData.userInfo.avatarUrl,
				            otherAppName: 'WeiXin'
				          }
				          api.loginByOtherApp(params2)
				          .then(data => {
				             wx.setStorageSync('token',data.data.token);
				             if(fn){
				              fn()
				             }
				          })
				          .catch(res => {
				            console.log('三方接口')
				          })
				        }
				      }).catch(res => {
				        console.log(res)
				      })
				  }
				})
		},
		//获取home tab数据
		getHomeTab(){
			let param = {}
				api.getUserExamCourseInfo(param)
				.then(res => {
					if(res.data&&res.data.length>0){
							wx.switchTab({
								url:'../tiku/tiku'
							})
					}else{
						wx.navigateTo({
							url: '../examType/type',
						})
					}
				})
		},
	comfirm(e) {
		app.globalData.userInfo = e.detail.userInfo
		this.login(this.getHomeTab);
	}
})
let api = require('./utils/api.js')
App({
  onLaunch: function () {
    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: data => {
              // 可以将 res 发送给后台解码出 unionId
              
              this.globalData.userInfo = data.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.login) {
                this.login(data.userInfo)
              }
            }
          })
        }
      }
    })
  },
  login(userInfo) {
    // 登录
    wx.login({
      success: res => {
        let params = {
          "code": res.code
        }
        api.getWeixinOpenId(params)
          .then(res => {
            if(res.data.openid){
              let params2 = {
                unionId: res.data.openid,
                openid:res.data.openid,
                nickName: userInfo.nickName,
                headUrl: userInfo.avatarUrl,
                otherAppName: 'WeiXin'
              }
              api.loginByOtherApp(params2)
              .then(data => {
                 wx.setStorageSync('token',data.data.token);
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
  globalData: {
    userInfo: null,
    token: '',
    baseurl: 'https://www.dev.ifeel88.com',
  }
})
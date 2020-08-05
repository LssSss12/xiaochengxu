
App({
  onLaunch(){
    wx.getSystemInfo({
      success: res => {
        //导航高度
        this.globalData.navHeight = res.statusBarHeight + 44;
      }, fail(err) {}
    })
    wx.getSystemInfo({
      success: res => {
        //导航高度
        this.globalData.navHeight = res.statusBarHeight + 44;
      }, fail(err) {}
    })
  },
  globalData: {
    userInfo: null,
    token: '',
    baseurl: 'https://www.dev.ifeel88.com',
  }
})
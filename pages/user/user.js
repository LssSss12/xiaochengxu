let api = require('../../utils/api.js')
Page({
  data: {
    examTypeName:'',
    userType:0
  },
  onLoad: function (options) {
    api.userPersonalDetails().then(res => {
			this.setData({
        examTypeName:res.data.examTypeName,
        userType:res.data.userType
      })
		})
  },
  goRecord() {
    wx.navigateTo({
      url: '../topicRecord/record',
    })
  },
  goCollect() {
    wx.navigateTo({
      url: '../colect/list',
    })
  }
})
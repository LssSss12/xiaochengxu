
Page({
  data: {

  },
  onLoad: function (options) {},
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
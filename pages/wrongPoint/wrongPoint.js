let api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courses:[],
    points:[],
    active:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		api.getUserExamCourseInfo().then(res => {
			this.setData({
        courses:res.data
      })
      if(res.data&&res.data.length>0){
        this.getPoints(res.data[0].id)
      }
		})
  },
  getPoints(id){
    api.getUserErrorsPoints({examCourseId:id}).then(res => {
			this.setData({
        points:res.data
      })
		})
  },
  tapName: function(e) {
    var index=e.detail.index;
    var id=this.data.courses[index].id;
    this.getPoints(id)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
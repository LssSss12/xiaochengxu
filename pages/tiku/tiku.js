let api = require('../../utils/api.js')

Page({
  data: {
    title: '游客',
    courseName:'',
    active: 0,
    search: '',
    value: '0',
    tabs: [],
    tabId:'',
    obj: {}
  },
  onLoad: function () {
    this.getHomeTab()
  },
  //获取home tab数据
  getHomeTab(){
    let param = {}
      api.getUserExamCourseInfo(param)
      .then(res => {
        if(res.data&&res.data.length>0){
          this.setData({
            tabs: res.data,
            tabId:res.data[0].id,
            title:res.data[0].examType,
            courseName:res.data[0].courseShortName
          })
          this.getUserHome()
        }else{
          wx.navigateTo({
            url: '../examType/type',
          })
        }
      })
  },
  goSearch() {
    wx.navigateTo({
      url:'../search/search'
    })
  },
  //获取题库首页信息
  getUserHome() {
    let param = {
      examCourseId:this.data.tabId
    },that = this
    api.getUserQuestionBank(param)
    .then(res => {
      that.setData({
        obj: res.data,
        value: res.data.userPastChapter.haveNum/res.data.userPastChapter.totalNum*100
      })
    })
    .catch(res => {})
  },
  onChange(e) {
    let index = e.detail.index
    this.setData({
      active:index,
      tabId: this.data.tabs[index].id,
      courseName:this.data.tabs[index].courseShortName
    },() => {
      this.getUserHome()
    })
  },
  goPep() {
    wx.navigateTo({
      url: '../pep/pep?id=' + this.data.tabId,
    })
  },
  goSection() {
    wx.navigateTo({
      url: '../section/section?examCourseId=' + this.data.tabId + '&courseName=' + this.data.courseName
    })
  },
  dayTopic(e) {
    wx.navigateTo({
      url: '../everyDay/day'
    })
  },
  goError(e){
    wx.navigateTo({
      url: '../errorTopic/topic?examCourseId=' + this.data.tabId + '&courseName=' + this.data.courseName,
    })
  }
   
})

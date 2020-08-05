let api = require('../../utils/api.js')

Page({
  data: {
    title: '游客',//类别
    courseName:'',//科目名称
    active: 0,
    search: '',
    value: '0',
    tabs: [],
    tabId:'',
    obj: {},//页面展示信息
    type:''//考试类别简称
  },
  onLoad: function () {
    this.getHomeTab()
  },
  onShow(){
    this.getUserHome()
  },
  //获取home tab数据
  getHomeTab(){
    let param = {}
      api.getUserExamCourseInfo(param)
      .then(res => {
        if(res.data&&res.data.length>0){
          if(res.data[0].examType === '一级建造师'){
            this.setData({type:'一建'})
          }else if(res.data[0].examType === '二级建造师'){
            this.setData({type:'二建'})
          }
          this.setData({
            tabs: res.data,
            tabId:res.data[0].id,
            title:res.data[0].examType,
            courseName:res.data[0].courseShortName
          })
          wx.setStorageSync('courseName', res.data[0].courseShortName)
          wx.setStorageSync('courseId', res.data[0].id)
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
      examCourseId:wx.getStorageSync('courseId')
    };
    let that = this;
    api.getUserQuestionBank(param)
    .then(res => {
      that.setData({
        obj: res.data,
        examDayNum:(res.data.examDayNum + '').split(''),
      })
      if(res.data.userPastChapter){
        that.setData({
          value: res.data.userPastChapter.haveNum/res.data.userPastChapter.totalNum*100
        })
      }else{
        that.setData({
          value: 0
        })
      }
    })
  },
  onChange(e) {
    let index = e.detail.index
    wx.setStorageSync('courseName', this.data.tabs[index].courseShortName)
    wx.setStorageSync('courseId', this.data.tabs[index].id)
    this.setData({
      active:index,
      tabId: this.data.tabs[index].id,
      courseName:this.data.tabs[index].courseShortName
    },() => {
      this.getUserHome()
    })
  },
  //历年真题
  goPep() {
    wx.navigateTo({
      url: '../pep/pep?id=' + this.data.tabId,
    })
  },
  //章节目
  goSection() {
    wx.navigateTo({
      url: '../section/section?examCourseId=' + this.data.tabId
    })
  },
  //每日一题
  dayTopic(e) {
    wx.navigateTo({
      url: '../everyDay/day?userExamTitleRecordId=' + this.data.obj.examQuestionsTitleEntity.id
    })
  },
  //错题集
  goError(e){
    wx.navigateTo({
      url: '../errors/topic?examCourseId=' + this.data.tabId
    })
  },
  //速练
  goSpeed(){
    wx.navigateTo({
      url: '../speedTopic/topic?examCourseId=' + this.data.tabId
    })
  }
   
})

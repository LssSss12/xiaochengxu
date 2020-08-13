let api = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    exams:[],
    examType:'',
    courses:[],
    selectArr:[],
  },
  changeExam: function(e){
    this.setData({
      selectArr:[],
      examType: e.currentTarget.dataset.name
    })
    var self=this;
    this.data.exams.forEach(function(item){
      if(item.examType.name==self.data.examType){
        for(let i=0;i<item.courseInfoList.length;i++){
          item.courseInfoList[i].checked=false;
        }
        self.setData({
          courses:item.courseInfoList
        })
      }
    })
  },
  selectCourse(e){
    var id= e.currentTarget.dataset.id;
    var clickData=e.currentTarget.dataset.item;
    var courses=this.data.courses
    courses.forEach(function(item){
      if(clickData.courseType=="公共课"){
        if(item.id==id){
          item.checked=!item.checked;
        }
      }else{
        if(clickData.checked){
          if(item.id==id){
            item.checked=!item.checked;
          }
        }else{
          if(item.id==id){
            item.checked=!item.checked;
          }else{
            if(item.courseType=='专业课'){
              item.checked=false;
            }
          }
        }
      }
    })
    this.setData({
      courses:courses
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserExamCourseInfo()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  submit(){
    var params={courseList:[]};
    var courses=this.data.courses
    courses.forEach(function(item){
      if(item.checked){
        params.courseList.push(item.id);
      }
    })
    if(params.courseList.length==0){return}
    api.preselectionCourse(params).then(res => {
      wx.reLaunch({
        url: '../tiku/tiku',
      })
    })
  },
  getUserExamCourseInfo(){
    api.getUserExamCourseInfo({})
      .then(res => {
        if (res.data && res.data.length > 0) {
          var selectArr=[];
          var examType='';
          res.data.forEach(function(item){
            selectArr.push(item.id)
            examType=item.examType
          })
          this.setData({
            selectArr:selectArr,
            examType:examType
          })
          var self=this;
          api.getExamTypeAndCourses().then(res => {
            res.data.forEach(function(item){
              if(item.examType.name==examType){
                for(let i=0;i<item.courseInfoList.length;i++){
                  if(selectArr.indexOf(item.courseInfoList[i].id)>-1){
                    item.courseInfoList[i].checked=true;
                  }
                }
                self.setData({
                  courses:item.courseInfoList
                })
              }
            })
            this.setData({
              exams:res.data
            })
          })
        } else {
          wx.navigateTo({
            url: '../examType/type',
          })
        }
      })
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
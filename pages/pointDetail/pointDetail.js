let api = require('../../utils/api.js')
var wxCharts = require('../../utils/wxcharts.js');
var columnChart = null;
var lineChart=null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleIds:'',
    difficulty: 0,
    important: 4,
    pastExamPaper: 0,
    pointsName: "",
    totalScore:'',
    pointsPage: null,
    simulateExamPaper: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var pointsNo=options.id;
    var self=this;
    api.getUserPointsDetails({pointsNo:pointsNo}).then(res => {
			self.setData({
        titleIds: res.data.titleIds,
        difficulty: res.data.difficulty,
        important: res.data.important,
        pastExamPaper: res.data.pastExamPaper,
        pointsName: res.data.pointsName,
        pointsPage: res.data.pointsPage,
        simulateExamPaper: res.data.simulateExamPaper,
        totalScore: res.data.totalScore,
        totalErrors: res.data.totalErrors
      })
      var columnData={
        categories: [],
        series:[{
            name: '单选题',
            data: [ ],
            color:'#FF812F',
            format: function (val, name) {
              return val ;
            }
        }, {
            name: '多选题',
            data: [ ],
            color:'#FFC12F',
            format: function (val, name) {
              return val ;
            }
        }, {
          name: '简答题',
          data: [ ],
          color:'#50D485',
          format: function (val, name) {
            return val ;
          }
        }]
      }
      res.data.pointsFrequencyVos.forEach(function(item){
        columnData.categories.push(item.thisYear)
        columnData.series[0].data.push(item.singleChoiceScore)
        columnData.series[1].data.push(item.manyChoiceScore)
        columnData.series[2].data.push(item.shortAnswer)
      })
      this.setColumn(columnData);
      var lineData={
        categories: [],
        series: [{  
            name: '错题数',  
            data: [],  
            color:'#FF7944',
            format: function (val) { 
                return val+'题'; 
            } 
        }]
      }
      res.data.pointsErrorVos.forEach(function(item){
        lineData.categories.push(item.date)
        lineData.series[0].data.push(item.errorNum)
      })
      this.setLine(lineData);
		})
  },
  touchHandler: function (e) {
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  setLine(lineData){
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    lineChart=new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      legend:false,
      categories: lineData.categories,
      series:lineData.series,
      yAxis: {
          title: '', 
          format: function (val) {
              return val;
          },
          max:10,
          min: 0
      },
      width: windowWidth,
      height: 200,
    });
  },
  setColumn(columnData){
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    columnChart = new wxCharts({
        canvasId: 'columnCanvas',
        type: 'column',
        animation: true,
        categories:  columnData.categories,
        series: columnData.series,
        yAxis: {
            format: function (val) {
                return val + '分';
            },
            gridColor: '#F7F8F9',
            title: '',
            min: 0,  //最小值
            max:100,  //最大值
        },
        xAxis: {
            disableGrid: false,
            type: 'calibration'
        },
        extra: {
            column: {
                width: 15
            }
        },
        width: windowWidth,
        height: 200,
    });
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
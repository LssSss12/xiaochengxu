// pages/pointDetail/pointDetail.js
var wxCharts = require('../../utils/wxcharts.js');
var columnChart = null;
var lineChart=null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:3
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setColumn();
    this.setLine();
  },
  touchHandler: function (e) {
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  setLine(){
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
      categories: ['2012', '2013', '2014', '2015', '2016', '2017'],
      series: [{  
          name: '错题数',  
          data: [2,3,4,5,4,3,5],  
          color:'#FF7944',
          format: function (val) { 
              return val+'题'; 
          } 
      }],
      yAxis: {
          title: '', 
          format: function (val) {
              return val;
          },
          min: 0
      },
      width: windowWidth,
      height: 200,
    });
  },
  setColumn(){
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
        categories: [ '2013', '2014', '2015', '2016', '2017'],
        series: [{
            name: '单选题',
            data: [ 20, 45, 37, 4, 80],
            color:'#FF812F',
            format: function (val, name) {
              return val ;
            }
        }, {
            name: '多选题',
            data: [ 40, 65, 100, 34, 18],
            color:'#FFC12F',
            format: function (val, name) {
              return val ;
            }
        }, {
          name: '简答题',
          data: [ 40, 65, 100, 34, 18],
          color:'#50D485',
          format: function (val, name) {
            return val ;
          }
        }],
        yAxis: {
            format: function (val) {
                return val + '分';
            },
            gridColor: '#F7F8F9',
            title: '',
            min: 0
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
let app = getApp();
let util = require('./util.js');
let aesTool = require('./aesTool.js');

function request(method, url, param, isShowLoading) {
  //返回一个Promise对象
  return new Promise(function(resolve, reject) {
    if (isShowLoading) {
      wx.showLoading({
        title: '加载中...',
        mask: true
      });
    }
    const date = util.formatTime(new Date())
    var verifyToken = aesTool.Encrypt_cbc(date)
    let token = wx.getStorageSync('token');
  
    let nice = {};
    let header = {};
    nice = JSON.stringify(param);
    header = {
      'context-type': 'application/json'
      }
    header["token"] = token;
    header["verifyToken"] = verifyToken;
    wx.request({
      url: url,
      method: method,
      data: nice,
      header: header,
      success: function(res) {
        if (isShowLoading) {
          wx.hideLoading();
        }
        if (res.data.code == 0) { // 接口正常返回
          resolve(res.data);
        } else { // 出现异常
          // wx.showToast({
          //   title: res.data.message,
          //   icon: 'none',
          //   duration: 2000
          // });
          reject(res.data);
        }
      },
      fail: function(res) {
        wx.hideLoading();
        wx.showToast({
          title: '服务连接异常',
          icon: 'none',
          duration: 2000
        });
      }
    });
  });
}

// get请求
function get(path, param = {}, isShowLoading = true) {
  return request("GET", getApp().globalData.baseurl + path, param, isShowLoading);
}

// post请求
function post(path, param = {}, isShowLoading = true) {
  return request("POST", getApp().globalData.baseurl + path, param, isShowLoading);
}


module.exports = {
  get: get,
  post: post,
}
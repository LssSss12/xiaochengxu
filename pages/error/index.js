
Page({
	data: {
		error: ''
	},
	onLoad: function (options) {},
	//提交纠错
	postError() {
	
	},
	//保存输入内容
	change(e) {
		this.setData({
			error:e.detail.value
		})
	},
	onClickLeft() {
		wx.navigateBack({
			delta:1
		})
	}
})
let api = require('../../utils/api.js')
Page({
	data: {
		courseId:'',
		paperId:'',
		obj:{}
	},
	onLoad: function (options) {
		this.setData({
			courseId:options.courseId,
			paperId:options.paperId,
			obj:JSON.parse(options.obj)
		})
		},
		goTipic() {
			wx.navigateTo({
				url: '../realTopic/topic?courseId=' + this.data.courseId + '&paperId=' + this.data.paperId + '&totalTime=' + this.data.obj.totaltime,
			})
		},
	onClickLeft() {
		wx.navigateBack({
			delta: 1
		})
	},
})
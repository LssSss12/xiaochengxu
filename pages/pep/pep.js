let api = require('../../utils/api.js')
Page({
	data: {
		examId:'',
		years:[]
	},
	onLoad: function (options) {
		let param = {
			examCourseId:wx.getStorageSync('courseId')
		}
		api.getUserPreviousExamPapers(param)
		.then(res => {
			this.setData({
				years:res.data
			})
		})
		this.setData({
			examId:wx.getStorageSync('courseId')
		})
	},
	startTopic(e) {
		let paperId = e.currentTarget.dataset.id
		let index = e.currentTarget.dataset.index
		wx.navigateTo({
			url: '../pepHome/pep?courseId=' + this.data.examId + '&paperId=' + paperId + "&obj=" + JSON.stringify(this.data.years[index])
		})
	},
	onClickLeft() {
		wx.switchTab({
			url: '../tiku/tiku',
		})
	}
})
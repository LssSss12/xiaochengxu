let api = require('../../utils/api.js')
Page({
	data: {
		name: '二级建造师',
		courses: []
	},
	onLoad: function (options) {
		let param = {
			examType: options.name
		}
		api.getExamCourseListForName(param)
		.then(res => {
			this.setData({
				courses: res.data
			})
		})
		.catch()
		this.setData({
			name:options.name
		})
	},
	onReady: function () {},
	onShow: function () {},
	onClickLeft() {
		
	},
	onClickLeft() {
		wx.navigateBack({
			delta: 1
		})
	},
	checkSort(e) {
		console.log(e)
	}
})
let api = require('../../utils/api.js')
Page({
	data: {
		types: []
	},
	onLoad: function (options) {
		let param = {

		}
		api.getExamTypeInfoList(param)
		.then(res => {
			this.setData({
				types:res.data
			})
		}).catch(res => {

		})
	},
	onClickLeft() {
		wx.switchTab({
			url: '../tiku/tiku',
		})
	},
	toSort(e) {
		let name=e.currentTarget.dataset.name
		wx.navigateTo({
			url: '../examCourse/course?name=' + name,
		})
	}
})
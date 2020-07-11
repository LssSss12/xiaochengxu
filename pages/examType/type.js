let api = require('../../utils/api.js')
let app = getApp();
Page({
	data: {
		types: []
	},
	onLoad: function (options) {},
	
	getExamType() {
		let param = {}
		api.getExamTypeInfoList(param)
		.then(res => {
			this.setData({
				types:res.data
			})
		}).catch(res => {})
	},
	toSort(e) {
		let name=e.currentTarget.dataset.name
		wx.navigateTo({
			url: '../examCourse/course?name=' + name,
		})
	}
})
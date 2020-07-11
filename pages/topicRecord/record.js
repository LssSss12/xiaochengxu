// pages/topicRecord/record.js
Page({
	data: {
		records: [
			{
				date: ' 2020/07/01',
				children: [
					{
						title: '哈哈哈',
						totle: '20',
						done:'10'
					},
					{
						title: '哈哈哈',
						totle: '20',
						done:'10'
					}
				]
			},
			{
				date: ' 2020/07/01',
				children: [
					{
						title: '哈哈哈',
						totle: '20',
						done:'10'
					},
					{
						title: '哈哈哈',
						totle: '20',
						done:'10'
					}
				]
			}
		]
	},
	onLoad: function (options) {},

	onClickLeft() {
		wx.navigateBack({
			delta:1
		})
	}
})
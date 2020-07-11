
Page({
	data: {
		value: '',
		tabId: '1',
		searchs:[
			{
				name:'搜索搜索哦搜索搜索哦搜索搜索哦',
				id:1
			},	{
				name:'搜索搜索哦搜索搜索哦搜索搜索哦',
				id:1
			},	{
				name:'搜索搜索哦搜索搜索哦搜索搜索哦',
				id:1
			}
		]
	},
	onLoad: function (options) {},
	chkTab(e) {
		let id = e.currentTarget.dataset.tabid
		this.setData({
			tabId:id
		})
	},
	delete() {
		console.log(1)
	},
	onClickLeft(){
		wx.navigateBack({
			delta:1
		})
	}
})
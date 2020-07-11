let api = require('../../utils/api.js')
Page({

	data: {
		sections: [
			{
				title: '1Z20102333建筑项目工程',
				id: '1',
				count: '77',
				accuracy: '99%',
				show: false,
				children:[
					{
						title: '1Z20102333建筑项目工程',
						id: '1',
						count: '22',
						accuracy: '88%',
						show: false,
						children: [
							{
								title: '1Z20102333建筑项目工程',
								id: '1',
								count: '33',
								accuracy: '77%',
								children: [
									{
										title: '1Z20102333建筑项目工程',
										id: '1',
										count: '32',
										accuracy: '77%'
									}
								]
							}
						]
					},
				]
			}
		]
	},
	onLoad: function (options) {
		let param ={
			examCourseId:'7',
			pageNum:'1',
			pageSize:'20'
		}
		api.getuserCollectTitleList(param).then(res => {

		})
	},
		//层级展开
	slectDown(e) {
		let level = e.currentTarget.dataset.level
		if(level === '1'){
			let index = e.currentTarget.dataset.index
			let str = 'sections['+index+'].show'
			this.setData({
				[str]:!this.data.sections[index].show
			})
		}else if(level === '2'){
			let parent1Index = e.currentTarget.dataset.parent1
			let index = e.currentTarget.dataset.index
			let str = 'sections['+parent1Index+'].children['+index+'].show'
			this.setData({
				[str]: !this.data.sections[parent1Index].children[index].show
			})
		}else if(level === '3'){
			let parent1Index = e.currentTarget.dataset.parent1
			let parent2Index = e.currentTarget.dataset.parent2
			let index = e.currentTarget.dataset.index
			let str = 'sections['+parent1Index+'].children['+parent2Index+'].children['+index+'].show'
			this.setData({
				[str]: !this.data.sections[parent1Index].children[parent2Index].children[index].show
			})
		}else if(level === '4'){
			let parent1Index = e.currentTarget.dataset.parent1
			let parent2Index = e.currentTarget.dataset.parent2
			let parent3Index = e.currentTarget.dataset.parent3
			let index = e.currentTarget.dataset.index
			let str = 'sections['+parent1Index+'].children['+parent2Index+'].children['+parent4Index+'].children['+index+'].show'
			this.setData({
				[str]: !this.data.sections[parent1Index].children[parent2Index].children[parent3Index].children[index].show
			})
		}
	},
	onClickLeft() {
		wx.navigateBack({
			delta:1
		})
	}
})
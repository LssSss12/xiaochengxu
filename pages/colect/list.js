let api = require('../../utils/api.js')
Page({

	data: {
		sections: []
	},
	onLoad: function (options) {
		this.setData({
			examCourseId:wx.getStorageSync('courseId'),
			courseName:wx.getStorageSync('courseName')
		},() => {
			this.getSection('sections',0)
		})
	},
	getSection(level,chapterId){
		let param = {
			examCourseId:this.data.examCourseId,
			chapterId:chapterId
		}
		api.getuserCollectTitleList(param).then(res=>{
			this.setData({
				[level]:res.data
			})
		})
	},
		//层级展开
	slectDown(e) {
		let level = e.currentTarget.dataset.level
		let id = e.currentTarget.dataset.id
		if(level === '1'){
			let index = e.currentTarget.dataset.index
			let str = 'sections['+index+'].show'
			if(!this.data.sections[index].show){
				let levelStr = 'sections['+index+'].children'
				this.getSection(levelStr,id)
			}
			this.setData({
				[str]:!this.data.sections[index].show
			})
			
		}else if(level === '2'){
			let parent1Index = e.currentTarget.dataset.parent1
			let index = e.currentTarget.dataset.index
			let str = 'sections['+parent1Index+'].children['+index+'].show'
			if(!this.data.sections[parent1Index].children[index].show){
				let levelStr = 'sections['+parent1Index+'].children['+index+'].children'
				this.getSection(levelStr,id)
			}
			this.setData({
				[str]: !this.data.sections[parent1Index].children[index].show
			})
		}else if(level === '3'){
			let parent1Index = e.currentTarget.dataset.parent1
			let parent2Index = e.currentTarget.dataset.parent2
			let index = e.currentTarget.dataset.index
			let str = 'sections['+parent1Index+'].children['+parent2Index+'].children['+index+'].show'
			if(!this.data.sections[parent1Index].children[parent2Index].children[index].show){
				let levelStr = 'sections['+parent1Index+'].children['+parent2Index+'].children['+index+'].children'
				this.getSection(levelStr,id)
			}
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
	startAction(e){
		let ids = e.currentTarget.dataset.id
		let title = e.currentTarget.dataset.title
		wx.setStorageSync('paperName', title)
		wx.navigateTo({
			url: '../colectTopic/topic?ids=' + ids
		})
	},
	onClickLeft() {
		wx.navigateBack({
			delta:1
		})
	}
})
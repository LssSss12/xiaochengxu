let api = require('../../utils/api.js')
Page({
	data: {
		checked: true,
		examCourseId:'',
		courseName:'',
		sections:[]
	},
	onLoad(options){
		this.setData({
			examCourseId:options.examCourseId,
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
		api.getUserChapterExamList(param).then(res=>{
			this.setData({
				[level]:res.data
			})
		})
	},
	onClickLeft() {
		wx.navigateBack({
			delta: 1
		})
	},
	//切换顶部switch
	onChange({detail}) {
		// 需要手动对 checked 状态进行更新
		this.setData({ checked: detail });
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
		let id = e.currentTarget.dataset.id
		let title = e.currentTarget.dataset.title
		wx.setStorageSync('paperName', title)
		wx.navigateTo({
			url: '../sectionTopic/topic?courseId='+this.data.examCourseId + '&chapterId=' + id
		})
	}
}
)
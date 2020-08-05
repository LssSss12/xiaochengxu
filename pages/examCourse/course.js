let api = require('../../utils/api.js')
let course = require('../../utils/course.js')
let app = getApp();
Page({
	data: {
		name: '',
		courses: [],
		coursesId:[]
	},
	onLoad: function (options) {
		this.setData({
			name:options.name,
			courses:course.getCourse(options.name)
		})
	},
	onClickLeft() {
		wx.navigateBack({
			delta: 1
		})
	},
	//选择科目
	checkSort(e) {
		let type = e.currentTarget.dataset.type
		let index = e.currentTarget.dataset.key
		let id = e.currentTarget.dataset.id
		let courseArr = this.data.coursesId
		if(type === '1'){
			let str = 'courses.publicList['+index+'].chked'
			if(!this.data.courses.publicList[index].chked){
				courseArr.push(id)
				this.setData({
					[str]:true,
					coursesId:courseArr
				})
			}else{
				courseArr.splice(courseArr.indexOf(id),1)
				this.setData({
					[str]:false,
					coursesId:courseArr  
				})
			}
		}else{
			let str = 'courses.majorList['+index+'].chked'
		
			for(let i=0;i<this.data.courses.majorList.length;i++){
				if(courseArr.indexOf(this.data.courses.majorList[i].id)>-1){
					courseArr.splice(courseArr.indexOf(this.data.courses.majorList[i].id),1)
				}
				let strAll = 'courses.majorList['+i+'].chked'
				this.setData({
					[strAll]:false
				})
			}
			courseArr.push(id)
				this.setData({
					[str]:true,
					coursesId:courseArr
				})
		}
	},
	//提交选择题目
	postCourse() {
		let param ={
				courseList:this.data.coursesId
			}
			api.preselectionCourse(param).then(res => {
				wx.reLaunch({
					url: '../tiku/tiku',
				})
			})
	},

	comfirm() {
		if(this.data.coursesId.length > 0){
			this.postCourse()
		}else{
			wx.showToast({
				title: '请选择课程',
				icon:'none'
			})
		}
	},
	
})
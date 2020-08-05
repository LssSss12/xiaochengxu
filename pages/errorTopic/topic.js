let api = require('../../utils/api.js')
let touchDotX = 0;//X按下时坐标
let touchDotY = 0;//y按下时坐标
let interval;//计时器
let time = 0;//从按下到松开共多少时间*100
Page({
	data: {
		courseName:'',
		title:'',
		ids:[],
		index:1,
		examObj:{},
		width:0,
		topicLength:0,
		analysis: false,//解析
		curAnwser: [],
		curAnwserStr: '',
		answerObj:{},
		analysisBtn:true
	},
	onLoad: function (options) {
		this.setData({
			ids:options.ids.split(','),
			title:wx.getStorageSync('paperName'),
			courseName:wx.getStorageSync('courseName'),
			width:this.data.index/options.ids.split(',').length*100,
			topicLength:options.ids.split(',').length
		})
		this.getTopic()
	},
	getTopic(){
		let index = this.data.index
		let param = {
			titleId: this.data.ids[index - 1]
		}
		api.getQuestionsTitle(param).then(res => {
				this.setData({
					examObj:res.data,
					isOne:res.data.isMultipleChoice,
					analysis: false
				})
				this.initAnswer()
		})
	},
			//获取解析
	getDayanalysis(){
		if(!this.data.analysis){
			let anwserStr = this.data.curAnwser.join('')
			this.getDayAnswer(anwserStr)
			this.setData({
				analysis:true,
				curAnwserStr:anwserStr,
				analysisBtn:false
			})
		}
	},
	getDayAnswer(answer) {
		let index = this.data.index
		let param = {
			titleId:this.data.ids[index - 1],
			courseId:wx.getStorageSync('courseId'),
			userAnswer:answer,
			paperType:4
		}
		api.getQuestionsAnalysis(param)
		.then(res => {
			this.setData({
				answerObj:res.data
			})
		})
		.catch()
	},
	//选择答案
	chkAnwser(e) {
		if(!this.data.analysis){
			if(this.data.isOne === 0){
				let anwser = e.currentTarget.dataset.answer.split('')
					this.setData({
						curAnwser:anwser,
						curAnwserStr:e.currentTarget.dataset.answer,
						analysis:true
					})
					this.getDayAnswer(e.currentTarget.dataset.answer)
			}else if(this.data.isOne === 1){
				let index = e.currentTarget.dataset.index
				let answer = this.data.curAnwser
				if(answer.indexOf(e.currentTarget.dataset.answer) < 0){
					answer.push(e.currentTarget.dataset.answer)
					let str = 'examObj.examQuestionsOptions['+index+'].isChk'
					this.setData({
						curAnwser:answer,
						[str]:true
					})
				}else{
					answer.splice(answer.indexOf(e.currentTarget.dataset.answer),1)
					let str = 'examObj.examQuestionsOptions['+index+'].isChk'
					this.setData({
						curAnwser:answer,
						[str]:false
					})
				}
			}
		}
	},
	initAnswer(){
		this.setData({
			curAnwser:[],
			curAnwserStr:'',
			analysis:false,
			analysisBtn:true
		})
	},
	// 触摸开始事件
	touchStart: function(e) {
		touchDotX = e.touches[0].pageX; // 获取触摸时的原点
		touchDotY = e.touches[0].pageY;
		// 使用js计时器记录时间    
		interval = setInterval(function() {
			time++;
		}, 100);
	},
	//滑动切换上下一提题
	touchEnd: function(e) {
		let touchMoveX = e.changedTouches[0].pageX;
		let touchMoveY = e.changedTouches[0].pageY;
		let tmX = touchMoveX - touchDotX;
		let tmY = touchMoveY - touchDotY;
		let num = this.data.index
		if (time < 200) {
			let absX = Math.abs(tmX);
			let absY = Math.abs(tmY);
			if (absX > 2 * absY) {
				if (tmX<0){
					if(this.data.index === this.data.topicLength){
						this.goBack()
						return;
				}else{
					this.setData({
						index:num+1,
					})
					this.getTopic()
				}
				}else{
					if(this.data.serialNumber === 1){
						wx.showToast({
							title: '前面没有题了~',
							icon: 'none'
						});
						return;
					}else{
						this.setData({
							index:num-1,
						})
						this.getTopic()
					}
				}
			}
		}
		clearInterval(interval); // 清除setInterval
		time = 0;
	},
//返回
onClickLeft() {
	wx.navigateBack({
		delta: 1
	})
},
goBack(){
	wx.navigateTo({
		url: '../errors/topic',
	})
}
})
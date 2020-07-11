let api = require('../../utils/api.js')
let touchDotX = 0;//X按下时坐标
let touchDotY = 0;//y按下时坐标
let interval;//计时器
let time = 0;//从按下到松开共多少时间*100
Page({
	data: {
		courseId:'',//科目id
		paperId:'',//真题集id
		time: 45 * 60 * 1000,
		width: 0,//进度条
		isRest: false,
		modal: false,
		topicObj:{},//题目信息
		answerArr: [],
		serialNumber:1,//当前第几题
		topicLength:0,//题目数量,
		userExamPaperRecordId:''//答题卡ID
	},
	onLoad: function (options) {
		//正常答题流程会有这些值，答题卡回来没有，去缓存里取
		if(options.courseId){
			wx.setStorageSync('courseId', options.courseId)
			wx.setStorageSync('paperId', options.paperId)
		}
		this.setData({
			courseId:	wx.getStorageSync('courseId'),
			paperId:wx.getStorageSync('paperId')
		})
		//答题卡回跳
		if(options.from === 'card'){
			this.setData({
				serialNumber:parseFloat(options.serialNumber),
				userExamPaperRecordId:options.userExamPaperRecordId,
				time:parseFloat(wx.getStorageSync('remain')),
				topicLength:options.topicLength
			},()=>{
				this.getTopic()
			})
			
		}else{
		let param = {
			courseId:options.courseId,
			paperId:options.paperId,
			paperType:2
		}
			api.iniPastExamPages(param).then(res => {
				this.setData({
					topicObj:res.data.respondAppExamQuestionVo,
					topicLength:res.data.userExamPaperRecordEntity.totalTitle,
					userExamPaperRecordId:res.data.userExamPaperRecordEntity.id
				})
				if(res.data.respondAppExamQuestionVo.userAnswer&&res.data.respondAppExamQuestionVo.userAnswer!==''){
					this.setData({
						answerArr:res.data.respondAppExamQuestionVo.userAnswer.split('')
					},()=>{
						this.chkUserAnswer()
					})
				}
			})
		}
		
	},
	//场景：用户答完滑走，又滑回，需选中之前所选答案
	chkUserAnswer(){
		for(let r=0;r<this.data.topicObj.examQuestionsOptions.length;r++){
			if(this.data.answerArr.indexOf(this.data.topicObj.examQuestionsOptions[r].optionNo) > -1){
				let str = 'topicObj.examQuestionsOptions['+r+'].isChk'
				this.setData({
					[str]:true
				})
			}
		}
	},
	//计时暂停
	rest() {
		const countDown = this.selectComponent('.count-down');
		countDown.pause();
		this.setData({
			isRest: true,
			modal: true
		})
	},
	//计时继续
	timeGo() {
		const countDown = this.selectComponent('.count-down');
		countDown.start();
		this.setData({
			isRest: false,
			modal: false
		})
	},
	//倒计时结束
	finished(){},
	//获取题目
	getTopic() {
		let param = {
			userExamPaperRecordId:this.data.userExamPaperRecordId,
			serialNumber: this.data.serialNumber
		}
		api.userSkipQuestionTitle(param).then(res => {
			this.setData({
				topicObj: res.data,
				width:this.data.serialNumber/this.data.topicLength*100,
				isColect:false
			})
			if(res.data.userAnswer&&res.data.userAnswer!==''){
				this.setData({
					answerArr:res.data.userAnswer.split('')
				},()=>{
					this.chkUserAnswer()
				})
			}
		})
	},
	//选择答案
	chkAnswer(e) {
		let answerArr = this.data.answerArr
		let index = e.currentTarget.dataset.index
		let option = e.currentTarget.dataset.option
		//单选
		if(this.data.topicObj.isMultipleChoice === 0){
			if(answerArr.indexOf(option) === -1){
				let str = "topicObj.examQuestionsOptions[" + index + "].isChk"
				if(answerArr.length ===0){
					answerArr.push(option)
					this.setData({
						[str]:true,
						answerArr:answerArr
					})
				}else{
					for(let i=0;i<this.data.topicObj.examQuestionsOptions.length;i++){
						let str = "topicObj.examQuestionsOptions[" + i + "].isChk"
						this.setData({
							[str]:false
						})
					}
					answerArr[0] = option
					this.setData({
						[str]:true,
						answerArr:answerArr
					})
				}
			}
			//多选
		}else if(this.data.topicObj.isMultipleChoice === 1){
			let str = "topicObj.examQuestionsOptions[" + index + "].isChk"
			//未选
			if(answerArr.indexOf(option) === -1){
				answerArr.push(option)
				this.setData({
					[str]:true,
					answerArr:answerArr
				})
			//已选
			}else{
				answerArr.splice(answerArr.indexOf(option),1)
				this.setData({
					[str]:false,
					answerArr:answerArr
				})
			}
		}
	},
	//提交答案
	pushAnswer() {
		if(this.data.answerArr.length > 0){
			let param ={
				userExamPaperRecordId:this.data.userExamPaperRecordId,
				serialNumber: this.data.serialNumber,
				userAnswer:this.data.answerArr.join('')
			}
			api.userAnswerQuestion(param).then(res => {
					this.setData({
						answerArr: []
					})
			}).catch()
		}
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
	let num = this.data.serialNumber
	if (time < 20) {
		let absX = Math.abs(tmX);
		let absY = Math.abs(tmY);
		if (absX > 2 * absY) {
			//提交当前题答案
			this.pushAnswer()
			if (tmX<0){
				if(this.data.serialNumber === this.data.topicLength){
					wx.showToast({
						title: '题目已经答完，请交卷~',
						icon: 'none'
					})
					return;
			}else{
				this.setData({
					serialNumber:num+1,
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
						serialNumber:num-1,
					})
					this.getTopic()
				}
			}
		}
		if (absY > absX * 2 && tmY<0) {
			console.log("上滑动=====")
		}
	}
	clearInterval(interval); // 清除setInterval
	time = 0;
},
//交卷
jiaojuan() {
	const remain = this.selectComponent('.count-down').remain;
	wx.setStorageSync('remain',remain)
	wx.navigateTo({
		url: '../topicCard/card?id=' + this.data.userExamPaperRecordId,
	})
},
//收藏
collect(){
	let str = 'topicObj.isCollected'
	if(this.data.topicObj.isCollected){
		let param = {
			questionsTitleId:this.data.topicObj.questionsTitleId
		}
		api.deleteUserCollectTitle(param).then(res=>{
			wx.showToast({
				title: '取消收藏成功',
			})
			this.setData({
				[str]:false
			})
		})
	}else{
		let param = {
			questionsTitleId:this.data.topicObj.questionsTitleId,
			examCourseId:this.data.courseId,
		}
		api.userCollectTitle(param).then(res=> {
			wx.showToast({
				title: '收藏成功',
			})
			this.setData({
				[str]:true
			})
		})
	}
},
onClickLeft() {
	wx.navigateBack({
		delta: 1
	})
}
})
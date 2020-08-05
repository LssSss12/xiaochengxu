let api = require('../../utils/api.js')
let touchDotX = 0;//X按下时坐标
let touchDotY = 0;//y按下时坐标
let interval;//计时器
let time = 0;//从按下到松开共多少时间*100
Page({
	data: {
		courseId:'',//科目id
		courseName:'',
		paperId:'',//真题集id
		time: 0,
		width: 0,//进度条
		isRest: false,
		modal: false,
		modal2: false,
		topicObj:{},//题目信息
		answerArr: [],
		serialNumber:1,//当前第几题
		topicLength:0,//题目数量,
		userExamPaperRecordId:'',//答题卡ID
		topicCard:[]
	},
	onLoad: function (options) {
		//正常答题流程会有这些值，答题卡回来没有，去缓存里取
		if(options.courseId){
			wx.setStorageSync('courseId', options.courseId)
			wx.setStorageSync('paperId', options.paperId)
		}
		this.setData({
			courseId:	wx.getStorageSync('courseId'),
			courseName:wx.getStorageSync('courseName'),
			paperId:wx.getStorageSync('paperId'),
			time:options.totalTime*60*1000
		})
		//答题卡回跳
		if(options.from === 'card'){
			this.setData({
				serialNumber:parseFloat(options.serialNumber),
				userExamPaperRecordId:options.userExamPaperRecordId,
				time:parseFloat(wx.getStorageSync('remain')),
				paperName:wx.getStorageSync('paperName'),
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
					topicList:res.data.userExamTitleRecordEntityList,
					topicLength:res.data.userExamPaperRecordEntity.totalTitle,
					userExamPaperRecordId:res.data.userExamPaperRecordEntity.id,
					paperName:res.data.userExamPaperRecordEntity.paperName,
					width:this.data.serialNumber/res.data.userExamPaperRecordEntity.totalTitle*100,
				})
				wx.setStorageSync('userExamPaperRecordId', res.data.userExamPaperRecordEntity.id)
				wx.setStorageSync('paperName', res.data.userExamPaperRecordEntity.paperName)
				if(res.data.respondAppExamQuestionVo.userAnswer&&res.data.respondAppExamQuestionVo.userAnswer!==''){
					this.setData({
						answerArr:res.data.respondAppExamQuestionVo.userAnswer.split('')
					},()=>{
						this.chkUserAnswer()
					})
				}
				//案例分析处理图片
			if(res.data.respondAppExamQuestionVo){
				if(res.data.respondAppExamQuestionVo.titleType === 2){
					this.dealRichImg(res.data.respondAppExamQuestionVo.respondExamStemVo.questionsStem)
				}
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
		let index = this.data.serialNumber
		let param = {
			userExamPaperRecordId:this.data.userExamPaperRecordId,
			serialNumber: this.data.topicList[index - 1].serialNumber
		}
		api.userSkipQuestionTitle(param).then(res => {
			this.setData({
				topicObj: res.data.respondAppExamQuestionVo,
				width:this.data.serialNumber/this.data.topicLength*100,
				isColect:false
			})
			// if(res.data.userExamTitleRecordEntity){
			// 	if(res.data.userExamTitleRecordEntity.userAnswer&&res.data.userExamTitleRecordEntity.userAnswer!==''){
			// 		this.setData({
			// 			answerArr:res.data.userExamTitleRecordEntity.userAnswer.split('')
			// 		},()=>{
			// 			this.chkUserAnswer()
			// 		})
			// 	}
			// }
			if(this.data.topicCard[index - 1]&&this.data.topicCard[index - 1] !== ''){
				this.setData({
					answerArr:this.data.topicCard[index - 1].split('')
				},()=>{
					this.chkUserAnswer()
				})
			}
			//案例分析处理图片
			if(res.data.respondAppExamQuestionVo){
				if(res.data.respondAppExamQuestionVo.titleType === 2){
					this.dealRichImg(res.data.respondAppExamQuestionVo.respondExamStemVo.questionsStem)
				}
			}
		})
	},
		//处理分析题中的img
		dealRichImg(str){
			let domStr = str.replace(new RegExp("ᑅ ≮","gm"),'<img style="max-width:100%;height:auto;" src="').replace(new RegExp("≯ᐷ","gm"),'"></img>')
			this.setData({
				questionsStem:"【" + this.data.topicObj.respondExamStemVo.questionsNo + "】" + domStr
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
				this.pushAnswer()
				if(this.data.serialNumber === this.data.topicLength){
					this.jiaojuan()
					return;
				}else{
					let serialNumber = this.data.serialNumber
					this.setData({
						serialNumber:serialNumber + 1
					},res => {
						this.getTopic()
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
			let index = this.data.serialNumber
			let param ={
				userExamPaperRecordId:this.data.userExamPaperRecordId,
				serialNumber: this.data.topicList[index - 1].serialNumber,
				userAnswer:this.data.answerArr.join('')
			}

			let topicCard = this.data.topicCard
			topicCard[index - 1] = this.data.answerArr.join('')
			api.userAnswerQuestion(param).then(res => {
					this.setData({
						answerArr: [],
						topicCard:topicCard
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
					this.pushAnswer()
					this.jiaojuan()
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
	console.log(Math.ceil((this.data.time - parseFloat(remain))/1000))
	wx.setStorageSync('remain',Math.ceil((this.data.time - parseFloat(remain))/1000))
	wx.navigateTo({
		url: '../topicCard/card?from=' + 'real'
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
	this.setData({
		modal2:true
	})
},
cancleJ() {
	this.setData({
		modal2:false
	})
},
confirmJ() {
	wx.switchTab({
		url: '../tiku/tiku',
	})
}
})
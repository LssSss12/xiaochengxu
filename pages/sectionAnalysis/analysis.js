let api = require('../../utils/api.js')
let touchDotX = 0;//X按下时坐标
let touchDotY = 0;//y按下时坐标
let interval;//计时器
let time = 0;//从按下到松开共多少时间*100
Page({
	data: {
		courseName:'',
		answerArr: '',
		answerResult:-1,//-1:没答 0:错误  1:全对  2:半对  
		userExamPaperRecordId:'',
		type:'1',//1-全部解析 2-错题解析（需要错题数组）
		errArr:[],
		serialNumber:1,
		length:0, //题目总数
		errIndex: 0,//用于错题当前index，
		questionsStem:'',
		from: ''
	},
	onLoad: function (options) {
		this.setData({
			courseName:wx.getStorageSync('courseName'),
			from:wx.getStorageSync('from'),
			userExamPaperRecordId:wx.getStorageSync('userExamPaperRecordId'),
			type:options.type,
			length:parseFloat(options.length),
			paperName: wx.getStorageSync('paperName')
		})
		if(options.type === "1"){
			this.setData({
				serialNumber:parseFloat(options.serialNumber),
			})
		}else if(options.type === '2'){
			this.setData({
				errArr:JSON.parse(options.errArr),
				serialNumber:parseFloat(JSON.parse(options.errArr)[0]),
			})
		}
		if(this.data.from === 'real'){
			this.setData({
				cards:wx.getStorageSync('cards')
			})
		};
		this.getTopicTitle()
	},
	//获取题目、解析
	getTopicTitle(){
		let param = {
			serialNumber:'',
			userExamPaperRecordId:wx.getStorageSync('userExamPaperRecordId')
		}
		let index = this.data.serialNumber
		if(this.data.from === 'real'){
			param.serialNumber = this.data.cards[index - 1]

		}else {
			param.serialNumber = index
		}
		api.userSkipQuestionTitle(param).then(res => {
			this.setData({
				topicObj: res.data,
				analysisObj:res.data.questionsAnalysisInfoVo
			})
			if(res.data.userExamTitleRecordEntity){
				if(res.data.userExamTitleRecordEntity.userAnswer&&res.data.userExamTitleRecordEntity.userAnswer!==''){
					this.setData({
						answerArr:res.data.userExamTitleRecordEntity.userAnswer.split(''),
						answerResult:res.data.userExamTitleRecordEntity.answerResult
					},()=>{
						this.chkUserAnswer()
					})
				}else{
					this.setData({
						answerResult:-1
					})
				}
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
			questionsStem:domStr
		})
	},
	//选中状态设置
	chkUserAnswer(){
		for(let i=0;i<this.data.topicObj.respondAppExamQuestionVo.examQuestionsOptions.length;i++){
			if(this.data.answerArr.indexOf(this.data.topicObj.respondAppExamQuestionVo.examQuestionsOptions[i].optionNo) >= 0){
				let str = 'topicObj.respondAppExamQuestionVo.examQuestionsOptions['+ i +'].isChk' 
				this.setData({
					[str]:true
				})
			}
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
		let length = this.data.length
		if (time < 200) {
			let absX = Math.abs(tmX);
			let absY = Math.abs(tmY);
			if (absX > 2 * absY) {
				//提交当前题答案
				if (tmX<0){
					if(this.data.type === "1"){
						if(this.data.serialNumber === length){
							wx.showToast({
								title: '该题目是最后一题~',
								icon:'none'
							})
						}else{
							this.setData({
								serialNumber:num+1
							},()=>{
								this.getTopicTitle()
							})
						}
					}else if(this.data.type === "2"){
						let errLength = this.data.errArr.length
						if(this.data.serialNumber === this.data.errArr[errLength - 1]){
							wx.showToast({
								title: '该题目是最后一题~',
								icon:'none'
							})
						}else{
							let errIndex = this.data.errIndex
							this.setData({
								errIndex: errIndex+1,
								serialNumber:this.data.errArr[errIndex + 1]
							},()=>{
								this.getTopicTitle()
							})
						}
					}
				}else{
					if(this.data.type === "1"){
						if(this.data.serialNumber === 1){
							wx.showToast({
								title: '前面没有题了~',
								icon: 'none'
							});
							return;
						}else{
							this.setData({
								serialNumber:num-1
							},()=>{
								this.getTopicTitle()
							})
						}
					}else if(this.data.type === "2"){
						if(this.data.serialNumber === this.data.errArr[0]){
							wx.showToast({
								title: '前面没有题了~',
								icon:'none'
							})
						}else{
							let errIndex = this.data.errIndex
							this.setData({
								errIndex: errIndex-1,
								serialNumber:this.data.errArr[errIndex - 1]
							},()=>{
								this.getTopicTitle()
							})
						}
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
//返回
onClickLeft() {
	wx.navigateBack({
		delta: 1
	})
}
})
let api = require('../../utils/api.js')

Page({
	data: {
		active: 0,
		tabs: [],
		tabId:'',//当前tab
		examObj:{},//题干
		answerObj:{},//答案
		analysis: false,//解析
		isOne: 0, //单选多选
		anwser: '',
		curAnwser: [],
		curAnwserStr: '',
		userExamTitleRecordId: '',
		analysisBtn:true
	},
	onLoad: function (options) {
		this.setData({
			tabId:wx.getStorageSync('courseId')
		})
		let param = {}
    api.getUserExamCourseInfo(param)
    .then(res => {
      this.setData({
        tabs: res.data,
        tabId:res.data[0].id,
      })
    this.getDayTitle()
    })
	},
	//tab切换
  onChange(e) {
    let index = e.detail.index
    this.setData({
      active:index,
			tabId: this.data.tabs[index].id,
			analysis:false,
			answerObj:{},//答案
			anwser: '',
			curAnwser: [],
			curAnwserStr: ''
    },() => {
      this.getDayTitle()
    })
	},
	//获取每日一题
	getDayTitle() {
		let param = {
			examCourseId:this.data.tabId
		}
		api.getUserDailyOneTitle(param)
		.then(res=>{
			this.setData({
				examObj:res.data,
				isOne:res.data.respondAppExamQuestionVo.isMultipleChoice,
				analysisBtn:true,
				examPoints:res.data.respondAppExamQuestionVo.examPoints
			})
			if(res.data.userExamTitleRecordEntity){
				if(res.data.userExamTitleRecordEntity.userAnswer&&res.data.userExamTitleRecordEntity.userAnswer!==''){
					let curAnwser = res.data.userExamTitleRecordEntity.userAnswer.split('')
				this.setData({
					analysis:true,
					curAnwser:curAnwser,
					curAnwserStr:res.data.userExamTitleRecordEntity.userAnswer,
					answerObj:res.data.questionsAnalysisInfoVo
				})

				for(let i=0;i<this.data.examObj.respondAppExamQuestionVo.examQuestionsOptions.length;i++){
					if(this.data.curAnwser.indexOf(this.data.examObj.respondAppExamQuestionVo.examQuestionsOptions[i].optionNo) >= 0){
						let str = 'examObj.respondAppExamQuestionVo.examQuestionsOptions['+ i +'].isChk' 
						this.setData({
							[str]:true
						})
					}
				}
				}
			}
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
		//获取每日一题答案
	getDayAnswer(answer) {
		let param = {
			questionsTitleId:this.data.examObj.respondAppExamQuestionVo.questionsTitleId,
			userAnswer:answer
		}
		api.usersubmitDailyOneTitleAnswer(param)
		.then(res => {
			this.setData({
				answerObj:res.data.questionsAnalysisInfoVo,
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
				this.getDayAnswer(anwser)
			}else if(this.data.isOne === 1){
				let index = e.currentTarget.dataset.index
				let answer = this.data.curAnwser
				if(answer.indexOf(e.currentTarget.dataset.answer) < 0){
					answer.push(e.currentTarget.dataset.answer)
					let str = 'examObj.respondAppExamQuestionVo.examQuestionsOptions['+index+'].isChk'
					this.setData({
						curAnwser:answer,
						[str]:true
					})
				}else{
					answer.splice(answer.indexOf(e.currentTarget.dataset.answer),1)
					let str = 'examObj.respondAppExamQuestionVo.examQuestionsOptions['+index+'].isChk'
					this.setData({
						curAnwser:answer,
						[str]:false
					})
				}
			}
		}
	},

//返回
onClickLeft() {
	wx.navigateBack({
		delta: 1
	})
},
})
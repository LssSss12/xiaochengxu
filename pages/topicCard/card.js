let api = require('../../utils/api.js')
Page({
	data: {
		modal:false,
		cards:[],
		answerMsg:''
	},
	onLoad: function (options) {
		let param ={
			userExamPaperRecordId:options.id
		}
		api.userQuestionTitleRecordDetails(param).then(res => {
			this.setData({
				cards:res.data
			})
		})
	},
	onClickLeft(){
		wx.navigateBack({
			delta: 1
		})
	},
	//跳转题目详情
	topicDetail(e) {
		let index = e.currentTarget.dataset.index
		wx.redirectTo({
			url: '../realTopic/topic?serialNumber='+index + "&userExamPaperRecordId=" + this.data.cards[0].userExamPaperId + "&topicLength=" + this.data.cards.length + "&from=" + 'card'
		})
	},
	jiaojuan() {
		let answerMsg = '全部题目已答完，确定交卷吗？'
		for(let i=0;i<this.data.cards.length;i++){
			if(this.data.cards[i].isAnswer === 0){
				answerMsg = '您还有题目未完成，确定交卷吗？'
				break
			}
		}
		this.setData({
			answerMsg:answerMsg,
			modal: true
		})
	},
	cancleJ() {
		this.setData({
			modal: false
		})
	},
	confirmJ() {
		
		let remain = 45 * 60 * 1000 - parseFloat(wx.getStorageSync('remain'))
		let param = {
			userExamPaperRecordId:this.data.cards[0].userExamPaperId,
			durationTime:remain
		}
		api.userSubmitAnswerSheet(param).then(res=>{
			this.setData({
				modal: false
			})
			wx.navigateTo({
				url:'../report/report?report=' + JSON.stringify(res.data)
			})
	})
	}
})
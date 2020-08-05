let api = require('../../utils/api.js')
let app = getApp();
Page({
	data: {
		modal:false,
		cards:[],
		answerMsg:'',
		from:'',
		userExamPaperRecordId:'',
		navHeight:app.globalData.navHeight
	},
	onLoad: function (options) {
		this.setData({
			from:options.from,
			userExamPaperRecordId:wx.getStorageSync('userExamPaperRecordId')
		})
		let param ={
			userExamPaperRecordId:wx.getStorageSync('userExamPaperRecordId')
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
		let url=''
		if(this.data.from === 'section'){
			url = 'sectionTopic'
		}else if(this.data.from === 'real'){
			url = 'realTopic'
		}else if(this.data.from === 'speed'){
			url = 'speedTopic'
		}
		wx.redirectTo({
			url: '../'+ url +'/topic?serialNumber='+index + "&userExamPaperRecordId=" + this.data.userExamPaperRecordId + "&topicLength=" + this.data.cards.length + "&from=" + 'card'
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

		let remain = parseFloat(wx.getStorageSync('remain'))
		let param = {
			userExamPaperRecordId:this.data.userExamPaperRecordId,
			durationTime:remain
		}
		api.userSubmitAnswerSheet(param).then(res=>{
			this.setData({
				modal: false
			})
			wx.navigateTo({
				url:'../report/report?report=' + JSON.stringify(res.data) + "&from=" + this.data.from
			})
	})
	}
})
let api = require('../../utils/api.js')
Page({
	data: {
		records: [],
		pageNum: 1,
		pageSize:20,
		showLoading:true, //是否还有更多数据
	},
	onLoad: function (options) {
		this.getRecords()
	},

	getRecords() {
		let param =  {
			examCourseId:wx.getStorageSync('courseId'),
			pageNum:this.data.pageNum,
			pageSize:this.data.pageSize
		}
		api.getUsetExamPaperRecord(param).then(res=>{
			let data = res.data.list
			for(let i=0;i<data.length;i++){
				data[i].createTime = this.getYYYYMMDD(data[i].createTime)
			}
			this.setData({
				records:this.data.records.concat(data),
				total:res.data.total,
				showLoading:false
			})
		})
	},

getYYYYMMDD (str) {
  let nDate = new Date(str)
  let nYear = nDate.getFullYear()
  let nMonth = nDate.getMonth() + 1
  let nDay = nDate.getDate()
  let nTime = nYear + '-' + this.addZero(nMonth) + '-' + this.addZero(nDay) // YYYY-MM-DD

  return nTime
},
addZero (num) {
  if (parseInt(num) < 10) {
    num = '0' + num
  }
  return num
},
	goTopic(e) {
		let type = e.currentTarget.dataset.type
		let paperName = e.currentTarget.dataset.name
		let courseId = wx.getStorageSync('courseId')
		wx.setStorageSync('paperName', paperName)
		if(type === 1){
			let id = e.currentTarget.dataset.chapter
			wx.navigateTo({
				url: '../sectionTopic/topic?courseId='+ courseId + '&chapterId=' + id
			})
		}else if(type === 2){
			let paperId = e.currentTarget.dataset.real
			wx.navigateTo({
				url: '../realTopic/topic?courseId=' + courseId + '&paperId=' + paperId 
			})
			// + '&totalTime=' + this.data.obj.totaltime
		}else if(type === 3){
			wx.navigateTo({
				url: '../speedTopic/topic?examCourseId=' + courseId
			})
		}
	},
  onReachBottom:function() {
    this.loadMore();
	},
	//加载更多
  loadMore() {
    if(this.data.pageNum < Math.ceil(parseInt(this.data.total)/parseInt(this.data.pageSize))){
      this.setData({
        showLoading:true,
        pageNum:this.data.pageNum + 1
      },() => {
        this.getRecords();
      });
    }else{
      wx.showToast({
        title: '没有更多数据了',
        icon:'none',
        duration: 1000
      })
    }
  },
	onClickLeft() {
		wx.navigateBack({
			delta:1
		})
	}
})
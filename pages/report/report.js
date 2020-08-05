var wxCharts = require('../../utils/wxcharts.js');

 let chartData= {
        title: '得分记录',
				data: [15, 20, 45, 37,30],
        categories: ['5月6号', '5月7号', '5月8号', '5月9号', '5月9号']
		},
		columnChart = null
Page({
	data: {
		checked:true,
		from:'',//章节、历年、速练
		report:{},
		circle:0,
		cards: []
	},
	onReady: function (e) {
		var windowWidth = 320;
		try {
			var res = wx.getSystemInfoSync();
			windowWidth = res.windowWidth;
		} catch (e) {
			console.error('getSystemInfoSync failed!');
		}

		columnChart = new wxCharts({
				canvasId: 'columnCanvas',
				type: 'column',
				animation: true,
				right:'10%',
				categories: chartData.categories,
				legend:{
					show:false
				},
				series: [{
					type: 'bar',
						name: chartData.title,
						data: chartData.data,
						format: function (val, name) {
								return val + '分';
						},
						color:'#FF7944',
            barCategoryGap: '20%',
				}],
				yAxis: {
						type:'value',
						max : 160,
            min : 0,
				},
				xAxis: {
						disableGrid: false,
						type: 'calibration'
				},
				extra: {
						column: {
								width: 20
						}
				},
				width: windowWidth-50,
				height: 200,
		});
},
	onLoad: function (options) {
		this.setData({
			from:options.from,
			report:JSON.parse(options.report),
			time:this.dealTime(JSON.parse(options.report).durationTime),
			circle:JSON.parse(options.report).havePointsScore/JSON.parse(options.report).havePointsTotalScore
		})
		
		for(let i=0;i<JSON.parse(options.report).userExamTitleRecordEntityList.length;i++){
			let cards = this.data.cards
			cards.push(JSON.parse(options.report).userExamTitleRecordEntityList[i].serialNumber)
			this.setData({
				cards:cards
			})
		}
		wx.setStorageSync('from', options.from)
	},
	dealTime(time){
		let second = 0;
		let minute = 0;
		let hour = 0;
		if(time > 60){
			minute = parseInt(time/60); 
			second =  parseInt((time)%60); 
			return minute + "'" + Math.ceil(second)
		}else{
			return "0'" + Math.ceil(time) + "''"
		}
	},
	//答题卡缓存
	setCardStorage() {
		wx.setStorageSync('cards', this.data.cards)
	},
	onChange(e){
		console.log(e)
	},
	//单题目解析
	analysis(e){
		let serialNumber = e.currentTarget.dataset.number
		let length = this.data.report.userExamTitleRecordEntityList.length
		let index = e.currentTarget.dataset.index + 1
		this.setCardStorage()
		if(this.data.from === 'real'){
			wx.navigateTo({
				url: '../sectionAnalysis/analysis?serialNumber=' + index + '&type=1' + '&length=' + length
			})
		}else{
			wx.navigateTo({
				url: '../sectionAnalysis/analysis?serialNumber=' + serialNumber + '&type=1' + '&length=' + length
			})
		}
	},
	//错题解析
	errAnalysis(){
		let errArr = []
		let data = this.data.report.userExamTitleRecordEntityList
		let length = this.data.report.userExamTitleRecordEntityList.length
		this.setCardStorage()
		for(let i=0;i<data.length;i++){
			if(data[i].answerResult === 2 || data[i].answerResult === 0){
				errArr.push(data[i].serialNumber)
			}
		}
		if(errArr.length > 0){
			wx.navigateTo({
				url: '../sectionAnalysis/analysis?errArr=' + JSON.stringify(errArr) + '&type=2' + '&length=' + length
			})
		}else{
			wx.showToast({
				title: '本次做题没有错题，继续加油！',
				icon:'none'
			})
		}
	},
	//全部解析
	allAnalysis(){
		let length = this.data.report.userExamTitleRecordEntityList.length
		this.setCardStorage()
		wx.navigateTo({
			url: '../sectionAnalysis/analysis?serialNumber=1&type=1' + '&length=' + length
		})
	},
	onClickLeft() {
		if(this.data.from === 'real'){
			wx.reLaunch({
				url: '../pep/pep',
			})
		}else{
			wx.switchTab({
				url: '../tiku/tiku',
			})
		}
	}
})
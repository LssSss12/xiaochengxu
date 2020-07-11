var wxCharts = require('../../utils/wxcharts.js');
 let chartData= {
        title: '得分',
				data: [15, 20, 45, 37,30],
        categories: ['5月6号', '5月7号', '5月8号', '5月9号', '5月9号']
		},
		columnChart = null
Page({
	data: {
		checked:true,
		report:{}
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
						name: '得分记录',
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
				width: windowWidth,
				height: 200,
		});
},
	onLoad: function (options) {
		this.setData({
			report:JSON.parse(options.report)
		})
	},
	onChange(e){
		console.log(e)

	},
	onClickLeft() {
		wx.switchTab({
			url: '../tiku/tiku',
		})
	}
})
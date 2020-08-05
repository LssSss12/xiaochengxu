let course1=   {
	"publicList": [
		{
			"id": 1,
			"examType": "一级建造师",
			"icon":'../../images/examdetailicon1.png',
			"courseFullName": "工程经济"
		},
		{
			"id": 2,
			"examType": "一级建造师",
			"icon":'../../images/examdetailicon2.png',
			"courseFullName": "项目管理"
		},
		{
			"id": 3,
			"examType": "一级建造师",
			"icon":'../../images/examdetailicon3.png',
			"courseFullName": "法规及相关"
		}
	],
	"majorList": [
		{
			"id": 4,
			"examType": "一级建造师",
			"icon":'../../images/examdetailicon4.png',
			"courseFullName": "建筑工程"
		},
		{
			"id": 5,
			"examType": "一级建造师",
			"icon":'../../images/examdetailicon5.png',
			"courseFullName": "机电工程"
		},
		{
			"id": 6,
			"examType": "一级建造师",
			"icon":'../../images/examdetailicon6.png',
			"courseFullName": "市政工程"
		},
		{
			"id": 8,
			"examType": "一级建造师",
			"icon":'../../images/examdetailicon7.png',
			"courseFullName": "公路工程"
		},
		{
			"id": 9,
			"examType": "一级建造师",
			"icon":'../../images/examdetailicon9.png',
			"courseFullName": "水利水电"
		}
	]
}
let course2=  {
	"publicList": [
		{
			"id": 7,
			"examType": "二级建造师",
			"icon":'../../images/examdetailicon3.png',
			"courseFullName": "施工管理"
		},
		{
			"id": 10,
			"examType": "二级建造师",
			"icon":'../../images/examdetailicon2.png',
			"courseFullName": "法规及相关"
		}
	],
	"majorList": [
		{
			"id": 11,
			"examType": "二级建造师",
			"icon":'../../images/examdetailicon4.png',
			"courseFullName": "建筑工程"
		},
		{
			"id": 12,
			"examType": "二级建造师",
			"icon":'../../images/examdetailicon5.png',
			"courseFullName": "机电工程"
		},
		{
			"id": 13,
			"examType": "二级建造师",
			"icon":'../../images/examdetailicon6.png',
			"courseFullName": "市政工程"
		},
		{
			"id": 14,
			"examType": "二级建造师",
			"icon":'../../images/examdetailicon7.png',
			"courseFullName": "公路工程"
		},
		{
			"id": 15,
			"examType": "二级建造师",
			"icon":'../../images/examdetailicon9.png',
			"courseFullName": "水利水电"
		}
	]
}
let course3 = {
	"publicList": [
		{
			"id": 18,
			"examType": "一级消防工程师",
			"icon":'../../images/examdetailicon1.png',
			"courseFullName": "技术实务"
		},
		{
			"id": 19,
			"examType": "一级消防工程师",
			"icon":'../../images/examdetailicon11.png',
			"courseFullName": "综合能力"
		},
		{
			"id": 20,
			"examType": "一级消防工程师",
			"icon":'../../images/examdetailicon12.png',
			"courseFullName": "案例分析"
		}
	],
	"majorList": []
}

const getCourse = function(type){
	if(type === "一级建造师"){
		return course1
	}else if(type === "二级建造师"){
		return course2
	}else if(type === "一级消防工程师"){
		return course3
	}
}

module.exports = {
  getCourse: getCourse
}
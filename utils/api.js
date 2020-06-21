const wxRequest = require('/wxRequest.js');

//获取openID
let getWeixinOpenId = (param) => wxRequest.post('/user-service/otherservice/getWeixinOpenId',param);
//获取UnionId
let getWeixinUnionId = (param) => wxRequest.post('/user-service/otherservice/getWeixinUnionId',param);
//用户通过三方登录
let loginByOtherApp = (param) => wxRequest.post('/user-service/otherservice/loginByOtherApp',param);
//获取考试类型列表
let getExamTypeInfoList = (param) => wxRequest.post('/user-service/user/getExamTypeInfoList',param);
//根据考试类型名字获取科目列表
let getExamCourseListForName = (param) => wxRequest.post('/user-service/user/getExamCourseListForName',param);
//用户预选科目
let preselectionCourse = (param) => wxRequest.post('/user-service/user/preselectionCourse',param);
module.exports = {
	getWeixinOpenId,
	getWeixinUnionId,
	loginByOtherApp,
	getExamTypeInfoList,
	getExamCourseListForName,
	preselectionCourse
}
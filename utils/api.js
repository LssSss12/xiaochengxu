const wxRequest = require('/wxRequest.js');

//获取openID
let getWeixinOpenId = (param) => wxRequest.post('/user-service/otherservice/getWeixinOpenId',param,false);
//获取UnionId
let getWeixinUnionId = (param) => wxRequest.post('/user-service/otherservice/getWeixinUnionId',param,false);
//用户通过三方登录
let loginByOtherApp = (param) => wxRequest.post('/user-service/otherservice/loginByOtherApp',param,false);
//获取考试类型列表
let getExamTypeInfoList = (param) => wxRequest.post('/user-service/user/getExamTypeInfoList',param);
//根据考试类型名字获取科目列表
let getExamCourseListForName = (param) => wxRequest.post('/user-service/user/getExamCourseListForName',param);
//用户预选科目
let preselectionCourse = (param) => wxRequest.post('/user-service/user/preselectionCourse',param);
//获取用户所选科目列表
let getUserExamCourseInfo = (param) => wxRequest.post('/user-service/user/getUserExamCourseInfo',param);
//初始化用户首页
let getUserQuestionBank = (param) => wxRequest.post('/user-service/user/getUserQuestionBank',param);
//获取题目答案
let getQuestionsAnalysis = (param) => wxRequest.post('/user-service/user/getQuestionsAnalysis',param);
//获取用户每日一题
let getUserDailyOneTitle = (param) => wxRequest.post('/user-service/user/getUserDailyOneTitle',param);
//提交用户每日一题答案
let usersubmitDailyOneTitleAnswer = (param) => wxRequest.post('/user-service/user/usersubmitDailyOneTitleAnswer',param);
//获取用户历年真题列表
let getUserPreviousExamPapers = (param) => wxRequest.post('/user-service/user/getUserPreviousExamPapers',param);
///初始化真题考试题相关(真题-开始答题)
let iniPastExamPages = (param) => wxRequest.post('/user-service/user/iniPastExamPages',param);
//获取真题考试题列表
let getPastExamTitles = (param) => wxRequest.post('/user-service/user/getPastExamTitles',param);
//提交答案、修改答案
let userAnswerQuestion = (param) => wxRequest.post('/user-service/user/userAnswerQuestion',param);
//挑战到答题卡任意题, 下一题
let userSkipQuestionTitle = (param) => wxRequest.post('/user-service/user/userSkipQuestionTitle',param);
//试卷做题记录详情
let userQuestionTitleRecordDetails = (param) => wxRequest.post('/user-service/user/userQuestionTitleRecordDetails',param);
////用户提交考卷
let userSubmitAnswerSheet = (param) => wxRequest.post('/user-service/user/userSubmitAnswerSheet',param);
//用户收藏题目
let userCollectTitle = (param) => wxRequest.post('/user-service/user/userCollectTitle',param);
//删除用户收藏列表题目
let deleteUserCollectTitle = (param) => wxRequest.post('/user-service/user/deleteUserCollectTitle',param);
//查看用户收藏科目列表
let getuserCollectTitleList = (param) => wxRequest.post('/user-service/user/getuserCollectTitleList',
param);
//查看用户章节目真题列表
let getUserChapterExamList = (param) => wxRequest.post('/user-service/user/getUserChapterExamList',
param);
//获取错题集列表
let userErrorTitleList = (param) => wxRequest.post('/user-service/user/userErrorTitleList',
param);
module.exports = {
	getWeixinOpenId,
	getWeixinUnionId,
	loginByOtherApp,
	getExamTypeInfoList,
	getExamCourseListForName,
	preselectionCourse,
	getUserExamCourseInfo,
	getUserQuestionBank,
	getQuestionsAnalysis,
	usersubmitDailyOneTitleAnswer,
	getUserDailyOneTitle,
	getUserPreviousExamPapers,
	iniPastExamPages,
	getPastExamTitles,
	userAnswerQuestion,
	userSkipQuestionTitle,
	userCollectTitle,
	userQuestionTitleRecordDetails,
	getuserCollectTitleList,
	deleteUserCollectTitle,
	userSubmitAnswerSheet,
	getUserChapterExamList,
	userErrorTitleList
}
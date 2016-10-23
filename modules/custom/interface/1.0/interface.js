// 所有模块都通过 define 来定义
define(function(require, exports, module) {
	//step1: 获取登录缓存
	var session_user = JSON.parse(localStorage.getItem('user'));
	var key = {
		mobile: session_user.mobile,
		api_token: session_user.api_token
	}

	var interface = {};
	interface.getToken = function(para, success, error) {
		ajax_general({
			action: 'login'
		}, Object.assign(key,para), success, error);
	}

	//图片地址获取
//	interface.imgToQiniu = function () {
//		template.helper('$imgToQiniu',function(){
//			ajax_general({
//				action: 'upQiniuToken',
//				type:'GET'
//			},key, function(res){
//				return res.host;
//			},function(error){
//				console.log(error);
//			});
//		})
//	}

	/**
	 * 首页 index
	 */

	//banner
	interface.getIndexBannerList = function(para, success, error) {
		ajax_general({
			action: 'getIndexBannerList'
		}, Object.assign(key,para), success, error);
	}

	//优店推荐
	interface.mallUShopList = function(success, error) {
		ajax_general({
			action: 'mallUShopList'
		},key, success, error);
	}

	//热销商品
	interface.mallProductList = function(success, error) {
		ajax_general({
			action: 'mallProductList'
		},key, success, error);
	}

	/**
	 * 分类 classify.html
	 */
	interface.mallCategoryList = function (success, error) {
		ajax_general({
			action: 'mallCategoryList'
		},key, success, error);
	}

	/**
	 * 店铺版块
	 */

	//店铺首页 shop_index.html
	interface.mallBusinessProductList = function (para,success, error) {
		ajax_general({
			action: 'mallBusinessProductList'
		},Object.assign(key,para), success, error);
	}

	//店铺简介 shop_profile.html
	interface.mallBusinessInfo = function(para,success, error){
		ajax_general({
			action: 'mallBusinessInfo'
		},Object.assign(key,para), success, error);
	}

	//店铺列表 shop_list.html
	interface.mallBusinessList = function(para,success, error){
		ajax_general({
			action: 'mallBusinessList'
		},Object.assign(key,para), success, error);
	}

	module.exports = interface;
})
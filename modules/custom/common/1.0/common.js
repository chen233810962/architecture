// 所有模块都通过 define 来定义
define(function(require, exports, module) {
	var common = {};
	common._init = function(){
		//step1：判断从app过来，sessionStorage
		//index.html?mobile=13779944602&api_token=50874301a15a8fcb9abd5cb8c8db120e
		// console.log(request("api_token"))
		var that = this;
		var session_user = localStorage.getItem('user');
		if(session_user){
		    if(that.request("mobile") && that.request("api_token") && session_user.mobile != that.request("mobile")){
		        localStorage.removeItem('user');
		        localStorage.setItem('user',JSON.stringify({'mobile':that.request("mobile"),'api_token':that.request("api_token")}))
		    }
		}else{
		  session_user = localStorage.setItem('user',JSON.stringify({'mobile':that.request("mobile"),'api_token':that.request("api_token")}))
		}

	    //加载公共头部和底部
//	    $('#header').load('header.html');
//	    $('#footer').load('footer.html');

	}

	//获取参数
	common.request = function(paras) {
		var url = location.search;
		var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
		var paraObj = {}
		for(i = 0; j = paraString[i]; i++) {
			paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
		}
		var returnValue = paraObj[paras.toLowerCase()];
		if(typeof(returnValue) == "undefined") {
			return "";
		} else {
			return returnValue;
		}

	}

	// 点击切换插件
	common.sw = function(tl, ct) {
		//tl：标题
		//ct：内容
		tl.first().addClass("on");
		ct.first().show();

		tl.click(function() {
			var a = $(this).index()
			if(ct.eq(a).css("display") != "block") {
				ct.hide(),
					ct.eq(a).show(),
					tl.removeClass("on"),
					$(this).addClass("on");
			};
		})
	}
	common._init();
	module.exports = common;
})
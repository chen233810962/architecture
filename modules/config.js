
// 接口地址
var api_url = "http://test.jwxba.com/index.php?m=API&c=User&api_ret=jsonp&a=";
var action = window.location.href.replace(/(.*\/)*([^.]+).*/ig,"$2");
var module = 'template';
require.config({
	baseUrl: "../",
	paths:{
		//入口文件
		"index": "modules/controller/" + action,

		 //外部插件分装
        "jquery": "plugin/jquery/1.9.1/jquery.min",
        "swiper": "plugin/swiper/3.3.1/swiper.min",
        "template": "plugin/template/1.0/template",
        "dropload": "plugin/dropload/1.0/dropload",

        //独立分装
        "ajax": "modules/custom/interface/1.0/ajax_jsonp",   //
        "common": "modules/custom/common/1.0/common",  //独立封装一些工具函数
        "interface": "modules/custom/interface/1.0/interface", //相关接口
        "pageClass":"modules/custom/libs/pageClass",//分页类
	},
    shim : {
        'index': ['jquery','ajax','common','interface']
    }

});

require(['index']);
define(function(require) {
	var interface = require('interface');
	var vue = require('vue');
//	var page = require('pageClass');

	var list = {
		arry : [
			{name:'shun'},
			{name:'shun1'},
			{name:'shun2'}
		],
		num:0
	};
	new vue({
		el:"#shun",
		data:list,
		methods:{
			mode:function(data){
				data++;
				console.log(data);
				var d = dialog({
					title: '消息',
					content: '风吹起的青色衣衫，夕阳里的温暖容颜，你比以前更加美丽，像盛开的花<br>——许巍《难忘的一天》',
					okValue: '确 定',
					ok: function () {
						this.title('提交中..');
						return false;
					},
					cancelValue: '取消',
					cancel: function () {
						d.close().remove();
					}
				});

			d.showModal();
			}
		}
	});
//	page.Mobile();
});
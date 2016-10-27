define([module],function(template) {
	var list = {name:'shun'};
	var tpl = template('t:crs',{
		list:list
	})
	$("#shun ul").html(tpl);
	page.Mobile();
});
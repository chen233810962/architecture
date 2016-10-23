define(function(require, exports, module) {
	require('dropload');
	var page = {}

	/* className class名称
	 * counter 当前页数
	 * num	每页显示条数
	 */
	page.Mobile = function(className,counter,num,url){
	    $('.' + className).dropload({	//开始的class
	        scrollArea : window,
	        loadDownFn : function(me){
	            $.ajax({
	                type: 'post',
	                contentType: 'application/json',
	                dataType : 'jsonp',
	                url : api_url + url,
	                xhrFields: {
			            withCredentials: true
			        },
	                data: JSON.stringify({
	            		'page':counter,  //当前页数
	            		'pageSize':num,	//每页条数
	        			}),
	                success: function(data){
	                	console.log(data.totalPages);//总页数
	                    var result = '';
	                    for(var i = 0; i < data.content.length; i++){
	                        result +=   '<li>'+ data.content[i].id +'</li>';

	                    }
	                    setTimeout(function(){
	                        $('.' + className + 'ul').append(result); //加入到ul元素中
	                        // 每次数据加载完，必须重置
	                        me.resetload();
	                    }/*,1000*/);

	                    if((counter) >= data.totalPages){
	                        // 锁定
	                        me.lock();
	                        // 无数据
	                        me.noData();
							if(data.content.length != 0){
		                        $(".dropload-down").hide();
		                    }
	                    }
	                    // 为了测试，延迟1秒加载
	                    counter++;
	                },
	                error: function(xhr, type){
	                	alert("Ajax error!");
	                    // 即使加载出错，也得重置
	                    me.resetload();
	                }
	            });
	        }
	    });
	}
	module.exports = page;
})
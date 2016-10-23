
// 封装ajax jsonp处理，处理完后全部都是GET方式返回
function ajax(url,para,success,error){
    $.ajax({
        type : para.type ? para.type : 'GET',
        url : url,
        contentType:'application/json',
        dataType : para.dataType || 'jsonp',
        async : para.async,
        data : para.data,
        
        beforeSend: function (xhr) {
//          xhr.setRequestHeader("Content-Type", "application/jsonp");
        },
        success : function(res) {
            if(success)
                success(res);
        },
        error:function(request){
            var res = request.responseText;
            if(typeof(res) == 'string'){
                res = JSON.parse(request.responseText);
            }
            if(isIE9()){
                return;
            }
            if(res.code == 5) {
                //_DEL_DATA('user');
            }
            if(res.code == 206||res.code == 207){
                parent.parent.$('pupop').hide();
                parent.parent.showAlert(res.exception);
            }
            if(error)
                error(res);
        }
    });
}

// 加入是否登录
function ajax_general(option,para,success,error){
      if(option.cache){
          var data = _GET_DATA(action + option.specialdata);
          if(data){
              success(data);
              return;
          }
      }

      if(option.async == undefined){
          option.async = true;
      }
      option.type = option.type ? option.type : 'POST'  ;
      var url =  api_url + option.action;
      option.data = para;
      ajax(url,option,function(res){
          if(option.cache){
              //_SET_DATA(action + para.specialdata,res,option.cache);
          }
          success(res);
      },error);
  }




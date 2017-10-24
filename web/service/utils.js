angular.module('app')
.factory('utils',['$ionicPopup',function($ionicPopup){
var u={
	tips:{
		showTips:function(msg,scope){

	var tips=$ionicPopup.show({

			template:'<div style="text-align:center">'+msg+'</div>',
			title:'提示消息',
			scope:scope,
			buttons:[
			{
				text:'确认',
				type:'button-assertive',
				onTap:function(){
                 tips.close();
				}
			}]

		});
	}
	},
	
//验证表单模块

validForm:{

isNotEmpty:function(msg){

return msg==''||msg==undefined ? false : true;

},
isEmail:function(email){
	var  reg=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
	return reg.test(email);
},
//验证手机号码
isPhone:function(phone)
{
	var reg=/^1[358]\d{9}$/;
	return reg.test(phone);
},
//验证长度
isLength:function(msg,min,max){
return msg.length >=min&&msg.length<=max ? true :false;
},


isNotOnlyW:function(msg)
{
	
	return /\W/.test(msg);

},
//验证密码相等
isEqual:function(a,b){
	return a===b ? true :false;
}


}

};
return u;
}])
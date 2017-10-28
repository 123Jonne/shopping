angular.module('app')
	.controller('shopcartController', ['$scope', '$timeout', '$stateParams', 'utils', 'API', function ($scope, $timeout, $stateParams, utils, API) {

$scope.count=1;
utils.tips.showLoadTips();
API.fetchGet('/main/shopcart/1804045852@qq.com',{email:'1804045852@qq.com'})
.then(function(data){
	$scope.data=data.data;
console.log('data',data);
utils.tips.hideLoadTips();
})
.catch(function(err){
	console.log('err');
	utils.tips.hideLoadTips();
})
$scope.addShopCart=function(){
	
}

}])
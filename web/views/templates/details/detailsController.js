angular.module('app')
	.controller('detailsController', ['$scope', '$timeout', '$stateParams', 'utils', 'API', function ($scope, $timeout, $stateParams, utils, API) {

$scope.count=1;
utils.tips.showLoadTips();
API.fetchGet('/details/'+$stateParams.id,$stateParams)
.then(function(data){
	$scope.data=data.data;
console.log('data');
utils.tips.hideLoadTips();
})
.catch(function(err){
	console.log('err');
	utils.tips.hideLoadTips();
})
$scope.addShopCart=function(){
	
}

}])
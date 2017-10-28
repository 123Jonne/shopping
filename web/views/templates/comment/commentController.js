

 angular.module('app')
	.controller('commentController', ['$scope', '$timeout', '$stateParams', 'utils', 
		'API', function ($scope, $timeout, $stateParams, utils, API) {



utils.tips.showLoadTips();
API.fetchGet('/comment/'+$stateParams.id,$stateParams)
.then(function(data){
	$scope.data=data.data;
console.log('data');
utils.tips.hideLoadTips();
})
.catch(function(err){
	console.log('err');
	utils.tips.hideLoadTips();
})

}])
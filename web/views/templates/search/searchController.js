

 angular.module('app')
	.controller('searchController', ['$scope',  '$stateParams', 'utils', 
		'API', function ($scope, $stateParams, utils, API) {
$scope.searchWord='';
$scope.isHas=false

$scope.search = function () {
			utils.tips.showLoadTips();
			API.fetchGet('/search/' + $scope.searchWord, {
				word: $scope.searchWord
			})
			.then(function (data) {
				console.log(data);
				$scope.data=data.data;
				if ($scope.data.length===0) {
					$scope.isHas=true;
				}else{
					$scope.isHas=false;
				}
				
				utils.tips.hideLoadTips();
			})
			.catch(function (err) {
				console.log(err);
				utils.tips.hideLoadTips();
			})
		}







}])
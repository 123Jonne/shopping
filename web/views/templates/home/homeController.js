angular.module('app')
	.controller('homeController', ['$rootScope','$scope', 'API', 'utils','$state', function ($rootScope,$scope, API, utils,$state) {
        console.log($rootScope.user);
		utils.tips.showLoadTips();
		API.fetchGet('/main/home')
			.then(function (data) {
				console.log('data ==> ', data);
				$scope.data = data.data;
				utils.tips.hideLoadTips();
			})
			.catch(function (err) {
				console.log(err);
				utils.tips.hideLoadTips();
			})

			$scope.getFocus = function (stateName) {
			$state.go(stateName)
		}


	}])
angular.module('app')
	.controller('rootController', ['$rootScope', '$state', function ($rootScope, $state) {

		$rootScope.user = {
			uid: 7,
			nickname: 'LMJA',
			email: '1804045852@qq.com'
		};

		$rootScope.goPage = function (stateName, params) {
			$state.go(stateName, params);
		}

		$rootScope.goBack = function () {
			history.go(-1);
		}
		
	}])
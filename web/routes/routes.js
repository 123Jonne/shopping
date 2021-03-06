angular.module('app')
	.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

		$urlRouterProvider.otherwise('/login');

		$stateProvider
			.state('main', {
				url: '',
				abstruct: true,
				templateUrl: '/templates/main/main.html'
			})
			.state('main.home', {
				url: '/main/home',
				templateUrl: '/templates/home/home.html',
				controller: 'homeController',
				resolve: {
					des: ['$ocLazyLoad', function ($ocLazyLoad) {
						return $ocLazyLoad.load('main.home');
					}]
				}
			})
			.state('main.find', {
				url: '/main/find',
				templateUrl: '/templates/find/find.html'
			})
			.state('main.shopcart', {
				url: '/main/shopcart',
				templateUrl: '/templates/shopcart/shopcart.html',
				controller: 'shopcartController',
				cache: false,
				resolve: {
					des: ['$ocLazyLoad', function ($ocLazyLoad) {
						return $ocLazyLoad.load('main.shopcart');
					}]
				}
			})
			.state('main.my', {
				url: '/main/my',
				templateUrl: '/templates/my/my.html',
				controller: 'myController',
				cache: false,
				resolve: {
					des: ['$ocLazyLoad', function ($ocLazyLoad) {
						return $ocLazyLoad.load('main.my');
					}]
				}
			})
			.state('register', {
				url: '/register',
				templateUrl: '/templates/register/register.html',
				cache: false,
				controller: 'registerController',
				resolve: {
					des: ['$ocLazyLoad', function ($ocLazyLoad) {
						return $ocLazyLoad.load('register');
					}]
				}
			})
			.state('login', {
				url: '/login',
				templateUrl: '/templates/login/login.html',
				cache: false,
				controller: 'loginController',
				resolve: {
					des: ['$ocLazyLoad', function ($ocLazyLoad) {
						return $ocLazyLoad.load('login');
					}]
				}
			})
			.state('details', {
				url: '/details/:id',
				templateUrl: '/templates/details/details.html',
				controller: 'detailsController',
				resolve: {
					des: ['$ocLazyLoad', function ($ocLazyLoad) {
						return $ocLazyLoad.load('details');
					}]
				}
			})
			.state('comment', {
				url: '/comment/:id',
				templateUrl: '/templates/comment/comment.html',
				controller: 'commentController',
				resolve: {
					des: ['$ocLazyLoad', function ($ocLazyLoad) {
						return $ocLazyLoad.load('comment');
					}]
				}
			})
			.state('settle', {
				url: '/settle/:id',
				templateUrl: '/templates/settle/settle.html',
				controller: 'settleController',
				resolve: {
					des: ['$ocLazyLoad', function ($ocLazyLoad) {
						return $ocLazyLoad.load('settle');
					}]
				}
			})
			.state('myorder', {
				url: '/myorder',
				templateUrl: '/templates/myorder/myorder.html',
				controller: 'myorderController',
				resolve: {
					des: ['$ocLazyLoad', function ($ocLazyLoad) {
						return $ocLazyLoad.load('myorder');
					}]
				}
			})
			.state('search', {
				url: '/search',
				templateUrl: '/templates/search/search.html',
				controller: 'searchController',
				resolve: {
					des: ['$ocLazyLoad', function ($ocLazyLoad) {
						return $ocLazyLoad.load('search');
					}]
				}
			})
			.state('modifypwd', {
				url: '/modifypwd',
				templateUrl: '/templates/modifypwd/modifypwd.html',
				controller: 'modifypwdController',
				resolve: {
					des: ['$ocLazyLoad', function ($ocLazyLoad) {
						return $ocLazyLoad.load('modifypwd');
					}]
				}
			})




			$locationProvider.html5Mode(true);


	}])
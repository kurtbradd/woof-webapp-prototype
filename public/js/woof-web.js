var dependencies = ['ngRoute',
					'ngAnimate',
					'ui.bootstrap',
					'underscore',
					'woof-web.controllers', 
					'woof-web.directives',
					'woof-web.factories']

var app = angular.module('woof-web', dependencies)

app.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl:'./views/landingpage.html',
				controller:'LandingPageCtrl'
			})
			.otherwise({
				redirectTo:'/'
			});
		$locationProvider.html5Mode(true);
}]);

var underscore = angular.module('underscore', []);
	underscore.factory('_', function() {
		return window._; // assumes underscore has already been loaded on the page
});
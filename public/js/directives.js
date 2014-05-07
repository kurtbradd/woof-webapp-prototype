var module = angular.module('woof-web.directives', []);

module.directive('questionListSelect', function(){
	 return {
        restrict: 'E',
        replace:true,
        scope: { 
        	obj: '='
        },
        templateUrl:'/views/directives/list-select.html'
    };
});

module.directive('questionMultiSelect', function(){
	 return {
        restrict: 'E',
        replace:true,
        scope: { 
        	obj: '=' 
        },
        templateUrl:'/views/directives/multi-select.html'
    };
});

module.directive('questionTextInput', function(){
	 return {
        restrict: 'E',
        replace:true,
        scope: { 
        	obj: '=' 
        },
        templateUrl:'/views/directives/text-input.html'
    };
});
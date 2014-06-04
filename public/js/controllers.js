var module = angular.module('woof-web.controllers', ['ngAnimate']);

module.controller('LandingPageCtrl', ['$scope', '$modal', 'ServerSubmit', 'SurveyQuestions',
	function($scope, $modal, ServerSubmit, SurveyQuestions) {
		$scope.questions = SurveyQuestions;
		
		$scope.step = 0;
		$scope.steps = [
		'welcome', 'past_dog', 'activities', 'dog_size', 'daily_walks',
		'training_time', 'grooming', 'time_alone', 'yard_size',
		'gender', 'kids', 'purchase_price', 'monthly_budget', 'email', 'thanks'];

		//index of answer in question options
		$scope.saveAnswer = function (question, $index) {
			answer = SurveyQuestions[question].options[$index].title;
			SurveyQuestions[question].answer = answer;
			this.handleNext();
		}

		$scope.getCurrentQuestion = function () {
			return SurveyQuestions[this.getCurrentStep()];
		}

		$scope.columnClassForLength = function (length) {
			switch(length){
				case 3:
					return 'col-xs-4';
				case 4:
					return 'col-xs-3';
				case 6:
					return 'col-xs-2';
			}
		};
		var url = '//twitter.com/intent/tweet?text=I%27m%20excited%20to%20get%20my%20new%20dog%20from%20Woof!&url=http%3A%2F%2Fwww.wooflabs.com&via=MyDogWoofs';
		$scope.shareOnTwitter = function() {
			console.log('called');
  	};

		$scope.percentComplete = function () {
			return "width: " + (($scope.step-1)/12.0)*100 + "%;";
		};
		
		$scope.getCurrentStep = function() {
			return $scope.steps[$scope.step];
		};
		
		$scope.isFirstStep = function() {
			return $scope.step === 0;
		};

		$scope.cancel = function () {
			$scope.step = 0;
		}

		$scope.isLastStep = function() {
			return $scope.step === ($scope.steps.length - 1);
		};

		$scope.handlePrevious = function() {
			$scope.step -= ($scope.isFirstStep()) ? 0 : 1;
		};

		$scope.handleNext = function() {
			$scope.step += 1;
		};
		
		$scope.submit = function () {
			if (SurveyQuestions.email.answer.length > 0) {
				ServerSubmit.submit()
				.success(function(data, status, headers, config) {
					console.log('server success');
					$scope.step += 1;
					console.log(data);
				})
				.error(function(data, status, headers, config) {
					console.log(data);
				});
			}
		}
}]);
var module = angular.module('woof-web.controllers', ['ngAnimate']);

module.controller('LandingPageCtrl', ['$scope', '$modal', 'ServerSubmit', 'SurveyQuestions',
	function($scope, $modal, ServerSubmit, SurveyQuestions) {
		$scope.questions = SurveyQuestions;
		
		$scope.step = 0;
		$scope.steps = [
		'welcome', 'past_dog', 'activities', 'dog_size', 'daily_walks',
		'training_time', 'grooming', 'time_alone', 'yard_size',
		'gender', 'kids', 'purchase_price', 'monthly_budget', 'email'];

		//index of answer in question options
		$scope.saveAnswer = function (question, $index) {
			answer = SurveyQuestions[question].options[$index].title;
			SurveyQuestions[question].answer = answer;
			//console.log(SurveyQuestions[question]);
			this.handleNext();
		}

		$scope.getCurrentQuestion = function () {
			return SurveyQuestions[this.getCurrentStep()];
		}

		$scope.columnClassForLength = function (length) {
			switch(length){
				case 3:
					return 'col-md-4';
				case 4:
					return 'col-md-3';
				case 5:
					return 'icon-column';
			}
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

		$scope.getNextLabel = function() {
			return ($scope.isLastStep()) ? 'Submit' : 'Next'; 
		};

		$scope.handlePrevious = function() {
			$scope.step -= ($scope.isFirstStep()) ? 0 : 1;
		};

		$scope.handleNext = function() {
			if($scope.isLastStep()) {
				this.submit();
			} else {
				$scope.step += 1;
			}
		};
		
		$scope.submit = function () {
			ServerSubmit.submit();
			.success(function(data, status, headers, config) {
				console.log(data);
			})
			.error(function(data, status, headers, config) {
				console.log(data);
			});
		}
}]);
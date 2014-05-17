var module = angular.module('woof-web.controllers', ['ngAnimate']);

module.controller('LandingPageCtrl', ['$scope', '$modal', 'ServerSubmit', 'SurveyQuestions',
	function($scope, $modal, ServerSubmit, SurveyQuestions) {
		$scope.questions = SurveyQuestions;
		
		$scope.step = 0;
		$scope.steps = [
		'welcome', 'past_dog', 'activities', 'dog_size', 'daily_walks',
		'training_time', 'grooming', 'time_alone', 'yard_size',
		'gender', 'kids', 'purchase_price', 'monthly_budget', 'email'];

		$scope.formComplete = false;

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
					return 'col-xs-4';
				case 4:
					return 'col-xs-3';
				case 5:
					return 'icon-column';
			}
		};

		$scope.percentComplete = function () {
			return "width: " + (($scope.step-1)/12.0)*100 + "%;";
		};

		// $scope.percentComplete = "width: " + $scope.step/12 + "%;";
		
		$scope.getCurrentStep = function() {
			return $scope.steps[$scope.step];
		};
		
		$scope.isFirstStep = function() {
			return $scope.step === 0;
		};

		$scope.cancel = function () {
			$scope.formComplete = false;
			$scope.step = 0;
		}

		$scope.isLastStep = function() {
			return $scope.step === ($scope.steps.length - 1);
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
			// if (!$scope.formComplete) {
				ServerSubmit.submit()
				.success(function(data, status, headers, config) {
					$scope.formComplete = true;
					console.log(data);
				})
				.error(function(data, status, headers, config) {
					console.log(data);
				});
			// }
		}
}]);
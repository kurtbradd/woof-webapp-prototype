var module = angular.module('woof-web.factories', []);

module.factory('SurveyQuestions', ['$http', function($http){
	return {
		past_dog : {
			title: 'Have you had a dog before?',
			answer: {},
			options:[{
				type:'TextBox',
				title:'Yes!',
				sub_title:"I've owned one before"
			},{
				type:'TextBox',
				title:'Yes!',
				sub_title:"I grew up with family dogs"
			},{
				type:'TextBox',
				title:'Not yet',
				sub_title:"I am so excited to get one!"
			}]
		},
		activities : {
			title: 'What activities are you most excited for?',
			answer: {},
			options:[{
				type:'IconBox',
				icon_name:'companion',
				title:'Companion'
			},{
				type:'IconBox',
				icon_name:'couch',
				title:'Couch Buddy'
			},{
				type:'IconBox',
				icon_name:'run',
				title:'Run / Hikes'
			},{
				type:'IconBox',
				icon_name:'trophy',
				title:'Competing'
			}]
		},
		dog_size : {
			title: 'What dog size would you prefer?',
			answer: {},
			options:[{
				type:'TextBox',
				title:'Toy',
				sub_title:"5 - 15lbs"
			},{
				type:'TextBox',
				title:'Small',
				sub_title:"15-30lbs"
			},{
				type:'TextBox',
				title:'Medium',
				sub_title:"30-50lbs"
			},{
				type:'TextBox',
				title:'Large',
				sub_title:"+50lbs"
			}]
		},
		daily_walks : {
			title: 'How much daily walking time is ideal?',
			answer: {},
			options:[{
				type:'TextBox',
				title:'.5',
				sub_title:"hour"
			},{
				type:'TextBox',
				title:'1',
				sub_title:"hour"
			},{
				type:'TextBox',
				title:'1.5',
				sub_title:"hours"
			},{
				type:'TextBox',
				title:'2',
				sub_title:"hours"
			},{
				type:'TextBox',
				title:'3',
				sub_title:"hours"
			}]
		},
		training_time : {
			title:'How much time a day would like to spend training?',
			answer: {},
			options:[{
				type:'TextBox',
				title:'<10',
				sub_title:"minutes"
			},{
				type:'TextBox',
				title:'20',
				sub_title:"minutes"
			},{
				type:'TextBox',
				title:'+30',
				sub_title:"minutes"
			},{
				type:'IconBox',
				icon_name:'dog_adult',
				title:'prefer-adult'
			}]
		},
		grooming : {
			title:'What are your weekly grooming preferences?',
			answer:{},
			options:[{
				type:'TextBox',
				title:'<5',
				sub_title:"minutes"
			},{
				type:'TextBox',
				title:'15',
				sub_title:"minutes"
			},{
				type:'TextBox',
				title:'30',
				sub_title:"minutes"
			},{
				type:'TitleBox',
				title:'Non Shedding',
				sub_title:''
			}]
		},
		time_alone : {
			title: 'What is the max time your dog would spend alone?',
			answer: {},
			options: [{
				type:'TextBox',
				title:'<2',
				sub_title:"hours"
			},{
				type:'TextBox',
				title:'4',
				sub_title:"hours"
			},{
				type:'TextBox',
				title:'6',
				sub_title:"hours"
			},{
				type:'TextBox',
				title:'+8',
				sub_title:"hours"
			}]
		},
		yard_size : {
			title:'What is your yard size?',
			answer:{},
			options: [{
				type:'IconBox',
				icon_name:'patio',
				title:'Small/Patio'
			},{
				type:'IconBox',
				icon_name:'house',
				title:'Medium'
			},{
				type:'IconBox',
				icon_name:'tree',
				title:'Large'
			}]
		},
		gender : {
			title:'Any prefered dog gender?',
			answer:{},
			options:[{
				type:'IconBox',
				icon_name:'male',
				title:'Male'
			},{
				type:'IconBox',
				icon_name:'bitch',
				title:'Bitch'
			},{
				type:'IconBox',
				icon_name:'no-gender-pref',
				title:'No Preference'
			}]
		},
		kids : {
			title:'What is your household environment like?',
			answer: {},
			options:[{
				type:'IconBox',
				icon_name:'toddler',
				title:'Kids: 0 - 2'
			},{
				type:'IconBox',
				icon_name:'baby',
				title:'Kids: 2 - 5'
			},{
				type:'IconBox',
				icon_name:'family',
				title:'Kids: 5 - 10'
			},{
				type:'IconBox',
				icon_name:'adult',
				title:'Kids: 10 - 15'
			},{
				type:'IconBox',
				icon_name:'adult',
				title:'Adults Only'
			}]
		},
		purchase_price : {
			title:'What is your max purchasing price?',
			answer:{},
			options :[{
				type:'TextBox',
				title:'$500',
				sub_title:'and up'
			},{
				type:'TextBox',
				title:'$750',
				sub_title:'and up'
			},{
				type:'TextBox',
				title:'$1k',
				sub_title:'and up'
			},{
				type:'TextBox',
				title:'$1.5k',
				sub_title:"and up"
			}]
		},
		monthly_budget : {
			title:'What is your ideal monthly budget?',
			answer:{},
			options:[{
				type:'TextBox',
				title:'$50',
				sub_title:"monthly"
			},{
				type:'TextBox',
				title:'$100',
				sub_title:"monthly"
			},{
				type:'TextBox',
				title:'$150',
				sub_title:"monthly"
			},{
				type:'TextBox',
				title:'$200',
				sub_title:"monthly"
			}]
		}
	}//end-return;
}])

module.factory('ServerSubmit', ['$http', 'SurveyQuestions', '_', function($http, SurveyQuestions, _){
	return {
		submit : function () {

			var questions = _.map(SurveyQuestions, function (q_obj) {
				return q_obj;
			})

			var prettyQuestions = {};
			questions.forEach(function(item) {
				prettyQuestions[item.title.toLowerCase()] = item.answer;
			});

			return $http({
				method:'POST',
				url:'/api/prescreen-profile/form',
				data:prettyQuestions
			});
		}
	};
}]);
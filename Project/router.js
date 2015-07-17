var myApp = angular.module('myApp', ['ngRoute'])

myApp.config(function($routeProvider) { //$routeProvider = default parameter expected by the ngRoute
  $routeProvider
    .when('/', {  //homepage
      templateUrl: 'homepage.html',
      controller: 'homeController'
    })
   .when('/global/', {
    templateUrl: 'global.html',
    controller: 'globalController'
  })
   .when('/leadership/', {
    templateUrl: 'leadership.html',
    controller: 'leadershipController'
  })
  .when('/business/', {
    templateUrl: 'business-skills.html',
    controller: 'businessController'
  })
  .when('/apply/', {
    templateUrl: 'apply.html',
    controller: 'applyController'
  })
})

//The controllers are all specified in the .js file and not in the HTML


// Landing page controller
.controller('homeController', function($scope){
  $scope.number = 10
})

.controller('globalController', function($scope){
  $scope.about = "Here's some information about this page."
})

.controller('leadershipController', function($scope){
  $scope.url = ""
})
.controller('businessController', function($scope){
  $scope.url = ""
})


.controller('applyController', function($scope){
  $scope.url = ""
})

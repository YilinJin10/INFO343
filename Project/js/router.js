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
  .when('/functionOverview/', {
    templateUrl: 'functionOverview.html',
    controller: 'functionController'
  })
  .when('/friendship/', {
    templateUrl: 'friendship.html',
    controller: 'friendshipController'
  })
})


//the controllers for each page
.controller('homeController', function($scope){
})

.controller('globalController', function($scope){
})

.controller('leadershipController', function($scope){
})

.controller('businessController', function($scope){
})

.controller('applyController', function($scope){
})

.controller('functionController', function($scope){
})

.controller('friendshipController', function($scope){
})
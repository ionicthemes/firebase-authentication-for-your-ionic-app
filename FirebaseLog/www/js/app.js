// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'firebase','starter.controllers','starter.services'])

.run(function($ionicPlatform, AuthService,$state) {

  console.log(AuthService.userIsLog());
  $ionicPlatform.ready(function() {
      if(AuthService.userIsLog()){
          $state.go("user");
      }
      else{
        $state.go("login");
      }

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    // .state('app', {
    // url: '/app',
    // abstract: true,
    // templateUrl: 'templates/menu.html',
    // controller: 'MenuCtrl',
    // resolve:{
    //     user_data:function(UserService){
    //     return UserService.getUser();
    //     }
    //   }
    // })

  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })

  .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'SignUpCtrl'
    })

    .state('user', {
      url: '/user',
      templateUrl: 'templates/user.html',
      controller: 'UserCtrl',
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});

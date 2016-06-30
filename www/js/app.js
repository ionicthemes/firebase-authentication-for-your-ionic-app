// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'firebase','starter.controllers','starter.services'])

.run(function($ionicPlatform, $rootScope, $state, AuthService) {
  $ionicPlatform.ready(function(){
    AuthService.userIsLoggedIn().then(function(response)
    {
      if(response === true)
      {
        $state.go('app.user');
      }
      else
      {
        $state.go('auth.login');
      }
    });

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  // UI Router Authentication Check
  $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    if (toState.data.authenticate)
    {
      AuthService.userIsLoggedIn().then(function(response)
      {
        if(response === false)
        {
          event.preventDefault();
          $state.go('auth.login');
        }
      });
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the auth section
  .state('auth', {
    url: '/auth',
    abstract: true
  })

  .state('auth.login', {
    url: '/login',
    views: {
      'main-view@': {
        templateUrl: 'templates/auth/login.html',
        controller: 'LogInCtrl'
      }
    },
    data: {
      authenticate: false
    }
  })

  .state('auth.signup', {
    url: '/signup',
    views: {
      'main-view@': {
        templateUrl: 'templates/auth/signup.html',
        controller: 'SignUpCtrl'
      }
    },
    data: {
      authenticate: false
    }
  })

  .state('app', {
    url: '/app',
    abstract: true
  })

  .state('app.user', {
    url: '/user',
    views: {
      'main-view@': {
        templateUrl: 'templates/app/user.html',
        controller: 'UserCtrl'
      }
    },
    data: {
      authenticate: true
    }
  })

  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/user');
});

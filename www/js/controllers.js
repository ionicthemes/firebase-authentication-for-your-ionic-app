angular.module('starter.controllers', [])

.controller('LogInCtrl', function($scope, $state, AuthService, $ionicLoading) {
  $scope.login = function(user){
    $ionicLoading.show({
      template: 'Logging in ...'
    });

    AuthService.doLogin(user)
    .then(function(user){
      // success
      $state.go('app.user');
      $ionicLoading.hide();
    },function(err){
      // error
      $scope.errors = err;
      $ionicLoading.hide();
    });
  };

  $scope.facebookLogin = function(){
    $ionicLoading.show({
      template: 'Logging in with Facebook ...'
    });

    AuthService.doFacebookLogin()
    .then(function(user){
      // success
      $state.go('app.user');
      $ionicLoading.hide();
    },function(err){
      // error
      $scope.errors = err;
      $ionicLoading.hide();
    });
  };
})

.controller('SignUpCtrl', function($scope, $state, AuthService, $ionicLoading) {
  $scope.signup = function(user){
    $ionicLoading.show({
      template: 'Signing up ...'
    });

    AuthService.doSignup(user)
    .then(function(user){
      // success
      $state.go('app.user');
      $ionicLoading.hide();
    },function(err){
      // error
      $scope.errors = err;
      $ionicLoading.hide();
    });
  };
})

.controller('UserCtrl', function($scope, $state, AuthService){
  $scope.current_user = {};

  var current_user = AuthService.getUser();

  if(current_user && current_user.provider == "facebook"){
    $scope.current_user.email = current_user.facebook.displayName;
    $scope.current_user.image = current_user.facebook.profileImageURL;
  } else {
    $scope.current_user.email = current_user.password.email;
    $scope.current_user.image = current_user.password.profileImageURL;
  }

  $scope.logout = function(){
    AuthService.doLogout();

    $state.go('auth.login');
  };
})

;

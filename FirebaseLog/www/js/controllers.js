angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state, AuthService, $ionicLoading) {

    $scope.login = function(user){
        $ionicLoading.show({template:'Logging in...'});
        AuthService.doLogin(user)
        .then(function(data){
              $state.go("user");
              $ionicLoading.hide();
        },function(errors){
          $scope.errors = errors;
          $ionicLoading.hide();
        });
    };

    $scope.fbLogin = function(){
        $ionicLoading.show({template:'Logging in...'});
        AuthService.doFbLogin()
        .then(function(data){
          $state.go("user");
          $ionicLoading.hide();
        },function(errors){
          $scope.errors = errors;
          $ionicLoading.hide();
        });
    };
})

.controller('SignUpCtrl', function($scope,$state,$stateParams,AuthService,$ionicLoading) {
    $scope.signup = function(user){
        $ionicLoading.show({template:'Signing up...'});
        AuthService.doSignup(user)
        .then(function(data){
          $state.go('user');
          $ionicLoading.hide();
        },function(errors){
          $scope.errors = errors;
          $ionicLoading.hide();
        });
    };
})

.controller('UserCtrl', function($scope, $state,AuthService){
    var user_data = AuthService.userIsLog();
    if(user_data){
      debugger;
      if(user_data.provider == "facebook"){
        $scope.loggedEmail = user_data.facebook.displayName;
        $scope.ImageURL = user_data.facebook.profileImageURL;
      }
      else{
        $scope.loggedEmail = user_data.password.email;
        $scope.ImageURL = user_data.password.profileImageURL;
      }
    }
    else{
      $state.go('login');
    }

    $scope.logout = function(){
      AuthService.doLogout();
      $state.go('login');
    }
});

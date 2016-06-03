angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state, $cordovaFacebook) {
  var ref = new Firebase("https://logfirebase.firebaseio.com/");
  $scope.login = function(data){
    ref.authWithPassword({
      email    : data.email,
      password : data.password
    }, function(error, authData) {
      if (error) {
        switch (error.code) {
          case "INVALID_EMAIL":
          console.log("The specified user account email is invalid.");
          break;
          case "INVALID_PASSWORD":
          console.log("The specified user account password is incorrect.");
          break;
          case "INVALID_USER":
          console.log("The specified user account does not exist.");
          break;
          default:
          console.log("Error logging user in:", error);
        }
      } else {
      console.log("Authenticated successfully with payload:", authData);
      }
    });
  }

  $scope.logout = function(){
    ref.unauth();
  }

  $scope.fbLogin = function(){
    if(ionic.Platform.isWebView()){
      $cordovaFacebook.login(["public_profile", "email"]).then(function(success){
        console.log(success);
        ref.authWithOAuthToken("facebook", success.authResponse.accessToken, function(error, authData) {
          if (error) {
            console.log('Firebase login failed!', error);
          } else {
            console.log('Authenticated successfully with payload:', authData);
          }
        });
      }, function(error){
        console.log(error);
      });
    }
    else {
      ref.authWithOAuthPopup("facebook", function(error, authData) {
        if (error) {
          console.log("Login Failed!", error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
        }
      });
    }
  };
})

.controller('SignUpCtrl', function($scope, $stateParams) {
    $scope.signup = function(data){
      var ref = new Firebase("https://logfirebase.firebaseio.com/");
      ref.createUser({
        email    : data.email,
        password : data.password
      }, function(error, userData) {
        if (error) {
          console.log("Error creating user:", error);
        } else {
          console.log("Successfully created user account with uid:", userData.uid);
        }
      });
    };
});

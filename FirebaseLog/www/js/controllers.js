angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state, $cordovaFacebook) {

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

angular.module('starter.services', [])

.service('AuthService', function($q){
  var _firebase = new Firebase("https://logfirebase.firebaseio.com/");

  this.userIsLoggedIn = function(){
    var deferred = $q.defer(),
        authService = this,
        isLoggedIn = (authService.getUser() !== null);

    deferred.resolve(isLoggedIn);

    return deferred.promise;
  };

  this.getUser = function(){
    return _firebase.getAuth();
  };

  this.doLogin = function(user){
    var deferred = $q.defer();

    _firebase.authWithPassword({
      email    : user.email,
      password : user.password
    }, function(errors, data) {
      if (errors) {
        var errors_list = [],
            error = {
              code: errors.code,
              msg: errors.message
            };
        errors_list.push(error);
        deferred.reject(errors_list);
      } else {
        deferred.resolve(data);
      }
    });

    return deferred.promise;
  };

  this.doFacebookLogin = function(){
    var deferred = $q.defer();

    _firebase.authWithOAuthPopup("facebook", function(errors, data) {
      if (errors) {
        var errors_list = [],
            error = {
              code: errors.code,
              msg: errors.message
            };
        errors_list.push(error);
        deferred.reject(errors_list);
      } else {
        deferred.resolve(data);
      }
    });

    return deferred.promise;
  };

  this.doSignup = function(user){
    var deferred = $q.defer(),
        authService = this;

    _firebase.createUser({
      email    : user.email,
      password : user.password,
    }, function(errors, data) {
      if (errors) {
        var errors_list = [],
            error = {
              code: errors.code,
              msg: errors.message
            };
        errors_list.push(error);
        deferred.reject(errors_list);
      } else {
        // After signup we should automatically login the user
        authService.doLogin(user)
        .then(function(data){
          // success
          deferred.resolve(data);
        },function(err){
          // error
          deferred.reject(err);
        });
      }
    });

    return deferred.promise;
  };

  this.doLogout = function(){
    _firebase.unauth();
  };
})

;

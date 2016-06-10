angular.module('starter.services', [])

.service('AuthService', function($q){
  var _firebase = new Firebase("https://logfirebase.firebaseio.com/");

  this.userIsAuthenticated= function(){
    var auth_Service = this;

    return (auth_Service.getUser() !== null);
  };

  this.getUser= function(){
    return _firebase.getAuth();
  };

  this.doLogin= function(user){
    var deferred = $q.defer();

    _firebase.authWithPassword({
      email    : user.email,
      password : user.password
    }, function(error, authData) {
      console.log(error);
      if (error) {
        deferred.reject(error);
      } else {
        deferred.resolve(authData);
      }
    });

    return deferred.promise;
  };

  this.doFbLogin= function(){
    var deferred = $q.defer();

    _firebase.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        deferred.reject(error);
      } else {
        deferred.resolve(authData);
      }
    });

    return deferred.promise;
  };

  this.doSignup= function(user){
    var deferred = $q.defer(),
        auth_Service = this;

    _firebase.createUser({
      email    : user.email,
      password : user.password,
    }, function(error, userData) {
      if (error) {
        deferred.reject(error);
      } else {
        auth_Service.doLogin(user)
        .then(function(data){
            deferred.resolve(data);
        }, function(error){
          deferred.reject(error);
        })
      }
    });

    return deferred.promise;
  };

  this.doLogout= function(){
    _firebase.unauth();
  };
})

;

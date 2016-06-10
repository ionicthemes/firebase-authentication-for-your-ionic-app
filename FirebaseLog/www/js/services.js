angular.module('starter.services', [])

.service('AuthService', function($q){
    var ref = new Firebase("https://logfirebase.firebaseio.com/");
    this.userIsLog= function(){
        return ref.getAuth();
    };

    this.doLogin= function(user){
      var deferred = $q.defer();
      ref.authWithPassword({
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
      ref.authWithOAuthPopup("facebook", function(error, authData) {
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
      ref.createUser({
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
      ref.unauth();
    };
});

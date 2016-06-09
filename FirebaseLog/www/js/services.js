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
});

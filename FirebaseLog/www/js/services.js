angular.module('starter.services', [])

.service('AuthService', function(){
    var ref = new Firebase("https://logfirebase.firebaseio.com/");
    this.getUser= function(){
        return ref.getAuth();
    }
})

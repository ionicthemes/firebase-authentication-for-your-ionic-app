angular.module('starter.services', [])

.service('UserService', function(){
    var ref = new Firebase("https://logfirebase.firebaseio.com/");
    this.getUser= function(){
        return ref.getAuth();
    }
})

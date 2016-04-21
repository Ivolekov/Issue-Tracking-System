'use strict';

angular.module('issueTrackingSystem.users.authentication', [])
    .factory('authentication', [
        '$http',
        '$q',
        'BASE_URL',
        '$cookies',
        function ($http, $q, BASE_URL, $cookies) {

            function registerUser(user) {
                var deferred = $q.defer();

                $http.post(BASE_URL + 'api/account/register', user)
                    .then(function (response) {
                        deferred.resolve(response);
                    }, function (error) {
                        deferred.reject(error)
                    });

                return deferred.promise;
            }

            function loginUser(user) {
                var deferred = $q.defer(),
                    loginUserData = "grant_type=password&username=" + user.username + "&password=" + user.password;

                $http.post(BASE_URL + 'api/token', loginUserData, {
                    headers: {'Content-type': 'application/x-www-form-urlencoded'}
                }).then(function (response) {
                    deferred.resolve(response);
                }, function (error) {
                    deferred.reject(error);
                });

                return deferred.promise
            }

            return {
                registerUser: registerUser,
                loginUser: loginUser,
            }
        }]);
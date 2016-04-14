'use strict';

angular.module('issueTrackingSystem.users.authentication', [])
    .factory('authentication', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {

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
                var deferred = $q.defer();
                var loginData = 'Username=' + user.email + '&Password=' + user.password + '&grant_type=password';
                $http.post(BASE_URL + 'api/token',$.param(user), {
                        headers: {
                            'Content-type': 'application/x-www-form-urlencoded'
                        }
                    })
                    .then(function (response) {
                        sessionStorage['access_token'] = 'Bearer' + response.data.access_token;
                        deferred.resolve(response)
                    }, function (error) {
                        deferred.reject(error)
                    });

                return deferred.promise
            }

            function logout() {

            }

            return {
                registerUser: registerUser,
                loginUser: loginUser,
                logoutUser: logout
            }
        }]);
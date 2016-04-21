'use strict';

angular.module('issueTrackingSystem.users.authentication', [])
    .factory('authentication', [
        '$http',
        '$q',
        'BASE_URL',
        '$cookies',
        '$rootScope',
        function ($http, $q, BASE_URL, $cookies, $rootScope) {

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

            function getCurrentUser() {
                var deffered = $q.defer();

                $http.get(BASE_URL + 'Users/me')
                    .then(function (result) {
                        deffered.resolve(result);
                    }, function (error) {
                        deffered.reject(error);
                    });

                return deffered.promise;
            }
            function isAuthenticated() {
                return !!$cookies.get('access_token');
            }

            function setCredentials(user) {
                $cookies.put('access_token', user.access_token);
                $cookies.put('userName', user.userName);

                $http.defaults.headers.common['Authorization'] = 'Bearer ' + user.access_token;
            }

            function clearCredentials() {
                $rootScope.isAuthenticated = false;
                $rootScope.userData = undefined;
                $cookies.put('access_token', undefined);
                $cookies.put('userName', undefined);

                $http.defaults.headers.common['Authorization'] = 'Bearer ';
            }
            function isAdmin(user) {
                var isAdmin = $cookies.put('isAdmin', user.true);
                return isAdmin;
            }

            return {
                registerUser: registerUser,
                loginUser: loginUser,
                isAuthenticated: isAuthenticated,
                setCredentials: setCredentials,
                getCurrentUser: getCurrentUser,
                clearCredentials: clearCredentials,
                isAdmin: isAdmin
            }
        }]);
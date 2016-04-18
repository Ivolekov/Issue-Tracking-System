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
                    sessionStorage['access_token'] = 'Bearer' + response.data.access_token;
                    deferred.resolve(response);
                    //console.log(response.data)
                }, function (error) {
                    deferred.reject(error);
                    //console.log(error)
                });

                return deferred.promise
            }

            function logoutUser() {
                var deferred = $q.defer();

                $http.post(BASE_URL + "Account/Logout",null,null)
                    .then(function (response) {
                        deferred.resolve(response);
                        console.log(response)
                    }, function (error) {
                        deferred.reject(error);
                        console.log("ERROR--->>>>" + error.data)
                    })
            }

            //function getCurrentUser() {
            //    var user = sessionStorage['currentUser'];
            //    if (user) {
            //        return JSON.parse(user)
            //    }
            //}
            function getCurrentUser(user) {

                var deferred = $q.defer();

                $http.get(BASE_URL + 'users/me')
                    .then(function (response) {
                        deferred.resolve(response);
                    }, function (error) {
                        deferred.reject(error)
                    });
                var accessToken = $cookies.get('access_token');

                if ($cookies.get('access_token')) {
                    $http.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
                } else {
                    $rootScope.isAuthenticated = false;
                    return false;
                }

                return deferred.promise;
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

            function changePassword(passwordInfo) {
                var deffered = $q.defer();

                $http.post(BASE_URL + 'api/Account/ChangePassword', passwordInfo)
                    .then(function (result) {
                        deffered.resolve(result);
                    }, function (error) {
                        deffered.reject(error);
                    });

                return deffered.promise;
            }

            return {
                registerUser: registerUser,
                loginUser: loginUser,
                logoutUser: logoutUser,
                isAuthenticated: isAuthenticated,
                setCredentials: setCredentials,
                getCurrentUser: getCurrentUser,
                clearCredentials: clearCredentials,
                changePassword: changePassword
            }
        }]);
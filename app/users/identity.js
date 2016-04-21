'use strict';

angular.module('issueTrackingSystem.users.identity', [])
    .factory('identity', [
        '$http',
        '$q',
        'BASE_URL',
        '$cookies',
        '$rootScope',
        function ($http, $q, BASE_URL, $cookies, $rootScope) {

            function isAuthenticated() {
                return !!$cookies.get('access_token');
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
                $cookies.put('isAdmin', undefined);

                //$http.defaults.headers.common['Authorization'] = 'Bearer ';
            }
            function isAdmin(user) {
                var isAdmin = $cookies.put('isAdmin', user.true);
                return isAdmin;
            }

            return {
                isAuthenticated: isAuthenticated,
                setCredentials: setCredentials,
                getCurrentUser: getCurrentUser,
                clearCredentials: clearCredentials,
                isAdmin: isAdmin
            }
        }]);
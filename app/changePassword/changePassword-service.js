'use strict';

angular.module('issueTrackingSystem.changePassword.changePassword-service', [])
    .factory('changePassword-service', [
        '$http',
        '$q',
        'BASE_URL',
        function ($http, $q, BASE_URL) {

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
                changePassword: changePassword
            }
        }]);
'use strict';

angular.module('issueTrackingSystem.changePassword.changePassword', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/changePassword.changePassword.html',
            controller: 'ChangePasswordCtrl'
        })
    }])
    .controller('ChangePasswordCtrl', [
        '$scope',
        'changePasswordService',
        'notificationService',
        '$route',
        function ($scope, changePasswordService, notificationService, $route) {
            $scope.changePassword = function (passwordInfo) {
                changePasswordService.changePassword(passwordInfo)
                    .then(function (result) {
                        notificationService.notifySuccesMsg('Password changed successfully!');
                        $route.reload();
                    }, function (error) {
                        notificationService.notifyErrorMsg("Password change error");
                    });
            };
        }]);
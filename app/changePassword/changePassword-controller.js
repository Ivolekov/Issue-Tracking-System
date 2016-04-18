'use strict';

angular.module('issueTrackingSystem.changePassword.changePassword', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/password', {
            templateUrl: 'app/changePassword/changePassword.html',
            controller: 'ChangePasswordCtrl',
            access: {
                requiresAuthentication: true
            }
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
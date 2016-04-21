'use strict';

angular.module('issueTrackingSystem.changePassword.changePassword', ['issueTrackingSystem.changePassword.changePassword-service'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/password', {
            templateUrl: 'app/changePassword/changePassword.html',
            controller: 'ChangePasswordCtrl',
            access: {
                isAuthenticated: true
            }
        })
    }])
    .controller('ChangePasswordCtrl', [
        '$scope',
        'changePasswordService',
        'notificationService',
        '$route',
        'noty',
        '$location',
        function ($scope, changePasswordService, notificationService, $route, noty, $location) {
            $scope.changePassword = function (passwordInfo) {
                changePasswordService.changePassword(passwordInfo)
                    .then(function () {
                        noty.showNoty(notificationService.notifySuccesMsg('Password changed successfully!'));
                        $location.path('app/home/home.html');
                        $route.reload();
                    }, function () {
                        noty.showNoty(notificationService.notifyErrorMsg("Password change error"));
                    });
            };
        }]);
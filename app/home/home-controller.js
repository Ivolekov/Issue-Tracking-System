'use strict';

angular.module('issueTrackingSystem.home.home', [
        'issueTrackingSystem.users.authentication'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/home/home.html',
            controller: 'HomeCtrl'
        })
    }])
    .controller('HomeCtrl', [
        '$scope',
        'authentication',
        'notificationService',
        'noty',
        function ($scope, authentication, notificationService, noty) {
            $scope.login = function (user) {
                authentication.loginUser(user)
                    .then(function (response) {
                        sessionStorage.setItem('currentUser', JSON.stringify(response.data));
                        console.log('JSON-->>>>' + JSON.stringify(response));
                        noty.showNoty(notificationService.notifySuccesMsg('Successfully Logged In'))
                    }, function (error) {
                        console.log(error);
                        noty.showNoty(notificationService.notifyErrorMsg('The Username or Password is Incorrect. Please Try Again'))
                    });

            };

            $scope.register = function (user) {
                authentication.registerUser(user)
                    .then(function (registeredUser) {
                        console.log(registeredUser);
                        noty.showNoty(notificationService.notifySuccesMsg('Registration Success. Welcome'))
                    }, function (error) {
                        console.log(error);
                        noty.showNoty(notificationService.notifyErrorMsg('Registration Failed. Please try again'))
                    });
            };

            $scope.logout = function (user) {
                authentication.logoutUser();
                console.log('Logout successful');
                noty.showNoty(notificationService.notifyLogoutMsg('Successfully Logged Out'))

            };

        }]);

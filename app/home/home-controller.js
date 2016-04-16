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
        '$route',
        function ($scope, authentication, $route) {
            $scope.login = function (user) {
                authentication.loginUser(user)
                    .then(function (response) {
                        sessionStorage.setItem('currentUser', JSON.stringify(response.data));
                        console.log('JSON-->>>>' + JSON.stringify(response));
                    }, function (error) {
                        console.log(error)
                    });

            };

            $scope.register = function (user) {
                authentication.registerUser(user)
                    .then(function (registeredUser) {
                        console.log(registeredUser)
                    }, function (error) {
                        console.log(error)
                    });
            };

            $scope.logout = function (user) {
                authentication.logoutUser()
                console.log('Logout successful');

            };

        }]);

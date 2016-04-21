'use strict';

angular.module('issueTrackingSystem.home.home', [
        'issueTrackingSystem.users.identity',
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
        '$route',
        '$rootScope',
        '$cookies',
        'identity',
        'authentication',
        'notificationService',
        'noty',
        'projectService',
        function ($scope, $route,  $rootScope, $cookies, identity, authentication, notificationService, noty, projectService) {
            $rootScope.isAuthenticated = identity.isAuthenticated();
            $rootScope.userName = $cookies.get('userName');
            $scope.login = function (user) {
                authentication.loginUser(user)
                    .then(function (response) {
                        identity.setCredentials(response.data);
                        identity.getCurrentUser()
                            .then(function (userInfo) {
                                $cookies.put('isAdmin', userInfo.data.isAdmin);
                                projectService.getAllProjects();
                                noty.showNoty(notificationService.notifySuccesMsg('Successfully Logged In'));
                                $route.reload()
                            })

                    }, function () {
                        noty.showNoty(notificationService.notifyErrorMsg('The Username or Password is Incorrect. Please Try Again'))
                    });

            };

            $scope.register = function (user) {
                authentication.registerUser(user)
                    .then(function(result) {
                        var loginUserData = {
                            username: user.email,
                            password: user.password,
                            grant_type: 'password'
                        };
                        noty.showNoty(notificationService.notifySuccesMsg('Registration Success. Welcome'));
                        $scope.login(loginUserData);
                    }, function() {
                        noty.showNoty(notificationService.notifyErrorMsg('Registration Failed. Please try again'))
                    });
            };

            $scope.logout = function () {
                identity.clearCredentials();
                noty.showNoty(notificationService.notifyLogoutMsg('Successfully Logged Out'));
                $route.reload()

            };

        }]);

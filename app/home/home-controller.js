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
        '$route',
        '$rootScope',
        '$cookies',
        function ($scope, authentication, notificationService, noty, $route, $rootScope, $cookies) {
            $rootScope.isAuthenticated = authentication.isAuthenticated();

            $scope.login = function (user) {
                authentication.loginUser(user)
                    .then(function (response) {
                        //sessionStorage.setItem('currentUser', JSON.stringify(response.data));
                        //console.log('JSON-->>>>' + JSON.stringify(response));
                        authentication.setCredentials(response.data);
                        //authentication.getCurrentUser(function (succes) {
                        //    $rootScope.isAuthenticated = true;
                        //    $rootScope.userData = succes.data;
                        //});
                        authentication.getCurrentUser()
                            .then(function (userInfo) {
                                //sessionStorage['isAdmin'] = userInfo.data.isAdmin;
                                $cookies.put('isAdmin', userInfo.data.isAdmin);
                                noty.showNoty(notificationService.notifySuccesMsg('Successfully Logged In'));
                                $route.reload()
                            })

                    }, function (error) {
                        //console.log(error);
                        noty.showNoty(notificationService.notifyErrorMsg('The Username or Password is Incorrect. Please Try Again'))
                    });

            };

            $scope.register = function (user) {
                authentication.registerUser(user)
                    .then(function (registeredUser) {
                        //console.log(registeredUser);
                        authentication.loginUser(user)
                            .then(function (response) {

                                authentication.setCredentials(response.data);
                                authentication.getCurrentUser(function (succes) {
                                    $rootScope.isAuthenticated = true;
                                    $rootScope.userData = succes.data;
                                });
                                noty.showNoty(notificationService.notifySuccesMsg('Successfully Logged In'));
                                $route.reload()
                            }, function (error) {
                                console.log(error);
                                noty.showNoty(notificationService.notifyErrorMsg('The Username or Password is Incorrect. Please Try Again'))
                            });

                        noty.showNoty(notificationService.notifySuccesMsg('Registration Success. Welcome'))
                    }, function (error) {
                        //console.log(error);
                        noty.showNoty(notificationService.notifyErrorMsg('Registration Failed. Please try again'))
                    });
            };



            $scope.logout = function (user) {
                authentication.logoutUser();
                sessionStorage.clear()
                console.log('Logout successful');
                authentication.clearCredentials();
                noty.showNoty(notificationService.notifyLogoutMsg('Successfully Logged Out'))
                $route.reload()

            };

        }]);

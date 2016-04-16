<<<<<<< HEAD
'use strict';
angular.module('issueTrackingSystem.home.home', [
=======
angular.module('issueTrackingSystem.home', [
>>>>>>> 2779ec8487ea04bd7a7645cd602ae50975ecc72a
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
        function ($scope, authentication) {
            $scope.login = function (user) {
                authentication.loginUser(user)
<<<<<<< HEAD
                    .then(function (response) {
                        sessionStorage.setItem('currentUser', JSON.stringify(response.data));
                        console.log('JSON-->>>>' + JSON.stringify(response));
                    }, function (error) {
                        console.log(error)
=======
                    .then(function (loggedInUser) {
                        console.log(loggedInUser);
>>>>>>> 2779ec8487ea04bd7a7645cd602ae50975ecc72a
                    });

            };

<<<<<<< HEAD


=======
>>>>>>> 2779ec8487ea04bd7a7645cd602ae50975ecc72a
            $scope.register = function (user) {
                authentication.registerUser(user)
                    .then(function (registeredUser) {
                        console.log(registeredUser)
                    });
            }
<<<<<<< HEAD

        }]);
=======
        }])
>>>>>>> 2779ec8487ea04bd7a7645cd602ae50975ecc72a

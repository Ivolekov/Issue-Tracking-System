angular.module('issueTrackingSystem.home', [
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
                    .then(function (loggedInUser) {
                        console.log(loggedInUser);
                    });

            };

            $scope.register = function (user) {
                authentication.registerUser(user)
                    .then(function (registeredUser) {
                        console.log(registeredUser)
                    });
            }
        }])

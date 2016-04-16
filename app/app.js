'use strict';

angular.module('issueTrackingSystem', [
    'ngRoute',
<<<<<<< HEAD
    'issueTrackingSystem.home.home'
=======
    'issueTrackingSystem.home'
>>>>>>> 2779ec8487ea04bd7a7645cd602ae50975ecc72a
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');

'use strict';

angular.module('issueTrackingSystem', [
    'ngRoute',
    'angular-noty',
    'ngAnimate',
    'issueTrackingSystem.home.home',
    'issueTrackingSystem.dashboard.dashboard',
    'issueTrackingSystem.components.noty-service'
]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');

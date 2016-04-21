'use strict';

angular.module('issueTrackingSystem', [
        'ngRoute',
        'ngCookies',
        'angular-noty',
        'angular-loading-bar',
        'ngAnimate',
        'issueTrackingSystem.home.home',
        'issueTrackingSystem.dashboard.dashboard',
        'issueTrackingSystem.components.noty-service',
        'issueTrackingSystem.changePassword.changePassword',
        'issueTrackingSystem.project.project-service'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');

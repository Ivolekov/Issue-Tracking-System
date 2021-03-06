'use strict';

angular.module('issueTrackingSystem', [
        'ngRoute',
        'ngCookies',
        'angular-noty',
        'angular-loading-bar',
        'ngAnimate',
        'ui.bootstrap.pagination',
        'bw.paging',
        'issueTrackingSystem.home.home',
        'issueTrackingSystem.dashboard.dashboard',
        'issueTrackingSystem.components.noty-service',
        'issueTrackingSystem.changePassword.changePassword',
        'issueTrackingSystem.project.project',
        'issueTrackingSystem.issue.issue'
    ])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');

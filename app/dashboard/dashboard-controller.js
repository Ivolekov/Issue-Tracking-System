'use strict';

angular.module('issueTrackingSystem.dashboard.dashboard', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/home/home.html',
            controller: 'DashboardCtrl'
        })
    }])
    .controller('DashboardCtrl', [
        '$scope',
        'projectService',
        'issueService',
        function ($scope, projectService, issueService) {


        }]);
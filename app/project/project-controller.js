'use strict';

angular.module('issueTrackingSystem.project.project', ['issueTrackingSystem.project.project-service'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/project', {
            templateUrl: 'app/project/project.html',
            controller: 'ProjectCtrl'
        })
    }])
    .controller('ProjectCtrl', [
        '$scope',
        'projectService',
        'issueService',
        '$route',
        'authentication',
        function ($scope, projectService, issueService, $route, authentication) {

        }]);
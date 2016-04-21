'use strict';

angular.module('issueTrackingSystem.issue.issue', ['issueTrackingSystem.issue.issue-service'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/issue', {
            templateUrl: 'app/issue/issue.html',
            controller: 'IssueCtrl'
        })
    }])
    .controller('IssueCtrl', [
        '$scope',
        'projectService',
        'issueService',
        '$route',
        'authentication',
        function ($scope, projectService, issueService, $route, authentication) {


        }]);
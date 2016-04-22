'use strict';

angular.module('issueTrackingSystem.issue.issue', ['issueTrackingSystem.issue.issue-service'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/issue', {
            templateUrl: 'app/issue/issue.html',
            controller: 'IssueCtrl',
            access: {
                isAuthenticated: true
            }
        })
    }])
    .controller('IssueCtrl', [
        '$scope',
        '$rootScope',
        '$route',
        'projectService',
        'issueService',
        'identity',
        function ($scope,$rootScope, projectService, issueService, $route, identity) {

        }]);
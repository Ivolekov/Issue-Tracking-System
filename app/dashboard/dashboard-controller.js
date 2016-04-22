'use strict';

angular.module('issueTrackingSystem.dashboard.dashboard', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/home/home.html',
            controller: 'DashboardCtrl',
            access: {
                isAuthenticated: true
            }
        })
    }])
    .controller('DashboardCtrl', [
        '$scope',
        '$rootScope',
        'projectService',
        'issueService',
        function ($scope, $rootScope, projectService, issueService) {

            $scope.issuesParams = {
                pageSize: 10,
                pageNumber: 1
            };

            $scope.projectsParams = {
                pageSize: 7,
                pageNumber: 1
            };

            $scope.getUserIssues = function(){
                issueService.getUserIssues($scope.issuesParams)
                    .then(function success(data){
                        $rootScope.userIssues = data.Issues;
                    }, function error(err){
                        console.log(err)
                    })
            };

            $scope.getAllProjects = function () {
                projectService.getAllProjects($scope.projectsParams)
                    .then(function (response) {
                        $rootScope.allProjects = response.Projects;
                    }, function (error) {
                        console.log(error)
                    })
            };
        }]);
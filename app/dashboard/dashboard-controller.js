'use strict';

angular.module('issueTrackingSystem.dashboard.dashboard', ['issueTrackingSystem.project.project-service'])
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
        'noty',
        'notificationService',
        function ($scope, $rootScope, projectService, issueService, noty, notificationService) {

            $scope.currentPage = 1;
            $scope.currentProjectsPage = 1;

            $scope.issuesParams = {
                pageSize: 10,
                pageNumber: 1
            };

            $scope.projectsParams = {
                pageSize: 15,
                pageNumber: 1
            };

            $scope.getUserIssues = function(){
                issueService.getUserIssues($scope.issuesParams)
                    .then(function (data){
                        $rootScope.userIssues = data.Issues;
                        $scope.issuesCount = data.TotalPages * $scope.issuesParams.pageSize;
                    }, function (){
                        noty.showNoty(notificationService.notifyErrorMsg('Error: Can\'t load issues' ))
                    })
            };

            $scope.getAllProjects = function () {
                projectService.getAllProjects($scope.projectsParams)
                    .then(function (response) {
                        $rootScope.allProjects = response.Projects;
                        $scope.projectsCount  = response.TotalPages * $scope.projectsParams.pageSize;
                    }, function () {
                        noty.showNoty(notificationService.notifyErrorMsg('Error: Can\'t load projects'))
                    })
            };

            $scope.pageChanged = function (page) {
                $scope.getUserIssues(page);
            };

            $scope.projectsPageChanged = function (page) {
                $scope.getAllProjects(page);
            };
        }]);
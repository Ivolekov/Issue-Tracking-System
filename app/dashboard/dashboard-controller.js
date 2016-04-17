'use strict';

angular.module('issueTrackingSystem.dashboard.dashboard', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'app/dashboard/dashboard.html',
            controller: 'DashboardCtrl'
        })
    }])
    .controller('DashboardCtrl', [
        '$scope',
        function ($scope) {
            //Paging
            const pageSize = 5;

            $scope.issuesParams = {
                pageNumber: 1,
                pageSize: pageSize
            };

        }]);
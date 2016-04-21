'use strict';

angular.module('issueTrackingSystem.project.project-service', [])
    .factory('projectService', [
        '$http',
        '$q',
        'BASE_URL',
        'issueService',
        function ($http, $q, BASE_URL) {
            function getAllProjects() {
                var deffered = $q.defer();

                $http.get(BASE_URL + 'Projects')
                    .then(function (result) {
                        deffered.resolve(result);
                    }, function (error) {
                        deffered.reject(error);
                    });

                return deffered.promise;
            }

            function getProjectById(id) {
                var deffered = $q.defer();

                $http.get(BASE_URL + 'Projects/' + id)
                    .then(function (result) {
                        deffered.resolve(result);
                    }, function (error) {
                        deffered.reject(error);
                    });

                return deffered.promise;
            }

            return {
                getAllProjects: getAllProjects,
                getProjectById: getProjectById
            }
        }]);
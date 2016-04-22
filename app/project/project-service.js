'use strict';

angular.module('issueTrackingSystem.project.project-service', [])
    .factory('projectService', [
        '$http',
        '$q',
        'BASE_URL',
        '$cookies',
        function ($http, $q, BASE_URL, $cookies) {

            function getAllProjects(params){
                var deferred = $q.defer();
                var token = $cookies.get('access_token');
                var config = 'Projects?filter=&pageSize=' + params.pageSize + '&pageNumber=' + params.pageNumber;

                $http.defaults.headers.common.Authorization = 'Bearer ' + token;

                $http.get(BASE_URL + config)
                    .then(function(response){
                        deferred.resolve(response.data);
                    }, function(err){
                        deferred.reject(err);
                    });

                return deferred.promise;
            }
            return {
                getAllProjects: getAllProjects
            };
        }]);
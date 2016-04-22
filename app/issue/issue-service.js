'use strict';

angular.module('issueTrackingSystem.issue.issue-service', [])
    .factory('issueService', [
        '$http',
        '$q',
        'BASE_URL',
        '$cookies',
        function ($http, $q, BASE_URL, $cookies) {

            function getUserIssues(pageParams){
                var deferred = $q.defer();

                var token = $cookies.get('access_token');

                var url = BASE_URL + 'issues/me?orderBy=DueDate desc&pageSize=' +
                    pageParams.pageSize +
                    '&pageNumber=' +
                    pageParams.pageNumber;

                $http.defaults.headers.common.Authorization = 'Bearer ' + token;

                $http.get(url)
                    .then(function(response){
                        deferred.resolve(response.data);
                    }, function(err){
                        deferred.reject(err);
                    });

                return deferred.promise;
            }

            return {
                getUserIssues: getUserIssues
            }
        }]);
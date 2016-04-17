angular.module('issueTrackingSystem.components.noty-service', [])
    .factory('notificationService', [
        function () {
            return {
                notifySuccesMsg: function (message) {
                    return {
                        text: message,
                        ttl: 4000,
                        type: "success"

                    }
                },
                notifyErrorMsg: function (message) {
                    return {
                        text: message,
                        ttl: 4000,
                        type: "warning"
                    }
                },
                notifyLogoutMsg: function (message) {
                    return {
                        text: message,
                        ttl: 4000,
                        type: "gmail"
                    }
                }
            };
        }]);
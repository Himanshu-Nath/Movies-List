angular.module('moviesApp')
    .factory('DashboardService', ['$http', '$q', '$rootScope', 'appConfig', function ($http, $q, $rootScope, appConfig) {
        var DashboardService = {};

        DashboardService.getMoviesList = function (pageNumber) {
            var deferred = $q.defer();
            $http.get(appConfig.serviceUrl + '/assets/data/CONTENTLISTINGPAGE-PAGE'+ pageNumber +'.json')
                .then(function successCallback(response) {
                    if(response.data.hasOwnProperty('page'))
                        deferred.resolve(response.data);
                    else
                        deferred.reject({ status: false, msg: "Error" });
                }, function errorCallback(response) {
                    deferred.reject({ status: false, msg: "Error" });
                });
            return deferred.promise;
        }
        return DashboardService;
    }
    ]);
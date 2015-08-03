var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp
    .service('ContentService', function($http, $q){
        var commondata = $q.defer();

        this.getCommonData = function() {
            return commondata.promise;
        };

        var load = function() {
            $http.get('client/media/commondata/commondata.json').
                success(function(data, status, headers, config) {
                    commondata.resolve(data);
                }).
                error(function(data, status, headers, config) {
                    commondata.reject({"error":"Problème d'accès au serveur..."});
                });
        };

        load();
    });

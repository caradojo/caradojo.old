var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp
    .service('ContentService', function($http, $q){
        var accueil = $q.defer();
        var apropos = $q.defer();
        var participants = $q.defer();
        var orateurs = $q.defer();

        this.getAccueil = function() {
            return accueil.promise;
        };

        this.getParticipants = function() {
            return participants.promise;
        };

        this.getOrateurs = function() {
            return orateurs.promise;
        };

        this.getApropos = function() {
            return apropos.promise;
        };

        var load = function() {

            $http.get('client/media/accueil/content.json').
                success(function(data, status, headers, config) {
                    accueil.resolve(data);
                }).
                error(function(data, status, headers, config) {
                    accueil.reject({"error":"Problème d'accès au serveur..."});
                });

            $http.get('client/media/participants/content.json').
                success(function(data, status, headers, config) {
                    participants.resolve(data);
                }).
                error(function(data, status, headers, config) {
                    participants.reject({"error":"Problème d'accès au serveur..."});
                });

            $http.get('client/media/orateurs/content.json').
                success(function(data, status, headers, config) {
                    orateurs.resolve(data);
                }).
                error(function(data, status, headers, config) {
                    orateurs.reject({"error":"Problème d'accès au serveur..."});
                });

            $http.get('client/media/apropos/content.json').
                success(function(data, status, headers, config) {
                    apropos.resolve(data);
                }).
                error(function(data, status, headers, config) {
                    apropos.reject({"error":"Problème d'accès au serveur..."});
                });
        };

        load();
    });

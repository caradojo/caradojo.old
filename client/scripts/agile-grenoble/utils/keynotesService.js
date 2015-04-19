var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp
    .service('KeynotesService', function($http, $q) {
        var error = '';
        var keynotes = $q.defer();

        this.get = function() {
            return keynotes.promise;
        }

        var loadKeynotes = function() {

            $http.get('client/media/keynotes/content.json').
                success(function(data, status, headers, config) {
                    data.keynotes = _.each(data.keynotes, function(item) {
                        item.photo  = 'client/media/keynotes/images/' + item.photo;
                    });
                    keynotes.resolve(data);
                }).
                error(function(data, status, headers, config) {
                    keynotes.reject({"error":"Problème d'accès au serveur..."});
                    error = "Problème d'accès au serveur...";
                });
        };

        loadKeynotes();
    });
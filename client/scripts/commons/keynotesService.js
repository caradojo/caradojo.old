var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp
    .service('KeynotesService', function($http) {
        var error = '';
        var keynotes = [];

        this.get = function() {
            return keynotes;
        }

        var loadKeynotes = function() {

            $http.get('client/media/keynotes/keynotes.json').
                success(function(data, status, headers, config) {
                    keynotes.push.apply(keynotes, _.each(data, function(item) {
                        item.photo  = 'client/media/keynotes/images/' + item.photo;
                    }));
                }).
                error(function(data, status, headers, config) {
                    error = "Problème d'accès au serveur...";
                });
        };

        loadKeynotes();
    });
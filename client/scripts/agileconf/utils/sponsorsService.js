var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp
    .service('SponsorsService', function($http, $q) {

        var sponsors = $q.defer();

        this.get = function() {
            return sponsors.promise;
        };

        var loadSponsors = function() {

            $http.get('client/media/agileconf/sponsors/content.json').
                success(function(data, status, headers, config) {
                    data.sponsors = _.each(data.sponsors, function(item) {
                        item.description  = 'client/media/agileconf/sponsors/descriptions/' + item.description;
                        item.photo = 'client/media/agileconf/sponsors/images/' + item.photo;
                    });
                    sponsors.resolve(data);
                }).
                error(function(data, status, headers, config) {
                    sponsors.reject({"error":"Problème d'accès au serveur..."});
                });
        };

        loadSponsors();
    });

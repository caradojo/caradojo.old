var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp
    .service('SponsorsService', function($http){
        var error = '';
        var sponsors = [];

        this.getAll = function() {
            return sponsors;
        };

        this.getGold = function() {
            return _.filter(sponsors, function(item) {
                                return item.goldNotSilver;
                            });
        };

        this.getSilver = function() {
            return _.filter(sponsors, function(item) {
                                return !item.goldNotSilver && !item.partenaire;
                            });
        };

        this.getPartenaire = function() {
            return _.filter(sponsors, function(item) {
                                return item.partenaire;
                            });
        };

        var loadSponsors = function() {

            $http.get('client/media/sponsors/sponsors.json').
                success(function(data, status, headers, config) {
                    sponsors.push.apply(sponsors, _.each(data, function(item) {
                        item.description  = 'client/media/sponsors/descriptions/' + item.description;
                        item.photo = 'client/media/sponsors/images/' + item.photo;
                    }));
                }).
                error(function(data, status, headers, config) {
                    error = "Problème d'accès au serveur...";
                });
        };

        loadSponsors();
    });

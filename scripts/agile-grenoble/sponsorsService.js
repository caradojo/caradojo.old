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

            $http.get('images/sponsors/resources/sponsors.json').
                success(function(data, status, headers, config) {
                    sponsors.push.apply(sponsors, _.each(data, function(item) {
                        item.description  = 'images/sponsors/resources/' + item.description;
                        item.photo = 'images/sponsors/' + item.photo;
                    }));
                }).
                error(function(data, status, headers, config) {
                    error = "Problème d'accès au serveur...";
                });
        };

        loadSponsors();
    });

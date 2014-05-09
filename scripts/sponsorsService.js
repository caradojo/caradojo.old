var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp
    .service('sponsorsService', ['$http', function($http){
        var error = '';
        var sponsors = [];

        this.get = function() {
            return sponsors;
        }

        var loadSponsors = function() {

            $http.get('images/sponsors/resources/sponsors.json').
                success(function(data, status, headers, config) {
                    sponsors.push.apply(sponsors, data);
                }).
                error(function(data, status, headers, config) {
                    error = "Problème d'accès au serveur...";
                });
        };

        loadSponsors();
    }]);
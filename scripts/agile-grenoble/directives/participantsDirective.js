var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.directive('agParticipants', ['$window', function($window) {

		return {
			restrict: 'A',
			//transclude: 'element',
			replace: true,
			controller: function ($scope) {
				$scope.hotels = [
							        {
								        name:'Novotel Grenoble Centre',
								        stars: 3,
								        url:'http://www.accorhotels.com/fr/hotel-1624-novotel-grenoble-centre/index.shtml',
								        address: 'jouxtant le WTC et à une minute de la gare',
								        phone:'4 76 70 84 84',
							        },
							        {
								        name:'Grenoble Europole',
								        stars: 3,
								        url:'http://www.hoteleuropole.com/',
								        address: '(en face du WTC) 29, rue Pierre-Sémard',
								        phone:'4 76 49 51 52',
							        },
							        {
								        name:'Best Western Terminus',
								        stars: 3,
								        url:'http://www.terminus-hotel-grenoble.fr',
								        address: '(en face de la gare)',
								        phone:'4 76 87 24 33',
							        },
									{
								        name:'Ibis',
								        stars: 3,
								        url:'http://www.ibishotel.com/fr/hotel-2737-ibis-grenoble-gare/index.shtml',
								        address: '(plus loin, le long des quais) 27 Quai Claude Bernard',
								        phone:'4 76 86 68 68',
							        },
									{
								        name:'Hôtel des Alpes',
								        stars: 2,
								        url:'http://www.hotel-des-alpes.fr',
								        address: '(proche gare) 45, avenue Félix Viallet',
								        phone:'4 76 87 00 71',
							        },
									{
								        name:'Hôtel Bastille',
								        stars: 2,
								        url:'http://www.isere-tourisme.com/HOT/Hotel-Bastille/Grenoble/fiche-1104-1-38AAHOT100025.html',
								        address: '(proche gare) 25 avenue Félix Viallet',
								        phone:'4 76 43 10 27',
							        },
									{
								        name:'Hôtel Institut',
								        stars: '2',
								        url:'http://www.institut-hotel.fr',
								        address: '(proche WTC, gare) 10 rue Louis Barbillon',
								        phone:'4 76 46 36 44',
							        }
		        				];

				$scope.site = function(annee) {
					if(annee <= 2009) {
						$window.open('http://at' + annee + '.agiletour.org/');
					}
					else if(annee <= 2011) {
						$window.open('http://agile-grenoble.org/' + annee + '/start');
					}
					else {
						$window.open('http://' + annee + '.agile-grenoble.org');
					}
				};
			},
			templateUrl: './templates/agile-grenoble/participants.html'
		};
	}])
;

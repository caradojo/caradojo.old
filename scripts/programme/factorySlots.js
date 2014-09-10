var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.factory('Slots', ['$resource', function($resource) {
	return $resource('http://stark-sea-2092.herokuapp.com/jsonp/program-summary-with-roomlist', 
						{
                        	callback: "JSON_CALLBACK"
                    	}, 
                    	{
					    	jsonp_query: {
					        	method: 'JSONP'
					    	}
					    }
					 );
	}]);
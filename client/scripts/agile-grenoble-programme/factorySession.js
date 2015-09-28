var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.factory('Session', ['$resource', function($resource) {
	return $resource('http://localhost:3000/jsonp/beta/session/:id',
			{
            	callback: "JSON_CALLBACK",
            	id:'@id'
        	},
        	{
		    	jsonp_query: {
		        	method: 'JSONP'
		    	}
		    }
		 );
	}]);
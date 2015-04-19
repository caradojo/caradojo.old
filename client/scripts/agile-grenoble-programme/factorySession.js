var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.factory('Session', ['$resource', function($resource) {
	return $resource('http://stark-sea-2092.herokuapp.com/jsonp/beta/session/:id', 
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
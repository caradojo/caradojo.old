var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.factory('Session', ['$resource', function($resource) {
//	return $resource('http://stark-sea-2092.herokuapp.com/jsonp/beta/session/:id',
    // test serveur node local
    // return $resource('http://localhost:3000/session/:id',
    return $resource('https://agile-grenoble-2016.herokuapp.com/session/:id',
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

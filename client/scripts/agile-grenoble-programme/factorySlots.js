var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.factory('Slots', ['$resource', '$http', function($resource, $http) {
	return $resource('http://localhost:3000/jsonp/beta/program-summary-with-roomlist',
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
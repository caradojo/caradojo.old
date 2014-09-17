var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.factory('Slots', ['$resource', '$http', function($resource, $http) {
	return $resource('http://stark-sea-2092.herokuapp.com/jsonp/beta/program-summary-with-roomlist', 
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
var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.factory('Slots', ['$resource', '$http', function($resource, $http) {
	return $resource('http://stark-sea-2092.herokuapp.com/jsonp/beta/program-summary-with-roomlist', 
			{
            	callback: "JSON_CALLBACK",
	        	headers: {
		            'Accept':'application/json, text/javascript',
		            'Content-Type':'application/json; charset=utf-8'
		        }
        	}, 
        	{
		    	jsonp_query: {
		        	method: 'JSONP',
		        	headers: {
			            'Accept':'application/json, text/javascript',
			            'Content-Type':'application/json; charset=utf-8'
			        }
		    	} 
		    }
		 );
	}]);
var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.factory('Slots', ['$resource', '$http', function($resource, $http) {
//	return $resource('http://stark-sea-2092.herokuapp.com/jsonp/beta/program-summary-with-roomlist',
//	return $resource('http://agile-grenoble.org/client/media/agileconf-programme/programme2016.json',
// test avec serveur node local
//    return $resource('http://localhost:3000/summary',
    return $resource('https://agile-grenoble-2016.herokuapp.com/summary',
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

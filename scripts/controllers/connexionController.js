var AgileGrenobleApp = AgileGrenobleApp || {};
AgileGrenobleApp.controller('ModalConnexionInstanceCtrl', function($scope, $modalInstance, items) {
		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
    })
    .controller('ModalConnexionCtrl', function($scope, $rootScope, $modal, $log) {
       
		  var modalInstance = null;

		  $scope.disconnect = function() {
		  	gapi.auth.signOut();
		  };

		  $scope.open = function () {
		    modalInstance = $modal.open({
		      templateUrl: './views/connexion.html',
		      controller: "ModalConnexionInstanceCtrl",
		      resolve: {
		        items: function () {
		          return $scope.items;
		        }
		      }
		    });

		    modalInstance.result.then(function (selectedItem) {
		    }, function () {
		    });
		  };

		  $scope.$on('event:google-plus-signin-success', function (event,authResult) {
		    gapi.client.load('plus','v1', loadProfile); 
		    modalInstance.close();
		    $rootScope.logged = 1;
		  });
		  
		  

		  $scope.$on('event:google-plus-signin-failure', function (event,authResult) {
		  	$rootScope.logged = 0;
		  });

		  var loadProfile = function() {
		  	var request = gapi.client.plus.people.get( {'userId' : 'me'} );
    		request.execute(loadProfileCallback);
    	  };

    	  var loadProfileCallback = function(obj) {
			    $scope.profile = obj;

			    $rootScope.email = obj['emails'].filter(function(v) {
			        return v.type === 'account';
			    })[0].value;
			    
			    $rootScope.image = $scope.profile['image']['url'];
			    $rootScope.name = $scope.profile['displayName'];
			    $rootScope.$apply();
			  };
    });

;

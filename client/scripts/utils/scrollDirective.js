angular.module('directives.skrollr', [])
	.directive('skrollr', [function() {
    var directiveDefinitionObject = {
      link: function() {
        skrollr.init({
		    forceHeight: false,
		    smoothScrolling:true,
		    render: function(data) {              
		      //Debugging - Log the current scroll position.
		      //console.log(data.curTop);
		    },
		    mobileCheck: function() {
		      return false;
		    }
		  });
      }
    };

    return directiveDefinitionObject;
  }]);

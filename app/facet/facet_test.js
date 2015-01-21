'use strict';

describe('descubre.facet module', function() {
  var scope, ctrl, sanitize;
  beforeEach(module('descubre.facet'));

  describe('facet controller', function(){
	
  	beforeEach(inject(function ($rootScope, $sanitize) {
        scope = $rootScope.$new();
        sanitize = $sanitize;
    }));

    it('Tiene que cargar datos de actividades', inject(function($controller) {
    	ctrl = $controller('FacetCtrl', {
	    	$scope: scope,
	    	$sanitize : sanitize
	  	});
      	expect(ctrl).toBeDefined();
      	// console.log(scope.actividades);
      	// expect(scope.actividades).toBeDefined();

    }));

  });
});
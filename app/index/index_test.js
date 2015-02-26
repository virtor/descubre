'use strict';

describe('descubre.index module', function() {
  var scope, ctrl, sanitize;
  beforeEach(module('descubre.index'));

  describe('index controller', function(){
	
  	beforeEach(inject(function ($rootScope, $sanitize) {
        scope = $rootScope.$new();
        sanitize = $sanitize;
        $rootScope.strings = strings.es;
        $rootScope.query = query;
    }));

    it('Tiene que cargar datos de actividades', inject(function($controller) {
    	ctrl = $controller('IndexCtrl', {
	    	$scope: scope,
	    	$sanitize : sanitize
	  	});
      	expect(ctrl).toBeDefined();
      	console.log(scope.actividades);
      	expect(scope.actividades).toBeDefined();

    }));

  });
});
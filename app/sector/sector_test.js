'use strict';

describe('descubre.sector module', function() {
var scope, ctrl, routeParams;

  beforeEach(module('descubre.sector'));

  describe('sector controller', function(){

	beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
        routeParams = {};
        $rootScope.strings = strings.es;
	    $rootScope.query = query;
    }));

	it('Debe cargar infancia', inject(function ($controller) {
	  routeParams.idSector = 'infancia';
	  ctrl = $controller('SectorCtrl', {
	    $scope: scope,
	    $routeParams: routeParams
	  });

	  expect(ctrl).toBeDefined();
	}));

	it('Debe cargar jovenes', inject(function ($controller) {
	  routeParams.idSector = 'jovenes';
	  ctrl = $controller('SectorCtrl', {
	    $scope: scope,
	    $routeParams: routeParams
	  });

	  expect(ctrl).toBeDefined();
	}));

	it('Debe cargar mayores', inject(function ($controller) {
	  routeParams.idSector = 'mayores';
	  ctrl = $controller('SectorCtrl', {
	    $scope: scope,
	    $routeParams: routeParams
	  });

	  expect(ctrl).toBeDefined();
	}));

  });
});
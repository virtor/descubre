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

	it('Debe cargar', inject(function ($controller) {
	  routeParams.idSector = 'infancia';
	  // console.log(routeParams);
	  ctrl = $controller('SectorCtrl', {
	    $scope: scope,
	    $routeParams: routeParams
	  });

	  expect(ctrl).toBeDefined();
	}));

  });
});
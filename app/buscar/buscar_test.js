/*'use strict';

describe('descubre.sector module', function() {
var scope, ctrl, routeParams;

  beforeEach(module('descubre.buscar'));

  describe('buscar controller', function(){

 //  beforeEach(inject(function(_$rootScope_, _$controller_,_$routeParams_){
 //        $rootScope = _$rootScope_;
 //        $scope = $rootScope.$new();
 //        $controller = _$controller_;
 //        $controller('SectorCtrl', {
 //    		'$rootScope': $rootScope,
 //    		'$scope': $scope,
 //    		'$routeParams': {
 //        		'idSector': 'Infancia'
 //    		}
	// });



  }));
	beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
        routeParams = {};
    }));

	it('Debe cargar', inject(function ($controller) {
	  routeParams.idSector = 'Infancia';
	  // console.log(routeParams);
	  ctrl = $controller('BuscarCtrl', {
	    $scope: scope,
	    $routeParams: routeParams
	  });

	  expect(ctrl).toBeDefined();
	}));

  });
});
*/
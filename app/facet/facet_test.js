'use strict';

describe('descubre.facet module', function() {
  var scope, ctrl, sanitize, routeParams;
  beforeEach(module('descubre.facet'));

  describe('facet controller', function(){
	 var $controller;
  	beforeEach(inject(function ($rootScope, $sanitize,_$controller_) {
        scope = $rootScope.$new();
        sanitize = $sanitize;
        routeParams = {};
        $rootScope.strings = strings.es;
        $rootScope.query = query;
        $controller = _$controller_;
    }));

    it('Tiene que cargar datos de actividades', inject(function() {
      var $scope = {};
      var $sanitize = {};
      routeParams.categoria = 'agenda';
    	ctrl = $controller('FacetCtrl', {
	    	$scope: $scope,
        $routeParams: routeParams,
	    	$sanitize : $sanitize
	  	});
      	expect(ctrl).toBeDefined();
        $scope.loadMore();
      	expect($scope.resultados).toBeDefined();

    }));
     it('debe filtrar por faceta', function() {
      var $scope = {};
      var $sanitize = {};
      routeParams.categoria = 'agenda';
      ctrl = $controller('FacetCtrl', {
        $scope: $scope,
        $routeParams: routeParams,
        $sanitize : $sanitize
      });
      $scope.filtrarFaceta("Teatro");
      expect($scope.resultados.length).toBe(0);
    });
     it('Tiene que cargar datos de restaurantes', inject(function() {
      var $scope = {};
      var $sanitize = {};
      routeParams.categoria = 'gastronomia';
      ctrl = $controller('FacetCtrl', {
        $scope: $scope,
        $routeParams: routeParams,
        $sanitize : $sanitize
      });
        expect(ctrl).toBeDefined();
        $scope.loadMore();
        expect($scope.resultados).toBeDefined();

    }));

     it('Tiene que cargar datos de alojamientos', inject(function() {
      var $scope = {};
      var $sanitize = {};
      routeParams.categoria = 'alojamiento';
      ctrl = $controller('FacetCtrl', {
        $scope: $scope,
        $routeParams: routeParams,
        $sanitize : $sanitize
      });
        expect(ctrl).toBeDefined();
        $scope.loadMore();
        expect($scope.resultados).toBeDefined();

    }));

    it('debe borrar los filtros al ejecutar borrarFiltros', function() {
      var $scope = {};
      var $sanitize = {};
      ctrl = $controller('FacetCtrl', {
        $scope: $scope,
        $sanitize : $sanitize
      });
      $scope.borrarFiltros();
      expect($scope.resultados.length).toBe(0);
    });

  });
});
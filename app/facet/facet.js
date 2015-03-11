'use strict';

angular.module('descubre.facet', ['ngRoute', 'descubre.services', 'filtros', 'ngSanitize','infinite-scroll', 'ngMaterial'])
 
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/facet/:categoria', {
    templateUrl: 'facet/facet.html',
    controller: 'FacetCtrl as ctrl'
  });
}])

.controller('FacetCtrl', ['$scope', 'Query', '$filter', '$routeParams','$rootScope','$mdSidenav', function($scope, Query, $filter, $routeParams,$rootScope,$mdSidenav) {
    $mdSidenav('left').close();

    var categoria = $routeParams.categoria;
    var faceta = '';
    var queryFacet = '';
    var queryDefecto = '';
    var fq = '';
    $scope.busy = false;
    if (categoria === 'gastronomia') {
      faceta = 'filter(?tipo="{0}") .';
      queryFacet = query.faceta.gastronomy.facet;
      queryDefecto = query.faceta.gastronomy.query;
      $scope.vocab = 'restaurante';
      $scope.titleh2 = $rootScope.strings.nav.gastronomy;
    } else if (categoria === 'agenda') {
      faceta = '?uri skos:broader <{0}> .';
      queryFacet = query.faceta.events.facet;
      queryDefecto = query.faceta.events.query;
      $scope.vocab = 'evento';
      $scope.titleh2 = $rootScope.strings.nav.events;
    } else if (categoria === 'alojamiento') {
      faceta = '?uri <http://vocab.linkeddata.es/datosabiertos/def/turismo/alojamiento#categoria> "{0}". ';
      queryFacet = query.faceta.accommodation.facet;
      queryDefecto = query.faceta.accommodation.query;
      $scope.vocab = 'alojamiento';
      $scope.titleh2 = $rootScope.strings.nav.accommodation;
    }
    var params = {};
    params.start = 0;
    $scope.filtroFaceta = '';
    $scope.resultados = [];
    $scope.facetas = [];
    params.continua = true;
    $scope.loadMore = function() {
      if ($scope.busy || !params.continua) {
        $scope.busy = true;
        return;
      }
      Query.list(queryDefecto.format($scope.filtroFaceta) + ' OFFSET ' + params.start + ' LIMIT 50').then(function(result) {
        $scope.resultados = $scope.resultados.concat(result.results.bindings);
        $scope.progresoCarga = $scope.progresoCarga + 50;
        $scope.busy = false;
        if (result.results.bindings.length > 0) {
          params.start += 50;
          params.continua = true;
        } else {
          params.continua = false;
        }
      });

      Query.list(queryFacet.format($scope.filtroFaceta)).then(function(result) {
        $scope.facetas = result.results.bindings;
        $scope.progresoCarga = $scope.progresoCarga + 50;
      });
    };


    $scope.filtrarFaceta = function(valor) {
      console.log(valor);
      if ($scope.busy) return;

      params.start = 0;
      $scope.resultados = [];
      $scope.facetas = [];
      params.continua = true;
      $scope.filtroFaceta = faceta.format(valor);
      $scope.loadMore();

    }
     $scope.borrarFiltros = function() {
      
      params.start = 0;
      $scope.resultados = [];
      $scope.facetas = [];
      params.continua = true;
      $scope.busy=false;
      $scope.filtroFaceta = '';
      $scope.loadMore();

    }
}]);
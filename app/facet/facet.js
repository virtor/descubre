'use strict';

angular.module('descubre.facet', ['ngRoute', 'descubre.services', 'filtros', 'ngSanitize','infinite-scroll'])
 
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/facet/:categoria', {
    templateUrl: 'facet/facet.html',
    controller: 'FacetCtrl as ctrl'
  });
}])

.controller('FacetCtrl', ['$scope', 'Query', '$filter', '$routeParams','$rootScope','$mdSidenav', function($scope, Query, $filter, $routeParams,$rootScope,$mdSidenav) {
    $mdSidenav('left').close();

    var categoria = $routeParams.categoria;
    var tipo = '';
    var faceta = '';
    var queryDefecto = '';
    var fq = '';
    $scope.busy = false;
    if (categoria === 'gastronomia') {
      tipo = 'Restaurantes';
      faceta = ['temas_smultiple'];
      queryDefecto = '';
      $scope.vocab = 'restaurante';
      $scope.titleh2 = $rootScope.strings.nav.gastronomy;
    } else if (categoria === 'agenda') {
      tipo = 'Actividades';
      faceta = ['temas_smultiple'];
      queryDefecto = ' AND -temas_smultiple:("Cursos y Talleres") AND -temas_smultiple:("Bibliotecas")';
      $scope.vocab = 'evento';
      $scope.titleh2 = $rootScope.strings.nav.events;
    } else if (categoria === 'alojamiento') {
      tipo = 'Alojamientos';
      faceta = ['temas_smultiple'];
      queryDefecto = '';
      $scope.vocab = 'alojamiento';
      $scope.titleh2 = $rootScope.strings.nav.accommodation;
    }
    var params = {};
    params.start = 0;
    $scope.resultados = [];
    $scope.facetas = [];

    $scope.loadMore = function() {
      if ($scope.busy) return;
      $scope.busy = true;
      Query.getSolr('*:*' + queryDefecto, tipo, faceta, fq, params.start, 50).then(function(resultados) {
          $scope.resultados = $scope.resultados.concat(resultados.response.docs);
          params.start += 50;
          var facetas = [];
          for(var key in resultados.facet_counts.facet_fields){
            var faceta = {};
            faceta.title = key;
            faceta.valores = [];
            var valor = {};
            for (var i = 0; i < resultados.facet_counts.facet_fields[key].length ; i++) {
              if (i % 2 == false) {
                valor.title=resultados.facet_counts.facet_fields[key][i];
              } else {
                valor.badge=resultados.facet_counts.facet_fields[key][i];
                faceta.valores.push(valor);
                valor = {};
              }
            }
            facetas.push(faceta);
          }
          $scope.facetas = facetas;
          $scope.busy = false;
      });
    };

    $scope.filtrarFaceta = function(faceta, valor) {

      if ($scope.busy) return;
      fq = faceta + ':("' + valor + '")';
      params.start = 0;

      Query.getSolr('*:*' + queryDefecto, tipo, faceta, fq, params.start, 50).then(function(resultados) {
          $scope.resultados = resultados.response.docs;
          var facetas = [];
          for(var key in resultados.facet_counts.facet_fields){
            var faceta = {};
            faceta.title = key;
            faceta.valores = [];
            var valor = {};
            for (var i = 0; i < resultados.facet_counts.facet_fields[key].length ; i++) {
              if (i % 2 == false) {
                valor.title=resultados.facet_counts.facet_fields[key][i];
              } else {
                valor.badge=resultados.facet_counts.facet_fields[key][i];
                faceta.valores.push(valor);
                valor = {};
              }
            }
            facetas.push(faceta);
          }
          $scope.facetas = facetas;
      });

    }
}]);
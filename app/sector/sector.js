'use strict';
angular.module('descubre.sector', ['ngRoute', 'descubre.services', 'filtros','ui.bootstrap', 'ngMaterial'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/para/:idSector', {
    templateUrl: 'sector/sector.html',
    controller: 'SectorCtrl as ctrl'
  });
}])

.controller('SectorCtrl', ['$scope', 'Query', '$filter', '$routeParams','$mdSidenav','$rootScope', function($scope, Query, $filter, $routeParams, $mdSidenav, $rootScope) {
  $mdSidenav('left').close();

  $scope.isCollapsed = true;

	var sector = $routeParams.idSector;
  var idSector = '';
  var idSectorActo = '';
	if (sector === 'infancia') {
    $scope.titleh2 = $rootScope.strings.nav.child;
    idSector = '18';
    idSectorActo = '1';
  } else if (sector === 'jovenes') {
    $scope.titleh2 = $rootScope.strings.nav.young;
    idSector = '12';
    idSectorActo = '2';
    this.menu = $rootScope.strings.sector.youth.menu;
  } else if (sector === 'mayores') {
    $scope.titleh2 = $rootScope.strings.nav.elder;
    idSector = '17';
    idSectorActo = '3';
  }
  $scope.equipamientos=[]
  var params = {};
  params.startRecurso = 0;
  params.continua = true;

  params.query = $rootScope.query.sector.events.format(idSectorActo);
  $scope.opt = 'event';

  $scope.mostrar = function(tipo, uri) {
    $scope.isCollapsed = true;
    $scope.opt = tipo;
    if (angular.isDefined(uri)) {
      $scope.busy = true;
      Query.getApi(uri).then(function(resultado) {
        
        if (resultado.result && resultado.result.length > 0) {
          $scope.equipamientos=[];
          for (var i in resultado.result) {
            var result = resultado.result[i];
            $scope.equipamientos.push(result);
          }
        }
      }, function(reason) {
          alert('ERROR:' + reason);
      });
    } else {
      $scope.busy = false;
      params.continua = true;
      if (tipo==='event') {
        params.query = $rootScope.query.sector.events.format(idSectorActo);
      } else {
        params.query = $rootScope.query.sector.resources.format(idSector);
      }
      params.startRecurso = 0;
      $scope.equipamientos=[];
      $scope.loadMoreRecurso();
    }
  }

  $scope.loadMoreRecurso = function() {
    if ($scope.busy || !params.continua) {
      $scope.busy = true;
      return;
    }
    $scope.busy = true;
    Query.list(params.query + ' OFFSET ' + params.startRecurso + ' LIMIT 50').then(function(result) {
        $scope.busy = false;
        $scope.equipamientos = $scope.equipamientos.concat(result.results.bindings);
        if (result.results.bindings.length > 0) {
          params.startRecurso += 50;
          params.continua = true;
        } else {
          params.continua = false;
        }

      });
    };
}]);
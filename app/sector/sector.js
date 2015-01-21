'use strict';
angular.module('descubre.sector', ['ngRoute', 'descubre.services', 'filtros'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/para/:idSector', {
    templateUrl: 'sector/sector.html',
    controller: 'SectorCtrl as ctrl'
  });
}])

.controller('SectorCtrl', ['$scope', 'Query', '$filter', '$routeParams', function($scope, Query, $filter, $routeParams) {
	var sector = $routeParams.idSector;
	if (sector === 'infancia') {
      $scope.titleh2 = 'Infancia';
    } else if (sector === 'jovenes') {
      $scope.titleh2 = 'Jóvenes';
    } else if (sector === 'mayores') {
      $scope.titleh2 = 'Personas Mayores';
    }
}]);
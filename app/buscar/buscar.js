'use strict';
angular.module('descubre.buscar', ['ngRoute', 'descubre.services', 'filtros'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/buscar/:consulta', {
    templateUrl: 'buscar/buscar.html',
    controller: 'BuscarCtrl as ctrl'
  });
}])

.controller('BuscarCtrl', ['$scope', 'Query', '$filter', '$routeParams', function($scope, Query, $filter, $routeParams) {
	$scope.consulta = $routeParams.consulta;

	Query.list('SELECT DISTINCT ?uri ?title ?latitud ?longitud \
		WHERE { \
		 ?uri ?s  ?p. \
		 ?uri rdfs:label  ?title. \
		 ?uri geo:geometry ?geo. \
		 ?geo geo:lat ?latitud. \
		 ?geo geo:long ?longitud. \
		FILTER (REGEX(STR(?p), "' + $scope.consulta.toLowerCase() + '", "i")) \
		} LIMIT 50').then(function(result) {
        $scope.resultado = result.results.bindings;
    });

}]);

'use strict';
angular.module('descubre.buscar', ['ngRoute', 'descubre.services', 'filtros', 'ngMaterial'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/buscar/:consulta', {
        templateUrl: 'buscar/buscar.html',
        controller: 'BuscarCtrl as ctrl'
    });
}])

.controller('BuscarCtrl', ['$scope', 'Query', '$filter', '$routeParams', '$mdSidenav', '$rootScope', function($scope, Query, $filter, $routeParams, $mdSidenav, $rootScope) {
    $scope.consulta = $routeParams.consulta;
    $mdSidenav('left').close();
    var cons = $scope.consulta.toLowerCase().trim();
    if (cons.indexOf(' ') > 0) {
        var arr = cons.split(' ');
        cons = '';
        for (var i = 0; i < arr.length; i++) {
            cons = cons + '(?=.*' + arr[i] + ')'
        }

    }
    var params = {};
    params.start = 0;
    params.continua = true;
    $scope.resultado = [];
    $scope.loadMore = function() {
        if ($scope.busy || !params.continua) return;
        $scope.busy = true;
        Query.list($rootScope.query.search.format(cons, params.start)).then(function(result) {
            $scope.busy = false;
            $scope.resultado = $scope.resultado.concat(result.results.bindings);
            if (result.results.bindings.length > 0) {
                params.start += 50;
            } else {
                params.continua = false;
            }
        });
    };
}]);

'use strict';

// Declare app level module which depends on views, and components
angular.module('descubre', [
  'ngRoute',
  'ngSanitize', 
  'descubre.index',
  'descubre.sector',
  'descubre.facet',
  'descubre.buscar',
  'descubre.version',
  'descubre.services',
  'filtros',
  'infinite-scroll',
  'descubre.directives',
  'leaflet-directive'
]).run(function($rootScope) {
    $rootScope.strings = strings.es;
    $rootScope.query = query;
}).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/index'});
}]).controller('MenuCtrl', ['$scope', '$mdSidenav', '$location', function($scope, $mdSidenav, $location) {
  $scope.openMenu = function() {
       $mdSidenav('left').open();
    };
  $scope.buscar = function() {
       $location.path('/buscar/' + $scope.consulta);
    };
}])
;

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
    'ngMaterial',
    'infinite-scroll',
    'descubre.directives',
    'leaflet-directive'
]).run(function($rootScope) {
    $rootScope.strings = strings.es;
    $rootScope.query = query;
}).
config(['$routeProvider', '$mdThemingProvider', function($routeProvider, $mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryColor('red')
            .accentColor('green');
        console.log($mdThemingProvider.theme('default'));
        // $mdThemingProvider.theme('default')
        //   .primaryPalette('pink')
        //   .accentPalette('orange');

        $routeProvider.otherwise({
            redirectTo: '/index'
        });

    }]).controller('MenuCtrl', ['$scope', '$mdSidenav', '$location', 'Agenda', function($scope, $mdSidenav, $location, Agenda) {

        $scope.openMenu = function() {
            $mdSidenav('left').open();
        };
        $scope.toggleRight = function() {
            $mdSidenav('right').toggle();
            console.log(Agenda.list());
            $scope.items = Agenda.list();
        };
        $scope.closeRight = function() {
            $mdSidenav('right').close();
        };
        $scope.removeAgenda = function(id, fecha, tipo) {
          Agenda.remove(id, fecha, tipo);
          $scope.items = Agenda.list();
        };
        $scope.updateAgenda = function(id, fecha, tipo) {
          var registro = {};
          registro.uri = 'http://aasdasd';
          registro.title='titulo';
          registro.date='2015-02-25';
          registro.startTime='16:00';
          registro.endTime='18:00';
          Agenda.update(id, fecha, tipo, registro);
          $scope.items = Agenda.list();
        };
    }])
    .controller('BusquedaCtrl', ['$scope', '$location', function($scope, $location) {
        $scope.buscar = function() {
            $location.path('/buscar/' + $scope.consulta);
        };
    }]);

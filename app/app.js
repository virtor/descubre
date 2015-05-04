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

    }]).controller('MenuCtrl', ['$scope', '$mdSidenav','$mdDialog', '$location', 'Agenda', function($scope, $mdSidenav, $mdDialog, $location, Agenda) {

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
        $scope.updateAgenda = function(ev, id, fecha, tipo) {

            $mdDialog.show({
              controller: DialogCtrl,
              templateUrl: 'index/edit.tmpl.html',
              targetEvent: ev,
              locals: {
                id: id,
                fecha: fecha,
                tipo: tipo,
              }
            })
            .then(function(registro) {
              // var registro = {};
              // registro.uri = 'http://aasdasd';
              // registro.title='titulo';
              // registro.date='2015-02-25';
              // registro.startTime='16:00';
              // registro.endTime='18:00';
              console.log("GUARDA!!");
              console.log(registro);
              Agenda.update(id, fecha, tipo, registro);
              $scope.items = Agenda.list();
            }, function() {
              $scope.alert = 'You cancelled the dialog.';
            });

        };
    }])
    .controller('BusquedaCtrl', ['$scope', '$location', function($scope, $location) {
        $scope.buscar = function() {
            $location.path('/buscar/' + $scope.consulta);
        };
    }]);
function DialogCtrl($scope, $mdDialog, id,fecha,tipo, Agenda) {
    $scope.registro = Agenda.get(id, fecha, tipo);
  
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.guardar = function() {
    $mdDialog.hide($scope.registro);
  };
}
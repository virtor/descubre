'use strict';

describe('descubre.sector module', function() {
    var element, scope, ctrl, routeParams, window;

    beforeEach(module('descubre.buscar'));

    describe('buscar controller', function() {

        beforeEach(inject(function($rootScope, $window) {
            scope = $rootScope.$new();
            routeParams = {};
            $rootScope.strings = strings.es;
            $rootScope.query = query;
            window = $window;
            element = angular.element('<div infinite-scroll></div>');

        }));

        it('Debe cargar', inject(function($controller) {
            routeParams.consulta = 'cachirulo';
            ctrl = $controller('BuscarCtrl', {
                $scope: scope,
                $routeParams: routeParams
            });

            expect(ctrl).toBeDefined();
        }));

        it('Debe cargar', inject(function($controller) {
            var $scope = {};
            routeParams.consulta = 'restaurante cachirulo';
            ctrl = $controller('BuscarCtrl', {
                $scope: $scope,
                $routeParams: routeParams
            });

            expect(ctrl).toBeDefined();
            $scope.loadMore();
            expect($scope.resultado).toBeDefined();
        }));

    });
});

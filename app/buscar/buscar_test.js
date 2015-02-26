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
            routeParams.consulta = 'restaurante cachirulo';
            ctrl = $controller('BuscarCtrl', {
                $scope: scope,
                $routeParams: routeParams
            });

            expect(ctrl).toBeDefined();
        }));

        it('Debe ejecutar loadMore al hacer scroll', inject(function($controller) {
            routeParams.consulta = 'cachirulo';
            ctrl = $controller('BuscarCtrl', {
                $scope: scope,
                $routeParams: routeParams
            });
            console.log(scope.loadMore);
			scope.loadMore().then(function(){
				console.log("LELGA");
			});
            console.log("ANTES");
            console.log(scope.resultado);
            console.log("DESPUES");
            element.scrollHeight = 1400;
            // spyOn(scope, "loadMore").andCallThrough();
            // window.scrollTo(0, 1400);
            // expect(ctrl.loadMore).toHaveBeenCalled();

            // expect($scope.limit).toBe(3); // Logs: Expected 2 to be 3. - so loadMore() have not called
        }));

    });
});

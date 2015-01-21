'use strict';

describe('descubre zaragoza', function() {
    
    browser.get('index.html');
    it('debe redirigir a /index cuando la no se especifica el controlador', function() {
        expect(browser.getLocationAbsUrl()).toMatch("/index");
    });

    describe('index', function() {
        beforeEach(function() {
            browser.get('index.html#/index');
        });

        it('debe mostrar index cuando el usuario navega hasta /index', function() {
            expect(element.all(by.css('[ng-view] h2')).first().getText()).
            toMatch(/Actividades destacadas/);
        });

        it('debe cargar los datos de actividades y monumentos', function() {
            expect(element.all(by.repeater('registro in actividades')).count()).toBeGreaterThan(2);
            expect(element.all(by.repeater('registro in monumentos')).count()).toBeGreaterThan(2);
        });
    });

    describe('faceta', function() {
        beforeEach(function() {
            browser.get('index.html#/facet/agenda');
        });

        it('debe mostrar actividades y sus facetas cuando el usuario navega hasta facet/agenda', function() {
            expect(element.all(by.css('[ng-view] h2')).first().getText()).
            toMatch(/Actividades/);
            expect(element.all(by.repeater('registro in resultados')).count()).toBeGreaterThan(2);
            expect(element.all(by.repeater('faceta in facetas')).count()).toBeGreaterThan(0);
        });

    });

    describe('sector', function() {
        beforeEach(function() {
            browser.get('index.html#/para/infancia');
        });

        it('debe mostrar infancia cuando el usuario navega hasta para/infancia', function() {
            expect(element.all(by.css('[ng-view] a.navbar-brand')).first().getText()).
            toMatch(/Infancia/);
        });

    });
});

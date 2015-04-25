'use strict';

describe('index', function() {
    //beforeEach(function() {
    browser.get('index.html');
    //});
	it('debe redirigir a /index cuando no se especifica el controlador', function() {
	        expect(browser.getLocationAbsUrl()).toMatch("/index");
	});

    it('debe mostrar index cuando el usuario navega hasta /index', function() {
        expect(element.all(by.css('[ng-view] h2')).first().getText()).
        	toMatch(/Actividades destacadas/);
    });

    it('debe cargar los datos de actividades y monumentos', function() {
            expect(element.all(by.repeater('registro in actividades')).count()).toBeGreaterThan(2);
            expect(element.all(by.repeater('registro in monumentos')).count()).toBeGreaterThan(2);
    });

	it('debe mostrar el detalle de la actividad', function() {
		var accordion = element.all(by.css('[ng-view] .panel-title')).first();
		accordion.click().then(function() {
			expect(element.all(by.css('[ng-view] .panel-body')).first().isPresent()).toBeTruthy();
			expect(element.all(by.css('[ng-view] .panel-body .angular-leaflet-map')).first().isPresent()).toBeTruthy();
		}); 

    });

    it('debe mostrar alojamientos cercanos', function() {
        var btnAlojamiento = element.all(by.css('[ng-view] .panel-body #btnAlojamientoCercano')).first();        
        btnAlojamiento.click().then(function() {
            browser.driver.sleep(2000);
            expect(by.model('markers')).toBeDefined();
        });
    });

    it('debe poder agregarse el elemento a la Agenda', function() {
        var btnAddCalendar = element.all(by.css('[ng-view] .btnAddCalendar')).first();
        btnAddCalendar.click().then(function() {
            expect(browser.executeScript("sessionStorage.getItem('items');")).toBeDefined();
        });
    });

	it('debe mostrar el detalle de un monumento', function() {
       var accordion = element.all(by.css('[ng-view] #acordeon_mon .panel-title')).first();
		accordion.click().then(function() {
			expect(element.all(by.css('[ng-view] #acordeon_mon .panel-body')).first().isPresent()).toBeTruthy();
			expect(element.all(by.css('[ng-view] #acordeon_mon .panel-body .angular-leaflet-map')).first().isPresent()).toBeTruthy();
		}); 
    });


});

describe('faceta', function() {
    beforeEach(function() {
        browser.get('index.html#/facet/agenda');
    });

    it('debe mostrar actividades y sus facetas cuando el usuario navega hasta facet/agenda', function() {
        expect(element.all(by.css('[ng-view] h2')).first().getText()).
        	toMatch(/Actividades/);
        expect(element.all(by.repeater('dato in facetas')).count()).toBeGreaterThan(0);
        expect(element.all(by.repeater('registro in resultados')).count()).toBeGreaterThan(2);
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

describe('buscar', function() {
    beforeEach(function() {
        browser.get('index.html#/buscar/aragon');
    });

    it('debe mostrar listado de coincidencias con la palabra aragon', function() {
        expect(element.all(by.repeater('registro in resultado')).count()).toBeGreaterThan(2);
    });

});



'use strict';

describe('index', function() {

    browser.get('index.html');

    it('RF-1. Mostrar actividades destacadas', function() {
        expect(element.all(by.repeater('registro in actividades')).count()).toBeGreaterThan(2);
    });

    it('RF-2. Mostrar monumentos destacados', function() {
        expect(element.all(by.repeater('registro in monumentos')).count()).toBeGreaterThan(2);
    });

    it('RF-3. Mostrar el detalle del un registro y su localización', function() {
        var accordion = element.all(by.css('[ng-view] .panel-title')).first();
        accordion.click().then(function() {
            expect(element.all(by.css('[ng-view] .panel-body')).first().isPresent()).toBeTruthy();
            expect(element.all(by.css('[ng-view] .panel-body .angular-leaflet-map')).first().isPresent()).toBeTruthy();
        });

    });

    it('RF-4. Mostrar recursos cercanos a un registro', function() {
        var btnAlojamiento = element.all(by.css('[ng-view] .panel-body #btnAlojamientoCercano')).first();
        btnAlojamiento.click().then(function() {
            browser.driver.sleep(1000);
            expect(by.model('markers')).toBeDefined();
        });
    });

    it('RF-10. Crear agenda con los recursos que se desean visitar', function() {
        var btnAddCalendar = element.all(by.css('[ng-view] .btnAddCalendar')).first();
        btnAddCalendar.click().then(function() {
            expect(browser.executeScript("sessionStorage.getItem('items');")).toBeDefined();
        });
    });


});

describe('Actividades', function() {
    beforeEach(function() {
        browser.get('index.html#/facet/agenda');
    });
    it('RF-7. Consulta de actividades', function() {
        expect(element.all(by.css('[ng-view] h2')).first().getText()).
        toMatch(/Actividades/);
        expect(element.all(by.repeater('dato in facetas')).count()).toBeGreaterThan(0);
        expect(element.all(by.repeater('registro in resultados')).count()).toBeGreaterThan(2);
    });
    it('RF-7. Filtro de actividades', function() {
        var btnFiltro = element.all(by.css('[ng-view] .nav button')).first();
        btnFiltro.click().then(function() {
            browser.driver.sleep(1000);
            expect(element.all(by.repeater('registro in resultados')).count()).toBeGreaterThan(2);
        });
    });

});

describe('Alojamientos', function() {
    beforeEach(function() {
        browser.get('index.html#/facet/alojamiento');
    });
    it('RF-8. Consulta de alojamientos', function() {
        expect(element.all(by.css('[ng-view] h2')).first().getText()).
        toMatch(/Alojamiento/);
        expect(element.all(by.repeater('dato in facetas')).count()).toBeGreaterThan(0);
        expect(element.all(by.repeater('registro in resultados')).count()).toBeGreaterThan(2);
    });
    it('RF-8. Filtro de alojamientos', function() {
        var btnFiltro = element.all(by.css('[ng-view] .nav button')).first();
        btnFiltro.click().then(function() {
            browser.driver.sleep(1000);
            expect(element.all(by.repeater('registro in resultados')).count()).toBeGreaterThan(2);
        });
    });

});

describe('Restaurantes', function() {
    beforeEach(function() {
        browser.get('index.html#/facet/gastronomia');
    });
    it('RF-9. Consulta de restaurantes', function() {
        expect(element.all(by.css('[ng-view] h2')).first().getText()).
        toMatch(/Gastronomía/);
        expect(element.all(by.repeater('dato in facetas')).count()).toBeGreaterThan(0);
        expect(element.all(by.repeater('registro in resultados')).count()).toBeGreaterThan(2);
    });

    it('RF-9. Filtro de restaurantes', function() {
        var btnFiltro = element.all(by.css('[ng-view] .nav button')).first();
        btnFiltro.click().then(function() {
            browser.driver.sleep(1000);
            expect(element.all(by.repeater('registro in resultados')).count()).toBeGreaterThan(2);
        });
    });

});

describe('Infancia', function() {
    beforeEach(function() {
        browser.get('index.html#/para/infancia');
    });

    it('RF-6. Preparar apartados según el sector de población: infancia actividades', function() {
        expect(element.all(by.css('[ng-view] a.navbar-brand')).first().getText()).
        toMatch(/Infancia/);
        expect(element.all(by.repeater('registro in equipamientos')).count()).toBeGreaterThan(2);
    });
    it('RF-6. Preparar apartados según el sector de población: infancia recursos', function() {

        element.all(by.css('[ng-view] #btnnav_interior')).isDisplayed().then(function (isVisible) {
            if (isVisible[0]) {
                var interior = element.all(by.css('[ng-view] #btnnav_interior'));
                 interior.click();
                 browser.driver.sleep(1000);
            } 
            var btn = element.all(by.css('[ng-view] #btnRecurso'));
            btn.click().then(function() {
                browser.driver.sleep(1000);
                expect(element.all(by.repeater('registro in equipamientos')).count()).toBeGreaterThan(2);
            });
        });

    });
});

describe('Personas Mayores', function() {
    beforeEach(function() {
        browser.get('index.html#/para/mayores');
    });

    it('RF-6. Preparar apartados según el sector de población: personas mayores actividades', function() {
        expect(element.all(by.css('[ng-view] a.navbar-brand')).first().getText()).
        toMatch(/Personas Mayores/);
        expect(element.all(by.repeater('registro in equipamientos')).count()).toBeGreaterThan(2);
    });
    it('RF-6. Preparar apartados según el sector de población: personas mayores recursos', function() {
        element.all(by.css('[ng-view] #btnnav_interior')).isDisplayed().then(function (isVisible) {
            if (isVisible[0]) {
                var interior = element.all(by.css('[ng-view] #btnnav_interior'));
                 interior.click();
                 browser.driver.sleep(1000);
            } 
            var btn = element.all(by.css('[ng-view] #btnRecurso'));
            btn.click().then(function() {
                browser.driver.sleep(1000);
                expect(element.all(by.repeater('registro in equipamientos')).count()).toBeGreaterThan(2);
            });
        });
    });
});
describe('Jovenes', function() {
    beforeEach(function() {
        browser.get('index.html#/para/jovenes');
    });

    it('RF-6. Preparar apartados según el sector de población: jovenes actividades', function() {
        expect(element.all(by.css('[ng-view] a.navbar-brand')).first().getText()).
        toMatch(/Jóvenes/);
        expect(element.all(by.repeater('registro in equipamientos')).count()).toBeGreaterThan(2);
    });
    it('RF-6. Preparar apartados según el sector de población: jovenes recursos', function() {
        element.all(by.css('[ng-view] #btnnav_interior')).isDisplayed().then(function (isVisible) {
            if (isVisible[0]) {
                var interior = element.all(by.css('[ng-view] #btnnav_interior'));
                 interior.click();
                 browser.driver.sleep(1000);
            } 
            var btn = element.all(by.css('[ng-view] #btnRecurso'));
            btn.click().then(function() {
                browser.driver.sleep(1000);
                expect(element.all(by.repeater('registro in equipamientos')).count()).toBeGreaterThan(2);
            });
        });
    });
    it('RF-6. Preparar apartados según el sector de población: jovenes zonas marcha', function() {
        element.all(by.css('[ng-view] #btnnav_interior')).isDisplayed().then(function (isVisible) {
            if (isVisible[0]) {
                var interior = element.all(by.css('[ng-view] #btnnav_interior'));
                 interior.click();
                 browser.driver.sleep(1000);
            } 
            var btn = element.all(by.css('[ng-view] #btnmarcha'));
            btn.click().then(function() {
                browser.driver.sleep(1000);
                expect(element.all(by.repeater('registro in equipamientos')).count()).toBeGreaterThan(2);
            });
        });
    });
    it('RF-6. Preparar apartados según el sector de población: jovenes noche', function() {
        element.all(by.css('[ng-view] #btnnav_interior')).isDisplayed().then(function (isVisible) {
            if (isVisible[0]) {
                var interior = element.all(by.css('[ng-view] #btnnav_interior'));
                 interior.click();
                 browser.driver.sleep(1000);
            } 
            var btn = element.all(by.css('[ng-view] #btnnoche'));
            btn.click().then(function() {
                browser.driver.sleep(1000);
                expect(element.all(by.repeater('registro in equipamientos')).count()).toBeGreaterThan(2);
            });
        });

    });
    it('RF-6. Preparar apartados según el sector de población: jovenes tomar algo', function() {
        element.all(by.css('[ng-view] #btnnav_interior')).isDisplayed().then(function (isVisible) {
            if (isVisible[0]) {
                var interior = element.all(by.css('[ng-view] #btnnav_interior'));
                 interior.click();
                 browser.driver.sleep(1000);
            } 
            var btn = element.all(by.css('[ng-view] #btntomar'));
            btn.click().then(function() {
                browser.driver.sleep(1000);
                expect(element.all(by.repeater('registro in equipamientos')).count()).toBeGreaterThan(2);
            });
        });

    });
    it('RF-6. Preparar apartados según el sector de población: jovenes musica en vivo', function() {
        element.all(by.css('[ng-view] #btnnav_interior')).isDisplayed().then(function (isVisible) {
            if (isVisible[0]) {
                var interior = element.all(by.css('[ng-view] #btnnav_interior'));
                 interior.click();
                 browser.driver.sleep(1000);
            } 
            var btn = element.all(by.css('[ng-view] #btnenvivo'));
            btn.click().then(function() {
                browser.driver.sleep(1000);
                expect(element.all(by.repeater('registro in equipamientos')).count()).toBeGreaterThan(2);
            });
        });
        
    });
    it('RF-6. Preparar apartados según el sector de población: jovenes zonas verdes', function() {
        element.all(by.css('[ng-view] #btnnav_interior')).isDisplayed().then(function (isVisible) {
            if (isVisible[0]) {
                var interior = element.all(by.css('[ng-view] #btnnav_interior'));
                 interior.click();
                 browser.driver.sleep(1000);
            } 
            var btn = element.all(by.css('[ng-view] #btnzonasverdes'));
            btn.click().then(function() {
                browser.driver.sleep(1000);
                expect(element.all(by.repeater('registro in equipamientos')).count()).toBeGreaterThan(2);
            });
        });

    });
    it('RF-6. Preparar apartados según el sector de población: jovenes de compras', function() {
        element.all(by.css('[ng-view] #btnnav_interior')).isDisplayed().then(function (isVisible) {
            if (isVisible[0]) {
                var interior = element.all(by.css('[ng-view] #btnnav_interior'));
                 interior.click();
                 browser.driver.sleep(1000);
            } 
            var btn = element.all(by.css('[ng-view] #btncompras'));
            btn.click().then(function() {
                browser.driver.sleep(1000);
                expect(element.all(by.repeater('registro in equipamientos')).count()).toBeGreaterThan(2);
            });
        });
        
    });
    it('RF-6. Preparar apartados según el sector de población: jovenes de tapas', function() {

        element.all(by.css('[ng-view] #btnnav_interior')).isDisplayed().then(function (isVisible) {
            if (isVisible[0]) {
                var interior = element.all(by.css('[ng-view] #btnnav_interior'));
                 interior.click();
                 browser.driver.sleep(1000);
            } 
            var btn = element.all(by.css('[ng-view] #btntapas'));
            btn.click().then(function() {
                browser.driver.sleep(1000);
                expect(element.all(by.repeater('registro in equipamientos')).count()).toBeGreaterThan(2);
            });
        });
        
    });
    it('RF-6. Preparar apartados según el sector de población: jovenes ocio', function() {
        element.all(by.css('[ng-view] #btnnav_interior')).isDisplayed().then(function (isVisible) {
            if (isVisible[0]) {
                var interior = element.all(by.css('[ng-view] #btnnav_interior'));
                 interior.click();
                 browser.driver.sleep(1000);
            } 
            var btn = element.all(by.css('[ng-view] #btnocio'));
            btn.click().then(function() {
                browser.driver.sleep(1000);
                expect(element.all(by.repeater('registro in equipamientos')).count()).toBeGreaterThan(2);
            });
        });
        
    });
});

describe('buscar', function() {
    beforeEach(function() {
        browser.get('index.html#/buscar/aragon');
    });

    it('RF-5. Permitir búsqueda completa sobre los conjuntos de datos, ejemplo consulta: aragon', function() {
        expect(element.all(by.repeater('registro in resultado')).count()).toBeGreaterThan(2);
    });

});

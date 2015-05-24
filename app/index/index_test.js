'use strict';

describe('descubre.index module', function() {
  var scope, ctrl, detalleCtrl, scopeDetalle, sanitize, query, httpBackend;
  beforeEach(module('descubre.index'));

  describe('index controller', function(){
	
  	beforeEach(inject(function ($rootScope, $sanitize, $controller, $httpBackend) {
        scope = $rootScope.$new();
        scopeDetalle = scope.$new();
        $controller('DetalleController', {$scope: scopeDetalle});
        sanitize = $sanitize;
        $rootScope.strings = strings.es;
        $rootScope.query = query;
        httpBackend = $httpBackend;
    }));

    it('Tiene que cargar datos de actividades', inject(function($controller) {
      ctrl = $controller('IndexCtrl', {
        $scope: scope,
        $sanitize : sanitize
      });
        expect(ctrl).toBeDefined();
        expect(scope.actividades).toBeDefined();

    }));


    it('debe filtrar por restaurantes cercanos', function() {
      scopeDetalle.detalle = {};
      scopeDetalle.detalle.title = 'Nombre';
      scopeDetalle.detalle.longitud = {value:-0.885873};
      scopeDetalle.detalle.latitud = {value:41.6568};

      httpBackend.whenGET("http://www.zaragoza.es/api/recurso/turismo/restaurante?rows=200&fl=id,title,tenedores,description,geometry&srsname=wgs84&point=" + scopeDetalle.detalle.longitud.value + "%2C" + scopeDetalle.detalle.latitud.value + "&distance=1000")
        .respond({"totalCount":2,"start":0,"rows":200,"result":[{"id":1869,"title":"PASGON","tenedores":1,"geometry":{"type":"Point","coordinates":[-0.884252633814792,41.65597757002525]},"description":"C/ San Blas, 17 <strong><abbr title=\"Teléfono\">Tel.:</abbr></strong> 976 43 28 05"},{"id":23199,"title":"GIRASOL","tenedores":1,"geometry":{"type":"Point","coordinates":[-0.888975687994355,41.665407344819016]},"description":"C/Mariana Pineda, 16 <strong><abbr title=\"Teléfono\">Tel.:</abbr></strong> 976 73 58 92"}]});
      
      scopeDetalle.restaurantesCercanos();
      
      scope.$digest();
      
      httpBackend.flush();
      expect(scopeDetalle.markers).toBeDefined();
     
    });
 

    it('debe filtrar por actos cercanos', function() {
      scopeDetalle.detalle = {};
      scopeDetalle.detalle.title = 'Nombre';
      scopeDetalle.detalle.longitud = {value:-0.885873};
      scopeDetalle.detalle.latitud = {value:41.6568};

      httpBackend.whenGET("http://www.zaragoza.es/api/recurso/cultura-ocio/evento-zaragoza/?rows=200&fl=id,title,start_date,end_date,subEvent,description,geometry&srsname=wgs84&point=" + scopeDetalle.detalle.longitud.value + "%2C" + scopeDetalle.detalle.latitud.value + "&distance=1000")
        .respond({"totalCount":2,"start":0,"rows":200,"result":[{"id":127994,"subEvent":[{"lugar":{},"horario":"Jueves de 17.30 a 18.30h","fechaInicio":"2014-10-06T00:00:00Z","fechaFinal":"2015-06-24T00:00:00Z","horaInicio":"17:30"}],"title":"Orquesta Social <em>Sonidos de Colores</em>","description":"<p>Este curso se enmarca dentro del Proyecto <strong>Vivem&uacute;sica </strong>, un proyecto nacido de la Participaci&oacute;n de los vecinos y vecinas, de  entidades sociales y vecinales e instituciones y servicios municipales  asentados en el Barrio del Gancho y que tienen relaci&oacute;n con la M&uacute;sica.</p>","geometry":{"type":"Point","coordinates":[-0.8858733232541208,41.65678359888764]}},{"id":117082,"subEvent":[{"lugar":{},"horario":"<ul>\r\n    <li>Martes a sábado, de 10 a 14 y de 17 a 21h</li>\r\n    <li>Domingo, de 10 a 14:30h</li>\r\n    <li>Lunes, cerrado</li>\r\n</ul>","fechaInicio":"2014-05-16T00:00:00Z","fechaFinal":"2015-05-30T00:00:00Z","horaInicio":"10:00"}],"title":"La escultura del emperador Augusto en Zaragoza","description":"<div>En el imaginario de Zaragoza existe un privilegiado espacio para la escultura del emperador Augusto. A lo largo del tiempo ha ido pasando por diferentes ubicaciones en nuestra ciudad: hoy en d&iacute;a se encuentra delante de las murallas, en la zona del Mercado Central. Pero no siempre se conoce la interesante historia de esta escultura: desde su descubrimiento en 1863 (en Prima Porta, cerca de Roma) hasta la realizaci&oacute;n de la copia en bronce que fue regalada a la ciudad por el Gobierno italiano.</div>\r\n<div>&nbsp;</div>\r\n<div>Se traza un recorrido visual por la historia de la escultura y el mensaje que contienen los personajes que decoran la coraza del emperador. La exposici&oacute;n se ver&aacute; complementada por el material did&aacute;ctico <em> Augusto a tu gusto</em>, destinado a escolares de Educaci&oacute;n Primaria y visitas familiares.</div>\r\n<div>&nbsp;</div>\r\n<div>La visita a la exposiciones temporales se realiza con la entrada a los museos</div>\r\n<div>&nbsp;</div>\r\n<div><a href=\"http://www.zaragoza.es/ciudad/museos/es/teatro/tarifasyres.htm\">ENTRADAS</a></div>","geometry":{"type":"Point","coordinates":[-0.8773274791894494,41.65255366192645]}}]});
      
      scopeDetalle.actosCercanos();
      
      scope.$digest();
      
      httpBackend.flush();
      expect(scopeDetalle.markers).toBeDefined();
     
    });
  

    it('debe filtrar por monumentos cercanos', function() {
      scopeDetalle.detalle = {};
      scopeDetalle.detalle.title = 'Nombre';
      scopeDetalle.detalle.longitud = {value:-0.885873};
      scopeDetalle.detalle.latitud = {value:41.6568};

      httpBackend.whenGET("http://www.zaragoza.es/api/recurso/turismo/monumento?rows=200&fl=id,title,address,geometry&srsname=wgs84&point=" + scopeDetalle.detalle.longitud.value + "%2C" + scopeDetalle.detalle.latitud.value + "&distance=1000")
        .respond({"totalCount":2,"start":0,"rows":200,"result":[{"id":8,"title":"Iglesia de San Pablo","address":"C/ San Pablo, 42","geometry":{"type":"Point","coordinates":[-0.8860142576968266,41.656128542505186]}},{"id":51,"title":"Casa de Palafox","address":"C/ Palafox, 4","geometry":{"type":"Point","coordinates":[-0.8747328211938572,41.65418734999374]}}]});
      
      scopeDetalle.monumentosCercanos();
      
      scope.$digest();
      
      httpBackend.flush();
      expect(scopeDetalle.markers).toBeDefined();
     
    });


    it('debe filtrar por alojamientos cercanos', function() {
      scopeDetalle.detalle = {};
      scopeDetalle.detalle.title = 'Nombre';
      scopeDetalle.detalle.longitud = {value:-0.885873};
      scopeDetalle.detalle.latitud = {value:41.6568};

      httpBackend.whenGET("http://www.zaragoza.es/api/recurso/turismo/alojamiento?rows=200&fl=id,title,description,geometry&srsname=wgs84&point=" + scopeDetalle.detalle.longitud.value + "%2C" + scopeDetalle.detalle.latitud.value + "&distance=1000")
        .respond({"totalCount":2,"start":0,"rows":200,"result":[{"id":13642,"title":"ALBERGUE DE ZARAGOZA","description":"C/ Predicadores, 70 <strong><abbr title=\"Teléfono\">Tel.:</abbr></strong> 976 28 20 43","geometry":{"type":"Point","coordinates":[-0.8859104818582821,41.65762593611094]}},{"id":1120,"title":"HOSTAL NAVARRA","description":"C/ San Vicente de Paúl, 30, ppal. izda. <strong><abbr title=\"Teléfono\">Tel.:</abbr></strong> 976 29 16 84","geometry":{"type":"Point","coordinates":[-0.8749408739654889,41.65321463137652]}}]});
      
      scopeDetalle.alojamientosCercanos();
      
      scope.$digest();
      
      httpBackend.flush();
      expect(scopeDetalle.markers).toBeDefined();
     
    });

    it('debe filtrar por parquimetros cercanas', function() {
      scopeDetalle.detalle = {};
      scopeDetalle.detalle.title = 'Nombre';
      scopeDetalle.detalle.longitud = {value:-0.885873};
      scopeDetalle.detalle.latitud = {value:41.6568};

      httpBackend.whenGET("http://www.zaragoza.es/api/recurso/urbanismo-infraestructuras/equipamiento/parquimetro?rows=30&fl=id,title,description,geometry&srsname=wgs84&point=" + scopeDetalle.detalle.longitud.value + "%2C" + scopeDetalle.detalle.latitud.value + "&distance=1000")
        .respond({"totalCount":2,"start":0,"rows":200,"result":[{"id":"102","title":"C/ Pedro Joaquín Soler - Coso","estado":"OPN","bicisDisponibles":20,"anclajesDisponibles":0,"geometry":{"type":"Point","coordinates":[-0.8778279304764041,41.65123159281204]},"description":"<ul><li>Estado: Operativa</li><li>Bicis disponibles: 20</li><li>Anclajes disponibles: 0</li></ul><p>Actualizado: 11:34</p>"},{"id":"61","title":"C/ Sixto Celorrio - C/ Peña Oroel","estado":"OPN","bicisDisponibles":9,"anclajesDisponibles":12,"geometry":{"type":"Point","coordinates":[-0.87553072770421,41.66380065993328]},"description":"<ul><li>Estado: Operativa</li><li>Bicis disponibles: 9</li><li>Anclajes disponibles: 12</li></ul><p>Actualizado: 11:34</p>"}]});
      
      scopeDetalle.parquimetrosCercanos();
      
      scope.$digest();
      
      httpBackend.flush();
      expect(scopeDetalle.markers).toBeDefined();
     
    });

    it('debe filtrar por recursos sanitarios cercanos', function() {
      scopeDetalle.detalle = {};
      scopeDetalle.detalle.title = 'Nombre';
      scopeDetalle.detalle.longitud = {value:-0.885873};
      scopeDetalle.detalle.latitud = {value:41.6568};

      httpBackend.whenGET("http://www.zaragoza.es/api/recurso/urbanismo-infraestructuras/equipamiento/recurso/?q=subtemas.id==781,subtemas.id==780,subtemas.id==740&rows=200&fl=id,title,geometry&srsname=wgs84&point=" + scopeDetalle.detalle.longitud.value + "%2C" + scopeDetalle.detalle.latitud.value + "&distance=1000")
        .respond({"totalCount":2,"start":0,"rows":200,"result":[{"id":9081,"title":"Centro de Salud San Pablo","geometry":{"type":"Point","coordinates":[-0.8871065763040628,41.65671371345279]}},{"id":9114,"title":"Centro de Salud Arrabal","geometry":{"type":"Point","coordinates":[-0.877741825100364,41.66198152462751]}}]});
      
      scopeDetalle.sanidadCercanos();
      
      scope.$digest();
      
      httpBackend.flush();
      expect(scopeDetalle.markers).toBeDefined();
     
    });

    it('debe filtrar por recursos cercanos', function() {
      scopeDetalle.detalle = {};
      scopeDetalle.detalle.title = 'Nombre';
      scopeDetalle.detalle.longitud = {value:-0.885873};
      scopeDetalle.detalle.latitud = {value:41.6568};

      httpBackend.whenGET("http://www.zaragoza.es/api/recurso/urbanismo-infraestructuras/equipamiento/recurso?rows=200&fl=id,title,geometry&srsname=wgs84&point=" + scopeDetalle.detalle.longitud.value + "%2C" + scopeDetalle.detalle.latitud.value + "&distance=1000")
        .respond({"totalCount":2,"start":0,"rows":200,"result":[{"id":20325,"title":"Mú Restauracion","geometry":{"type":"Point","coordinates":[-0.8859143780595213,41.65679146990924]}},{"id":8763,"title":"Farmacia Faci Lérida, Margarita","geometry":{"type":"Point","coordinates":[-0.8830334932038215,41.65292775905377]}}]});
      
      scopeDetalle.recursosCercanos();
      
      scope.$digest();
      
      httpBackend.flush();
      expect(scopeDetalle.markers).toBeDefined();
     
    });

    it('debe filtrar por aparcabicis cercanos', function() {
      scopeDetalle.detalle = {};
      scopeDetalle.detalle.title = 'Nombre';
      scopeDetalle.detalle.longitud = {value:-0.885873};
      scopeDetalle.detalle.latitud = {value:41.6568};

      httpBackend.whenGET("http://www.zaragoza.es/api/recurso/urbanismo-infraestructuras/equipamiento/aparcamiento-bicicleta?rows=200&fl=id,title,description,geometry&srsname=wgs84&point=" + scopeDetalle.detalle.longitud.value + "%2C" + scopeDetalle.detalle.latitud.value + "&distance=1000")
        .respond({"totalCount":86,"start":0,"rows":200,"result":[{"id":407,"title":"CALLE MARIANO  DE CAVIA SANTA ISABEL, 2","geometry":{"type":"Point","coordinates":[-0.885311963800785,41.65672976019238]}},{"id":455,"title":"CALLE JOSE PALAFOX","geometry":{"type":"Point","coordinates":[-0.8745199795813664,41.65413027213681]}}]});
      
      scopeDetalle.aparcabiciCercanos();
      
      scope.$digest();
      
      httpBackend.flush();
      expect(scopeDetalle.markers).toBeDefined();
     
    });

    it('debe filtrar por estaciones bici zaragoza cercanas', function() {
      scopeDetalle.detalle = {};
      scopeDetalle.detalle.title = 'Nombre';
      scopeDetalle.detalle.longitud = {value:-0.885873};
      scopeDetalle.detalle.latitud = {value:41.6568};

      httpBackend.whenGET("http://www.zaragoza.es/api/recurso/urbanismo-infraestructuras/estacion-bicicleta?rows=200&fl=id,title,description,estado,bicisDisponibles,anclajesDisponibles,geometry&srsname=wgs84&point=" + scopeDetalle.detalle.longitud.value + "%2C" + scopeDetalle.detalle.latitud.value + "&distance=1000")
        .respond({"totalCount":2,"start":0,"rows":200,"result":[{"id":"102","title":"C/ Pedro Joaquín Soler - Coso","estado":"OPN","bicisDisponibles":20,"anclajesDisponibles":0,"geometry":{"type":"Point","coordinates":[-0.8778279304764041,41.65123159281204]},"description":"<ul><li>Estado: Operativa</li><li>Bicis disponibles: 20</li><li>Anclajes disponibles: 0</li></ul><p>Actualizado: 11:34</p>"},{"id":"61","title":"C/ Sixto Celorrio - C/ Peña Oroel","estado":"OPN","bicisDisponibles":9,"anclajesDisponibles":12,"geometry":{"type":"Point","coordinates":[-0.87553072770421,41.66380065993328]},"description":"<ul><li>Estado: Operativa</li><li>Bicis disponibles: 9</li><li>Anclajes disponibles: 12</li></ul><p>Actualizado: 11:34</p>"}]});
      
      scopeDetalle.biziCercanos();
      
      scope.$digest();
      
      httpBackend.flush();
      expect(scopeDetalle.markers).toBeDefined();
     
    });

    it('debe filtrar por paradas de taxi cercanas', function() {
      scopeDetalle.detalle = {};
      scopeDetalle.detalle.title = 'Nombre';
      scopeDetalle.detalle.longitud = {value:-0.885873};
      scopeDetalle.detalle.latitud = {value:41.6568};

      httpBackend.whenGET("http://www.zaragoza.es/api/recurso/urbanismo-infraestructuras/equipamiento/parada-taxi?rows=200&fl=id,title,geometry&srsname=wgs84&point=" + scopeDetalle.detalle.longitud.value + "%2C" + scopeDetalle.detalle.latitud.value + "&distance=1000")
        .respond({"totalCount":2,"start":0,"rows":200,"result":[{"id":34,"title":"PREVIASA","geometry":{"type":"Point","coordinates":[-0.8843037006356846,41.65378796099736]}},{"id":16,"title":"SAN VICENTE DE PAÚL, 28","geometry":{"type":"Point","coordinates":[-0.8750964388982971,41.65314005494032]}}]});
      
      scopeDetalle.paradaTaxiCercanos();
      
      scope.$digest();
      
      httpBackend.flush();
      expect(scopeDetalle.markers).toBeDefined();
     
    });

    it('debe filtrar por aparcamientos publicos cercanos', function() {
      scopeDetalle.detalle = {};
      scopeDetalle.detalle.title = 'Nombre';
      scopeDetalle.detalle.longitud = {value:-0.885873};
      scopeDetalle.detalle.latitud = {value:41.6568};

      httpBackend.whenGET("http://www.zaragoza.es/api/recurso/urbanismo-infraestructuras/equipamiento/aparcamiento-publico?rows=200&fl=id,title,geometry&srsname=wgs84&point=" + scopeDetalle.detalle.longitud.value + "%2C" + scopeDetalle.detalle.latitud.value + "&distance=1000")
        .respond({"totalCount":2,"start":0,"rows":200,"result":[{"id":118,"title":"Santo Domingo","geometry":{"type":"Point","coordinates":[-0.8894229576000706,41.65762498869614]}},{"id":112,"title":"Sanclemente","geometry":{"type":"Point","coordinates":[-0.8819635634265413,41.64959347074921]}}]});
      
      scopeDetalle.aparcamientoCercanos();
      
      scope.$digest();
      
      httpBackend.flush();
      expect(scopeDetalle.markers).toBeDefined();
     
    });

    it('debe filtrar por aparcamientos para motos cercanos', function() {
      scopeDetalle.detalle = {};
      scopeDetalle.detalle.title = 'Nombre';
      scopeDetalle.detalle.longitud = {value:-0.885873};
      scopeDetalle.detalle.latitud = {value:41.6568};

      httpBackend.whenGET("http://www.zaragoza.es/api/recurso/urbanismo-infraestructuras/equipamiento/aparcamiento-moto?rows=200&fl=id,title,geometry&srsname=wgs84&point=" + scopeDetalle.detalle.longitud.value + "%2C" + scopeDetalle.detalle.latitud.value + "&distance=1000")
        .respond({"totalCount":2,"start":0,"rows":200,"result":[{"id":344,"title":"Estacionamiento para Motos","geometry":{"type":"Point","coordinates":[-0.88921119551941,41.65792731537568]}},{"id":31,"title":"Estacionamiento para Motos","geometry":{"type":"Point","coordinates":[-0.8799777488306098,41.64901643516628]}}]});
      
      scopeDetalle.motoCercanos();
      
      scope.$digest();
      
      httpBackend.flush();
      expect(scopeDetalle.markers).toBeDefined();
     
    });

    it('debe filtrar por estaciones de servicio cercanas', function() {
      scopeDetalle.detalle = {};
      scopeDetalle.detalle.title = 'Nombre';
      scopeDetalle.detalle.longitud = {value:-0.885873};
      scopeDetalle.detalle.latitud = {value:41.6568};

      httpBackend.whenGET("http://www.zaragoza.es/api/recurso/urbanismo-infraestructuras/equipamiento/estacion-servicio?rows=200&fl=id,title,geometry&srsname=wgs84&point=" + scopeDetalle.detalle.longitud.value + "%2C" + scopeDetalle.detalle.latitud.value + "&distance=1000")
        .respond({"totalCount":2,"start":0,"rows":200,"result":[{"id":13,"title":"Estación de Servicio","geometry":{"type":"Point","coordinates":[-0.8863658864155866,41.65819470179325]}},{"id":14,"title":"Estación de Servicio San Juan Bosco","geometry":{"type":"Point","coordinates":[-0.8867783519848335,41.66162474492307]}}]});
      
      scopeDetalle.gasolineraCercanos();
      
      scope.$digest();
      
      httpBackend.flush();
      expect(scopeDetalle.markers).toBeDefined();
     
    });

  });
});
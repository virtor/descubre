'use strict';
angular.module('descubre.directives', [])
    .directive('mostrarfecha', function($compile, $filter) {
        function linker(scope, element, attrs) {
            var registro = angular.fromJson(attrs.mostrarfecha);
            var html = '';
            if (registro.startDate) {
                if (registro.endDate) {
                    if (registro.startDate.value === registro.endDate.value) {
                        html = $filter('parsedate')(registro.startDate.value);
                    } else {
                        html = 'Del ' + $filter('parsedate')(registro.startDate.value) + ' al ' + $filter('parsedate')(registro.endDate.value);
                    }
                } else {
                    html = 'Desde el ' + $filter('parsedate')(registro.startDate.value);
                }
            } else {
                if (registro.endDate) {
                    html = 'Hasta el ' + $filter('parsedate')(registro.endDate.value);
                }
            }
            if (registro.startTime) {
              html = html + ' ' + registro.startTime.value ;
            }
            if (registro.endTime) {
              html = html + ' ' + registro.endTime.value;
            }
            element.html(html);
            $compile(element.contents())(scope);
        }
        return {
            restrict: 'A',
            link: linker
        };
    })
    .directive('contentItem', function($compile, $filter, $rootScope) {
        var registro;
        var getTemplate = function(contentType) {
            /*jshint multistr: true */
            var mapa = '<leaflet center="center" markers="markers" height="280px" style="width:98%" layers="layers" geojson="geojson"></leaflet>\
                        ' + $rootScope.strings.detail.near + ':<br/> \
                        <button ng-click="actosCercanos()" id="btnActoCercano" class="btn btn-primary btn-xs"><span ng-show="claseActo" ng-class="claseActo"></span>' + $rootScope.strings.detail.events + '</button>\
                        <button ng-click="monumentosCercanos()" id="btnMonumentoCercano" class="btn btn-primary btn-xs"><span ng-show="claseMonumento" ng-class="claseMonumento"></span>' + $rootScope.strings.detail.monuments + '</button>\
                        <button ng-click="restaurantesCercanos()" id="btnRestauranteCercano" class="btn btn-primary btn-xs"><span ng-show="claseRestaurante" ng-class="claseRestaurante"></span> ' + $rootScope.strings.detail.gastronomy + '</button>\
                        <button ng-click="alojamientosCercanos()" id="btnAlojamientoCercano" class="btn btn-primary btn-xs"><span ng-show="claseAlojamiento" ng-class="claseAlojamiento"></span>' + $rootScope.strings.detail.accommodation + '</button>\
                        <div class="btn-group dropup">\
                            <button type="button" class="btn btn-primary btn-xs dropdown-toggle" data-toggle="dropdown" aria-expanded="false">\
                                ' + $rootScope.strings.detail.more + ' <span class="caret"></span>\
                            </button>\
                        <ul class="dropdown-menu" role="menu">\
                            <li role="menuitem"><a ng-click="sanidadCercanos()"><span ng-show="claseSanidad" ng-class="claseSanidad"></span>' + $rootScope.strings.detail.health + '</a></li>\
                            <li role="menuitem"><a ng-click="recursosCercanos()"><span ng-show="claseRecurso" ng-class="claseRecurso"></span>' + $rootScope.strings.detail.resources + '</a></li>\
                            <li role="menuitem"><a ng-click="aparcabiciCercanos()"><span ng-show="claseAparcabici" ng-class="claseAparcabici"></span> ' + $rootScope.strings.detail.parking_bike + '</a></li>\
                            <li role="menuitem"><a ng-click="biziCercanos()"><span ng-show="claseBizi" ng-class="claseBizi"></span> ' + $rootScope.strings.detail.bizi + '</a></li>\
                            <li role="menuitem"><a ng-click="paradaTaxiCercanos()"><span ng-show="claseParadaTaxi" ng-class="claseParadaTaxi"></span> ' + $rootScope.strings.detail.taxi + '</a></li>\
                            <li role="menuitem"><a ng-click="aparcamientoCercanos()"><span ng-show="claseAparcamiento" ng-class="claseAparcamiento"></span> ' + $rootScope.strings.detail.public_parking + '</a></li>\
                            <li role="menuitem"><a ng-click="motoCercanos()"><span ng-show="claseMoto" ng-class="claseMoto"></span> ' + $rootScope.strings.detail.motorcycle_parking + '</a></li>\
                            <li role="menuitem"><a ng-click="gasolineraCercanos()"><span ng-show="claseGasolinera" ng-class="claseGasolinera"></span> ' + $rootScope.strings.detail.filling_station + '</a></li>\
                        </ul></div>';


            var template = '';
            switch (contentType) {
                case 'restaurante':
                    template = 
                        (registro.latitud ? mapa : '') + 
                        '<p>' +
                        (registro.logo ? '<img src="//www.zaragoza.es' + registro.logo.value + '" class="pull-right"/>' : '') +
                        (registro.comment ? registro.comment.value : '') +
                        '</p>' +
                        '<p>' +
                        (registro.capacidad ? $rootScope.strings.detail.label.size + ': ' + registro.capacidad.value : '') +
                        '</p>' +
                        '<p>' +
                        (registro.url ? ' ' + $rootScope.strings.detail.label.web_site + ': ' + '<a href="' + registro.url.value + '">' + registro.url.value + '</a>' : '') +
                        (registro.tel ? ' ' + $rootScope.strings.detail.label.phone + ': ' + registro.tel.value : '') +
                        (registro.email ? ' ' + $rootScope.strings.detail.label.email + ': <a href="mailto:' + registro.email.value + '">' + registro.email.value + '</a>' : '') +
                        (registro.streetAdr ? '</p><p>' + $rootScope.strings.detail.label.address + ': ' + registro.streetAdr.value : '') +
                        (registro.postCode ? ' ' + $rootScope.strings.detail.label.postal_code + ': ' + registro.postCode.value : '') +
                        (registro.addressLocality && registro.addressLocality.value !== 'Zaragoza' ? ' ' + registro.addressLocality.value : '') +
                        '</p>' +
                        (registro.accesibilidad ? '<p>' + registro.accesibilidad.value + '</p>' : '') +
                        (registro.photo ? '<div><img src="//www.zaragoza.es' + registro.photo.value + '" height="100" class="center-block"/></div>' : '') 
                        // btnAddAgenda + 
                        ;
                    break;
                case 'evento':
                    template = 
                        (registro.latitud ? mapa : '') + 
                        '<p>' +
                        (registro.image ? '<img src="' + registro.image.value + '" class="pull-right" width="100"/>' : '') +
                        (registro.comment ? registro.comment.value : '') +
                        '</p>' +
                        (registro.programa ? '<p>' + $rootScope.strings.detail.label.program + ': ' + registro.programa.value + '</p>' : '') +
                        '<p>' +
                        (registro.startDate ? ' ' + $rootScope.strings.detail.label.start_date + ': ' + $filter('date')(registro.startDate.value, 'dd-MM-yyyy') : '') +
                        (registro.endDate ? ' ' + $rootScope.strings.detail.label.end_date + ': ' + $filter('date')(registro.endDate.value, 'dd-MM-yyyy') : '') +
                        (registro.startTime ? ' ' + $rootScope.strings.detail.label.start_time + ': ' + registro.startTime.value : '') +
                        (registro.endTime ? ' ' + $rootScope.strings.detail.label.end_time + ': ' + registro.endTime.value : '') +
                        (registro.openingHours ? ' ' + $rootScope.strings.detail.label.opening_hours + ': ' + registro.openingHours.value : '') +
                        '</p>' +
                        '<p>' +
                        (registro.tipoEntrada ? $rootScope.strings.detail.label.accession + ': ' + registro.tipoEntrada.value : '') +
                        (registro.price ? ' ' + $rootScope.strings.detail.label.price + ': ' + registro.price.value : '') +
                        (registro.maxParticipantes ? $rootScope.strings.detail.label.capacity + ': ' + registro.maxParticipantes.value : '') +
                        '</p>' +
                        '<p>' +
                        (registro.url ? ' ' + $rootScope.strings.detail.label.web_site + ': ' + '<a href="' + registro.url.value + '">' + registro.url.value + '</a>' : '') +
                        // TODO cuando esté bien cargado el lugar de realización
                        (registro.tel ? ' ' + $rootScope.strings.detail.label.phone + ': ' + registro.tel.value : '') +
                        (registro.email ? ' ' + $rootScope.strings.detail.label.email + ': <a href="mailto:' + registro.email.value + '">' + registro.email.value + '</a>' : '') +
                        (registro.streetAdr ? '</p><p>' + $rootScope.strings.detail.label.address + ': ' + registro.streetAdr.value : '') +
                        (registro.postCode ? ' ' + $rootScope.strings.detail.label.postal_code + ': ' + registro.postCode.value : '') +
                        (registro.addressLocality && registro.addressLocality.value !== 'Zaragoza' ? ' ' + registro.addressLocality.value : '') +
                        '</p>' +
                        (registro.accesibilidad ? '<p>' + (registro.accesibilidad.value === 'S' ? 'Accesible para personas con movilidad reducida' : (registro.accesibilidad.value === 'N' ? 'No accesible para personas con movilidad reducida' : registro.accesibilidad.value)) + '</p>' : '') 
                        ;
                    break;
                case 'monumento':
                    template = (registro.latitud ? mapa : '') + 
                        '<p>' +
                        (registro.datacion ? registro.datacion.value + '. ' : '') +
                        (registro.estilo ? registro.estilo.value + '. ' : '') +
                        (registro.comment ? registro.comment.value : '') +
                        '</p>' +
                        '<p>' +
                        (registro.horario ? $rootScope.strings.detail.label.opening_hours + '. ' + registro.horario.value : '') +
                        (registro.price ? ' ' + $rootScope.strings.detail.label.price + '. ' + registro.price.value : '') +
                        (registro.uso ? ' ' + $rootScope.strings.detail.label.use + '. ' + registro.uso.value : '') +
                        '</p>' +
                        (registro.puntosInteres ? '<p><strong>' + $rootScope.strings.detail.label.pois + '</strong>. ' + registro.puntosInteres.value + '</p>' : '') +
                        (registro.detalleVisita ? '<p><strong>' + $rootScope.strings.detail.label.visit + '</strong>. ' + registro.detalleVisita.value + '</p>' : '') +
                        '<p>' +
                        (registro.tel ? ' ' + $rootScope.strings.detail.label.phone + ': ' + registro.tel.value : '') +
                        (registro.fax ? ' ' + $rootScope.strings.detail.label.fax + ': ' + registro.fax.value : '') +
                        (registro.streetAdr ? '</p><p>' + $rootScope.strings.detail.label.address + ': ' + registro.streetAdr.value : '') +
                        (registro.datosAcceso ? ' ' + $rootScope.strings.detail.label.access + ': ' + registro.datosAcceso.value : '') +
                        //(registro.foursquare ? ' ' + $rootScope.strings.detail.label.foursquare + ': ' + registro.foursquare.value : '') +
                        '</p>' +
                        (registro.accesibilidad ? '<p>' + registro.accesibilidad.value + '</p>' : '') +
                        (registro.photo ? '<div><img src="' + registro.photo.value + '" height="100" class="center-block"/></div>' : '');
                    break;
                case 'alojamiento':
                    template = (registro.latitud ? mapa : '') +
                        '<p>' +
                        (registro.logo ? '<img src="//www.zaragoza.es' + registro.logo.value + '" class="pull-right"/>' : '') +
                        (registro.comment ? registro.comment.value : '') +
                        '</p>' +
                        '<p>' +
                        (registro.numCamas && registro.numCamas.value > 0 ? registro.numCamas.value + ' camas ' : '') +
                        (registro.numHabitaciones && registro.numHabitaciones.value > 0 ? ' ' + registro.numHabitaciones.value + ' habitaciones' : '') +
                        '</p>' +
                        '<p>' +
                        (registro.url ? ' ' + $rootScope.strings.detail.label.web_site + ': ' + '<a href="' + registro.url.value + '">' + registro.url.value + '</a>' : '') +
                        (registro.tel ? ' ' + $rootScope.strings.detail.label.phone + ': ' + registro.tel.value : '') +
                        (registro.fax ? ' ' + $rootScope.strings.detail.label.fax + ': ' + registro.fax.value : '') +
                        (registro.email ? ' ' + $rootScope.strings.detail.label.email + ': <a href="mailto:' + registro.email.value + '">' + registro.email.value + '</a>' : '') +
                        (registro.streetAdr ? '</p><p>' + $rootScope.strings.detail.label.address + ': ' + registro.streetAdr.value : '') +
                        (registro.postCode ? ' ' + $rootScope.strings.detail.label.postal_code + ': ' + registro.postCode.value : '') +
                        (registro.addressLocality && registro.addressLocality.value !== 'Zaragoza' ? ' ' + registro.addressLocality.value : '') +
                        '</p>' +
                        (registro.accesibilidad ? '<p>' + registro.accesibilidad.value + '</p>' : '') +
                        (registro.photo ? '<div><img src="//www.zaragoza.es' + registro.photo.value + '" height="100" class="center-block"/></div>' : '') 
                        ;
                    break;
                case 'recurso':
                    template = 
                        (registro.latitud ? mapa : '') + 
                        '<p>' +
                        (registro.comment ? registro.comment.value : '') +
                        (registro.servicios ? registro.servicios.value : '') +
                        '</p>' +
                        (registro.url ? '<p>' + $rootScope.strings.detail.label.web_site + ': ' + '<a href="' + registro.url.value + '">' + registro.url.value + '</a></p>' : '') +
                        '<p>' +
                        (registro.horario ? $rootScope.strings.detail.label.opening_hours + '. ' + registro.horario.value : '') +
                        (registro.price ? ' ' + $rootScope.strings.detail.label.price + '. ' + registro.price.value : '') +
                        '</p>' +
                        '<p>' +
                        (registro.tel ? ' ' + $rootScope.strings.detail.label.phone + ': ' + registro.tel.value : '') +
                        (registro.email ? ' ' + $rootScope.strings.detail.label.email + ': <a href="mailto:' + registro.email.value + '">' + registro.email.value + '</a>' : '') +
                        (registro.streetAdr ? '</p><p>' + $rootScope.strings.detail.label.address + ': ' + registro.streetAdr.value : '') +
                        '</p>' +
                        (registro.accesibilidad ? '<p>' + registro.accesibilidad.value + '</p>' : '') 
                        ;
                    break;
                case 'mapa-colaborativo':
                    template = 
                        (registro.latitud ? mapa : '') + 
                        '<p>' + registro.description + '</p>' +
                        (registro.link ? '<p>Sitio web: <a href="' + registro.link + '">' + registro.link + '</a></p>' : '') 
                        ;
                    break;

                default:
                    template = '<dl class="dl-horizontal">';
                    for (var prop in registro) {
                        template = template + '<dt>' + $filter('propiedad')(prop) + '</dt>' +
                            '<dd>' + $filter('valor')(registro[prop]) + '</dd>';
                    }
                    template = template + '</dl>';
                    break;
            }
            return ' <md-content>' + template + '</md-content>';
        };

        var linker = function(scope, element, attrs) {
            scope.$watch(attrs.content, function(value) {
                if (value) {
                    registro = value;

                    if (!registro.latitud && registro.geometry) {
                        registro.latitud = {};
                        registro.longitud = {};
                        registro.latitud.value = registro.geometry.coordinates[1];
                        registro.longitud.value = registro.geometry.coordinates[0];
                    }

                    if (registro.latitud && registro.longitud) {

                        scope.center = {
                            lat: Math.round10(registro.latitud.value, -4),
                            lng: Math.round10(registro.longitud.value, -4),
                            zoom: 14
                        };
                        scope.markers = {
                            main_marker: {
                                lat: Math.round10(registro.latitud.value, -4),
                                lng: Math.round10(registro.longitud.value, -4),
                                focus: true,
                                message: registro.title.value || registro.title,
                                title: registro.title.value || registro.title,
                                draggable: false
                            }
                        };
                        scope.geojson = {};
                        scope.layers = {
                            baselayers: {
                                wms: {
                                    name: 'IDEzar',
                                    type: 'wms',
                                    visible: true,
                                    url: 'http://idezar.zaragoza.es/wms/IDEZar_base/IDEZar_base',
                                    layerParams: {
                                        crs: L.CRS.EPSG4326,
                                        layers: 'base',
                                        format: 'image/png',
                                        transparent: false,
                                        attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                                            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                                            ' &copy; <a href="http://www.zaragoza.es/">Ayuntamiento de Zaragoza</a>',

                                    }
                                },
                                xyz: {
                                    name: 'OpenStreetMap (XYZ)',
                                    url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                                    type: 'xyz'
                                }
                            }
                        };

                    }
                    var uriObj = '';
                    if (registro.uri) {
                        uriObj = registro.uri.value || registro.uri;
                    }
                    element.html(getTemplate($filter('tipo')(uriObj) || attrs.type));
                    $compile(element.contents())(scope);
                }
            });
        };

        return {
            restrict: "E",
            link: linker,
        };
    });


// Closure
(function() {

    /**
     * Decimal adjustment of a number.
     *
     * @param   {String}    type    The type of adjustment.
     * @param   {Number}    value   The number.
     * @param   {Integer}   exp     The exponent (the 10 logarithm of the adjustment base).
     * @returns {Number}            The adjusted value.
     */
    function decimalAdjust(type, value, exp) {
        // If the exp is undefined or zero...
        if (typeof exp === 'undefined' || +exp === 0) {
            return Math[type](value);
        }
        value = +value;
        exp = +exp;
        // If the value is not a number or the exp is not an integer...
        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
            return NaN;
        }
        // Shift
        value = value.toString().split('e');
        value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
        // Shift back
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    }

    // Decimal round
    if (!Math.round10) {
        Math.round10 = function(value, exp) {
            return decimalAdjust('round', value, exp);
        };
    }
    // Decimal floor
    if (!Math.floor10) {
        Math.floor10 = function(value, exp) {
            return decimalAdjust('floor', value, exp);
        };
    }
    // Decimal ceil
    if (!Math.ceil10) {
        Math.ceil10 = function(value, exp) {
            return decimalAdjust('ceil', value, exp);
        };
    }

})();


if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };
}

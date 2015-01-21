angular.module('descubre.directives', [])
    .directive('contentItem', function($compile,$filter) {
        var registro;
        var getTemplate = function(contentType) {

        	var mapa = '<leaflet center="center" markers="markers" height="380px" style="width:100%" layers="layers" geojson="geojson"></leaflet>\
                        Cerca de aquí:<br/> \
                        <button ng-click="actosCercanos()" class="btn btn-primary btn-xs"><span ng-show="claseActo" ng-class="claseActo"></span>Actividades</button>\
                        <button ng-click="monumentosCercanos()" class="btn btn-primary btn-xs"><span ng-show="claseMonumento" ng-class="claseMonumento"></span>Monumentos</button>\
                        <button ng-click="restaurantesCercanos()" class="btn btn-primary btn-xs"><span ng-show="claseRestaurante" ng-class="claseRestaurante"></span> Restaurantes</button>\
                        <button ng-click="alojamientosCercanos()" class="btn btn-primary btn-xs"><span ng-show="claseAlojamiento" ng-class="claseAlojamiento"></span>Alojamientos</button>\
                        <div class="btn-group dropup">\
                            <button type="button" class="btn btn-primary btn-xs dropdown-toggle" data-toggle="dropdown" aria-expanded="false">\
                                Más <span class="caret"></span>\
                            </button>\
                        <ul class="dropdown-menu" role="menu">\
                            <li><a ng-click="sanidadCercanos()"><span ng-show="claseSanidad" ng-class="claseSanidad"></span>Sanidad</a></li>\
                            <li><a ng-click="recursosCercanos()"><span ng-show="claseRecurso" ng-class="claseRecurso"></span>Recursos</a></li>\
                            <li><a ng-click="aparcabiciCercanos()"><span ng-show="claseAparcabici" ng-class="claseAparcabici"></span> Aparcabicis</a></li>\
                            <li><a ng-click="biziCercanos()"><span ng-show="claseBizi" ng-class="claseBizi"></span> Bizi</a></li>\
                            <li><a ng-click="paradaTaxiCercanos()"><span ng-show="claseParadaTaxi" ng-class="claseParadaTaxi"></span> Paradas Taxi</a></li>\
                            <li><a ng-click="aparcamientoCercanos()"><span ng-show="claseAparcamiento" ng-class="claseAparcamiento"></span> Aparcamientos públicos</a></li>\
                            <li><a ng-click="motoCercanos()"><span ng-show="claseMoto" ng-class="claseMoto"></span> Aparcamientos para motos</a></li>\
                            <li><a ng-click="gasolineraCercanos()"><span ng-show="claseGasolinera" ng-class="claseGasolinera"></span> Estaciones de servicio</a></li>\
                        </ul></div>';


            var template = '';
            console.log('tipo:' + contentType);
             switch (contentType) {
                 case 'restaurante':
                    template = '<p>'
                        + (registro.logo ? '<img src="//www.zaragoza.es' + registro.logo.value + '" class="pull-right"/>' : '')
                        + (registro.comment ? registro.comment.value : '')
                        + '</p>'
                        + '<p>'
                        + (registro.capacidad ? 'Capacidad: ' + registro.capacidad.value : '') 
                        + '</p>'
                        + '<p>'  
                        + (registro.url ? ' Sitio web: ' + '<a href="' + registro.url.value + '">' + registro.url.value + '</a>' : '') 
                        + (registro.tel ? ' Teléfono: ' + registro.tel.value : '') 
                        + (registro.email ? ' Mail: <a href="' + registro.email.value + '">' + registro.email.value+ '</a>' : '') 
                        + (registro.streetAdr ? '</p><p>Dirección: ' + registro.streetAdr.value : '') 
                        + (registro.postCode ? ' Código postal: ' + registro.postCode.value : '') 
                        + (registro.addressLocality && registro.addressLocality.value !== 'Zaragoza' ? ' ' + registro.addressLocality.value : '') 
                        + '</p>'
                        + (registro.accesibilidad ? '<p>' + registro.accesibilidad.value + '</p>' : '')
                        + (registro.photo ? '<div><img src="//www.zaragoza.es' + registro.photo.value + '" height="100" class="center-block"/></div>' : '')
                        + (registro.latitud ? mapa : '');
                     break;
                  case 'evento':
                      template = '<p>'
                        + (registro.image ? '<img src="' + registro.image.value + '" class="pull-right" width="100"/>' : '')
                        + (registro.comment ? registro.comment.value : '')
                        + '</p>'
                        + (registro.programa ? '<p>Programa: ' + registro.programa.value + '</p>' : '')
                        + '<p>'
                        + (registro.startDate ? ' Fecha inicio: ' + $filter('date')(registro.startDate.value, 'dd-MM-yyyy') : '') 
                        + (registro.endDate ? ' Fecha fin: ' + $filter('date')(registro.endDate.value, 'dd-MM-yyyy') : '') 
                        + (registro.startTime ? ' Hora inicio: ' + registro.startTime.value : '') 
                        + (registro.endTime ? ' Hora final: ' + registro.endTime.value : '') 
                        + (registro.openingHours ? ' Horario: ' + registro.openingHours.value : '') 
                        + '</p>'
                        + '<p>'
                        + (registro.tipoEntrada ? 'Tipo de entrada: ' + registro.tipoEntrada.value : '') 
                        + (registro.price ? ' Precio: ' + registro.price.value : '') 
                        + (registro.maxParticipantes ? ' Número máximo de participantes: ' + registro.maxParticipantes.value : '') 
                        + '</p>'
                        + '<p>'  
                        + (registro.url ? ' Sitio web: ' + '<a href="' + registro.url.value + '">' + registro.url.value + '</a>' : '')  
                        // TODO cuando esté bien cargado el lugar de realización
                        + (registro.tel ? ' Teléfono: ' + registro.tel.value : '') 
                        + (registro.email ? ' Mail: <a href="' + registro.email.value + '">' + registro.email.value+ '</a>' : '') 
                        + (registro.streetAdr ? '</p><p>Dirección: ' + registro.streetAdr.value : '') 
                        + (registro.postCode ? ' Código postal: ' + registro.postCode.value : '') 
                        + (registro.addressLocality && registro.addressLocality.value !== 'Zaragoza' ? ' ' + registro.addressLocality.value : '') 
                        + '</p>'
                        + (registro.accesibilidad ? '<p>' + registro.accesibilidad.value + '</p>' : '')
                        + (registro.latitud ? mapa : '');
                      break;
                 case 'monumento':
                       template = '<p>'
                        + (registro.datacion ? registro.datacion.value + '. ' : '')
                        + (registro.estilo ? registro.estilo.value + '. ' : '')
                        + (registro.comment ? registro.comment.value : '')
                        + '</p>'
                        + '<p>'
                        + (registro.horario ? 'Horario. ' + registro.horario.value : '') 
                        + (registro.price ? ' Precio. ' + registro.price.value : '') 
                        + (registro.uso ? ' Uso. ' + registro.uso.value : '') 
                        + '</p>'
                        + (registro.puntosInteres ? '<p><strong>Puntos de Interés</strong>. ' + registro.puntosInteres.value + '</p>': '') 
                        + (registro.detalleVisita ? '<p><strong>Visita</strong>. ' + registro.detalleVisita.value + '</p>': '') 
                        + '<p>'  
                        + (registro.tel ? ' Teléfono: ' + registro.tel.value : '') 
                        + (registro.fax ? ' Fax: ' + registro.fax.value : '') 
                        + (registro.streetAdr ? '</p><p>Dirección: ' + registro.streetAdr.value : '') 
                        + (registro.datosAcceso ? ' Acceso: ' + registro.datosAcceso.value : '') 
                        + (registro.foursquare ? ' Foursquare: ' + registro.foursquare.value : '') 
                        + '</p>'
                        + (registro.accesibilidad ? '<p>' + registro.accesibilidad.value + '</p>' : '')
                        + (registro.photo ? '<div><img src="' + registro.photo.value + '" height="100" class="center-block"/></div>' : '')
                        + (registro.latitud ? mapa : '');
                     break;
                 case 'alojamiento':
                    template = '<p>'
                        + (registro.logo ? '<img src="//www.zaragoza.es' + registro.logo.value + '" class="pull-right"/>' : '')
                        + (registro.comment ? registro.comment.value : '')
                        + '</p>'
                        + '<p>'
                        + (registro.numCamas ? registro.numCamas.value + ' camas ' : '') 
                        + (registro.numHabitaciones ? ' ' + registro.numHabitaciones.value + ' habitaciones' : '') 
                        + '</p>'
                        + '<p>'  
                        + (registro.url ? ' Sitio web: ' + '<a href="' + registro.url.value + '">' + registro.url.value + '</a>' : '') 
                        + (registro.tel ? ' Teléfono: ' + registro.tel.value : '') 
                        + (registro.fax ? ' Fax: ' + registro.fax.value : '') 
                        + (registro.email ? ' Mail: <a href="' + registro.email.value + '">' + registro.email.value+ '</a>' : '') 
                        + (registro.streetAdr ? '</p><p>Dirección: ' + registro.streetAdr.value : '') 
                        + (registro.postCode ? ' Código postal: ' + registro.postCode.value : '') 
                        + (registro.addressLocality && registro.addressLocality.value !== 'Zaragoza' ? ' ' + registro.addressLocality.value : '') 
                        + '</p>'
                        + (registro.accesibilidad ? '<p>' + registro.accesibilidad.value + '</p>' : '')
                        + (registro.photo ? '<div><img src="//www.zaragoza.es' + registro.photo.value + '" height="100" class="center-block"/></div>' : '')
                        + (registro.latitud ? mapa : '');
                     break;
                default:
                    template = '<dl class="dl-horizontal">';
                    for (prop in registro) {
                        template = template + '<dt>' + $filter('propiedad')(prop) + '</dt>'
                            + '<dd>' + $filter('valor')(registro[prop]) + '</dd>';
                    }
                    template = template + '</dl>';
                    // template = template + '<dl class="dl-horizontal">\
                    //     <dt ng-show="attrs.length<=0" ng-repeat-start="(key, value) in registro">{{key | propiedad}}</dt>\
                    //     <dd ng-show="attrs.length<=0" ng-repeat-end="" ng-bind-html="value | valor"></dd>\
                    //     <dt ng-show="attrs.length>0" ng-repeat-start="key in attrs">{{key | propiedad}}</dt>\
                    //     <dd ng-show="attrs.length>0" ng-repeat-end="" ng-bind-html="registro[key] | valor"></dd>';
                    break;
            }
            return ' <md-content md-theme="orange">' + template + '</md-content>';
        }

        var linker = function(scope, element, attrs) {
            scope.$watch(attrs.content, function(value) {
                if (value) {
                    registro = value;
                    if (registro.latitud && registro.longitud) {

                        scope.center = {
                         lat: Math.round10(registro.latitud.value, -4),
                         lng: Math.round10(registro.longitud.value, -4),
                         zoom: 14
                        }
                        scope.markers = {
                           main_marker: {
                                lat: Math.round10(registro.latitud.value, -4),
                                lng: Math.round10(registro.longitud.value, -4),
                                focus: true,
                                message: registro.title.value,
                                title: registro.title.value,
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
                    element.html(getTemplate(attrs.type || scope.vocab));
                    $compile(element.contents())(scope);
                }
            });
        }

        return {
            restrict: "E",
            link: linker,
        };
    })
;


// Closure
(function(){

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
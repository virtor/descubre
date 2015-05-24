'use strict';
angular.module('filtros', [])
    .filter('propiedad', function() {
        return function(input) {
            if (input.indexOf('#') > 0) {
                return input.substr(input.lastIndexOf('#') + 1, input.length);
            } else if (input.indexOf('/') > 0) {
                return input.substr(input.lastIndexOf('/') + 1, input.length);
            } else {
                return input;
            }
        };
    })
    .filter('identificador', function() {
        return function(input) {
            if (input.indexOf('#') > 0) {
                return input.substr(input.lastIndexOf('#') + 1, input.length);
            } else if (input.indexOf('/') > 0) {
                return input.substr(input.lastIndexOf('/') + 1, input.length);
            } else {
                return input;
            }
        };
    })
    .filter('tipo', function() {
        return function(uri) {
            if (uri.indexOf('/api/recurso/cultura-ocio/evento-zaragoza') >= 0) {
                return 'evento';
            } else if (uri.indexOf('/api/recurso/turismo/monumento') >= 0) {
                return 'monumento';
            } else if (uri.indexOf('/api/recurso/turismo/restaurante') >= 0) {
                return 'restaurante';
            } else if (uri.indexOf('/api/recurso/turismo/alojamiento') >= 0) {
                return 'alojamiento';
            } else if (uri.indexOf('/api/recurso/urbanismo-infraestructuras/equipamiento/recurso') >= 0) {
                return 'recurso';
            } else {
                return '';
            }
        };
    })
    .filter('queryDetalle', function() {
        return function(vocab, id) {
            if (vocab === "restaurante") {
                return query.filter.restaurante.format(id);
            } else if (vocab === "monumento") {
                return query.filter.monumento.format(id);
            } else if (vocab === "evento") {
                return query.filter.evento.format(id);
            } else if (vocab === "recurso") {
                return query.filter.recurso.format(id);
            } else if (vocab === "alojamiento") {
                return query.filter.alojamiento.format(id);

            }

            return '';
        };
    })
    .filter('getDate', function() {
        return function(registro) {
            if (registro.date) {
                if (registro.date.value) {
                    return registro.date.value;
                } else {
                    return registro.date;
                }
            } else if (registro.startDate) {
                if (registro.startDate.value) {
                    return registro.startDate.value;
                } else {
                    return registro.startDate;
                }
            } else if (registro.endDate) {
                if (registro.endDate.value) {
                    return registro.endDate.value;
                } else {
                    return registro.endDate;
                }
            } else {
                return undefined;
            }


        };
    })
    .filter('getStartTime', function() {
        return function(registro) {
            if (registro.startTime) {
                if (registro.startTime.value) {
                    return registro.startTime.value;
                } else {
                    return registro.startTime;
                }
            } else {
                return undefined;
            }

        };
    })
    .filter('getEndTime', function() {
        return function(registro) {
            if (registro.endTime) {
                if (registro.endTime.value) {
                    return registro.endTime.value;
                } else {
                    return registro.endTime;
                }
            } else {
                return undefined;
            }

        };
    })
    .filter('getLatitud', function() {
        return function(registro) {
            if (registro.latitud) {
                if (registro.latitud.value) {
                    return registro.latitud.value;
                } else {
                    return registro.latitud;
                }
            } else if (registro.geometry) {
                return registro.geometry.coordinates[1];
            } else {
                return undefined;
            }

        };
    })
    .filter('getLongitud', function() {
        return function(registro) {
            if (registro.longitud) {
                if (registro.longitud.value) {
                    return registro.longitud.value;
                } else {
                    return registro.longitud;
                }
            } else if (registro.geometry) {
                return registro.geometry.coordinates[0];
            } else {
                return undefined;
            }

        };
    })
    .filter('parsedate', function($filter) {
        return function(input) {
            var fec = input.split('-');
            var parseYear = ' yyyy';
            if (new Date().getFullYear() == fec[0]) {
                parseYear = '';
            }

            return $filter('date')(input, 'EEEE dd MMMM' + parseYear);
        };
    })
    .filter('valor', function() {
        return function(input) {
            if (Array.isArray(input)) {
                if (typeof input[0] == 'string' || input[0] instanceof String) {
                    return input;
                } else {
                    return input[0]['@value'];
                }
            } else {
                if (input) {
                    if (input.value) {
                        return input.value;
                    } else {
                        return input;
                    }
                } else {
                    return '';
                }
            }
        };
    });

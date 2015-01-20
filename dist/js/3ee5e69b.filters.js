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
        if (uri.indexOf('/api/recurso/cultura-ocio/evento-zaragoza') > 0) {
           return 'evento';
        } else if (uri.indexOf('/api/recurso/turismo/monumento') > 0) {
           return 'monumento';
        } else if (uri.indexOf('/api/recurso/turismo/restaurante') > 0) {
           return 'restaurante';
        } else if (uri.indexOf('/api/recurso/turismo/alojamiento') > 0) {
           return 'alojamiento';
        } else if (uri.indexOf('/api/recurso/urbanismo-infraestructuras/equipamiento/recurso') > 0) {
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
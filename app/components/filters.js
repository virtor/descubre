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
        } else {
            return '';
        }
    };
})
.filter('queryDetalle', function() {
    return function(vocab, id) {
        if (vocab === "restaurante") {
            return 'PREFIX locn: <http://www.w3.org/ns/locn#>\
                SELECT distinct ?uri ?title ?latitud ?longitud ?modified ?tel ?comment ?accesibilidad ?servesCuisine ?tenedores ?capacidad ?streetAdr ?addressLocality ?postCode ?email ?socioHoreca ?restauranteEnHotel ?fincaCatering ?locality ?logo ?photo ?url\
                WHERE { ?uri a <http://vocab.linkeddata.es/kos/turismo/restaurante>.\
                OPTIONAL {?uri rdfs:label  ?title.}\
                OPTIONAL {?uri dcterms:modified  ?modified.}\
                OPTIONAL {?uri rdfs:comment  ?comment.}\
                OPTIONAL {?uri s:addressLocality  ?addressLocality.}\
                OPTIONAL {?uri locn:postCode  ?postCode.}\
                OPTIONAL {?uri <http://www.w3.org/2006/vcard/ns#email>  ?email.}\
                OPTIONAL {?uri <http://www.w3.org/2006/vcard/ns#logo>  ?logo.}\
                OPTIONAL {?uri <http://www.w3.org/2006/vcard/ns#photo>  ?photo.}\
                OPTIONAL {?uri <http://www.w3.org/2006/vcard/ns#url>  ?url.}\
                OPTIONAL {?uri <http://www.w3.org/2006/vcard/ns#street-adr>  ?streetAdr.}\
                OPTIONAL {?uri <http://www.zaragoza.es/skos/vocab/capacidad>  ?capacidad.}\
                OPTIONAL {?uri <http://vocab.linkeddata.es/datosabiertos/def/turismo/lugar#accesibilidad>  ?accesibilidad.}\
                OPTIONAL {?uri <http://www.zaragoza.es/skos/vocab/restauranteEnHotel>  ?restauranteEnHotel.}\
                OPTIONAL {?uri <http://www.zaragoza.es/api/def/turismo/lugar#socioHoreca>  ?socioHoreca.}\
                OPTIONAL {?uri <http://schema.org/servesCuisine> ?servesCuisine.}\
                OPTIONAL {?uri <http://www.zaragoza.es/skos/vocab/fincaCatering> ?fincaCatering.}\
                OPTIONAL {?uri <http://www.w3.org/2006/vcard/ns#tel> ?telin.\
                    ?telin <http://www.w3.org/2006/vcard/ns#Tel> ?tel.\
                }\
                OPTIONAL {?uri geo:geometry ?geo.\
                ?geo geo:lat ?latitud.\
                ?geo geo:long ?longitud}.\
                ?uri dcterms:identifier "' + id + '".\
                }';
        } else if (vocab === "monumento") {
            return 'PREFIX locn: <http://www.w3.org/ns/locn#>\
                SELECT distinct ?uri ?title ?latitud ?longitud ?modified ?tel ?fax ?comment ?foursquare ?datacion ?uso ?datosAcceso ?estilo ?puntosInteres ?streetAdr ?horario ?price ?detalleVisita ?photo \
                WHERE { ?uri a <http://idi.fundacionctic.org/cruzar/turismo#Monumento>.\
                OPTIONAL {?uri rdfs:label  ?title.}\
                OPTIONAL {?uri dcterms:modified  ?modified.}\
                OPTIONAL {?uri rdfs:comment  ?comment.}\
                OPTIONAL {?uri <http://www.w3.org/2006/vcard/ns#photo>  ?photo.}\
                OPTIONAL {?uri <http://schema.org/streetAddress>  ?streetAdr.}\
                OPTIONAL {?uri <http://vocab.linkeddata.es/datosabiertos/def/turismo/lugar#estiloArtistico>  ?estilo.}\
                OPTIONAL {?uri <http://vocab.linkeddata.es/datosabiertos/def/turismo/lugar#puntosInteres>  ?puntosInteres.}\
                OPTIONAL {?uri <http://vocab.linkeddata.es/datosabiertos/def/turismo/lugar#datacion>  ?datacion.}\
                OPTIONAL {?uri <http://schema.org/price>  ?price.}\
                OPTIONAL {?uri <http://vocab.linkeddata.es/datosabiertos/def/turismo/lugar#uso>  ?uso.}\
                OPTIONAL {?uri <http://schema.org/openingHours>  ?horario.}\
                OPTIONAL {?uri <http://vocab.linkeddata.es/datosabiertos/def/turismo/lugar#foursquare>  ?foursquare.}\
                OPTIONAL {?uri <http://vocab.linkeddata.es/datosabiertos/def/turismo/lugar#datosAcceso> ?datosAcceso.}\
                OPTIONAL {?uri <http://vocab.linkeddata.es/datosabiertos/def/turismo/lugar#detalleVisita> ?detalleVisita.}\
                OPTIONAL {?uri <http://schema.org/telephone> ?tel.}\
                OPTIONAL {?uri <http://schema.org/faxNumber> ?fax.}\
                OPTIONAL {?uri geo:geometry ?geo.\
                ?geo geo:lat ?latitud.\
                ?geo geo:long ?longitud}.\
                ?uri dcterms:identifier "' + id + '".\
                }';
        } else if (vocab === "evento") {
            return 'SELECT distinct ?uri ?title ?latitud ?tipo ?subEvent ?longitud ?modified ?comment ?price ?accesible ?accesibilidad ?programa ?image ?maxParticipantes ?startDate ?endDate ?startTime ?endTime ?horario ?url\
                WHERE { ?uri a <http://vocab.linkeddata.es/datosabiertos/def/cultura-ocio/agenda#Evento>.\
                OPTIONAL {?uri rdfs:label  ?title.}\
                OPTIONAL {?uri dcterms:modified  ?modified.}\
                OPTIONAL {?uri rdfs:comment  ?comment.}\
                OPTIONAL {?uri <http://schema.org/price>  ?price.}\
                OPTIONAL {?uri <http://vocab.linkeddata.es/datosabiertos/def/cultura-ocio/agenda#accesible>  ?accesible.}\
                OPTIONAL {?uri <http://vocab.linkeddata.es/datosabiertos/def/cultura-ocio/agenda#programa>  ?programa.}\
                OPTIONAL {?uri <http://vocab.linkeddata.es/datosabiertos/def/cultura-ocio/agenda#tipoEntrada>  ?tipoEntrada.}\
                OPTIONAL {?uri <http://vocab.linkeddata.es/datosabiertos/def/cultura-ocio/agenda#numMaximoParticipantes>  ?maxParticipantes.}\
                OPTIONAL {?uri <http://www.w3.org/2006/vcard/ns#category>  ?tipo.}\
                OPTIONAL {?uri <http://schema.org/subEvent> ?subEvent.}\
                OPTIONAL {?subEvent <http://schema.org/startDate> ?startDate.}\
                OPTIONAL {?subEvent <http://schema.org/endDate> ?endDate.}\
                OPTIONAL {?subEvent <http://schema.org/startTime> ?startTime.}\
                OPTIONAL {?subEvent <http://schema.org/endTime> ?endTime.}\
                OPTIONAL {?subEvent <http://schema.org/openingHours> ?horario.}\
                OPTIONAL {?uri <http://schema.org/image>  ?image.}\
                OPTIONAL {?uri <http://schema.org/url>  ?url.}\
                OPTIONAL {?uri <http://vocab.linkeddata.es/datosabiertos/def/cultura-ocio/agenda#barrerasArquitectonicas>  ?accesibilidad.}\
                OPTIONAL {?uri geo:geometry ?geo.\
                ?geo geo:lat ?latitud.\
                ?geo geo:long ?longitud}.\
                ?uri dcterms:identifier "' + id + '".\
                }';
        } else if (vocab === "alojamiento") {
            return 'PREFIX locn: <http://www.w3.org/ns/locn#>\
                SELECT distinct ?uri ?title ?latitud ?longitud ?modified ?tel ?fax ?comment ?accesibilidad ?numCamas ?numHabitaciones ?streetAdr ?addressLocality ?postCode ?email ?socioHoreca ?categoria ?locality ?logo ?photo ?url\
                WHERE { ?uri a <http://vocab.linkeddata.es/kos/turismo/alojamiento>.\
                OPTIONAL {?uri rdfs:label  ?title.}\
                OPTIONAL {?uri dcterms:modified  ?modified.}\
                OPTIONAL {?uri rdfs:comment  ?comment.}\
                OPTIONAL {?uri s:addressLocality  ?addressLocality.}\
                OPTIONAL {?uri locn:postCode  ?postCode.}\
                OPTIONAL {?uri <http://schema.org/email>  ?email.}\
                OPTIONAL {?uri <http://www.w3.org/2006/vcard/ns#logo>  ?logo.}\
                OPTIONAL {?uri <http://www.w3.org/2006/vcard/ns#photo>  ?photo.}\
                OPTIONAL {?uri <http://www.w3.org/2006/vcard/ns#url>  ?url.}\
                OPTIONAL {?uri <http://www.w3.org/2006/vcard/ns#street-adr>  ?streetAdr.}\
                OPTIONAL {?uri <http://vocab.linkeddata.es/datosabiertos/def/turismo/alojamiento#numCamas>  ?numCamas.}\
                OPTIONAL {?uri <http://vocab.linkeddata.es/datosabiertos/def/turismo/alojamiento#numHabitaciones>  ?numHabitaciones.}\
                OPTIONAL {?uri <http://vocab.linkeddata.es/datosabiertos/def/turismo/lugar#accesibilidad>  ?accesibilidad.}\
                OPTIONAL {?uri <http://www.zaragoza.es/api/def/turismo/lugar#socioHoreca>  ?socioHoreca.}\
                OPTIONAL {?uri <http://vocab.linkeddata.es/datosabiertos/def/turismo/alojamiento#categoria> ?categoria.}\
                OPTIONAL {?uri <http://schema.org/telephone> ?tel.}\
                OPTIONAL {?uri <http://schema.org/faxNumber> ?fax.}\
                OPTIONAL {?uri geo:geometry ?geo.\
                ?geo geo:lat ?latitud.\
                ?geo geo:long ?longitud}.\
                ?uri dcterms:identifier "' + id + '".\
                }';

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

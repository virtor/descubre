'use strict';
var strings = [];
strings.es = {
    nav: {
        short_title: 'Zaragoza',
        title: 'Descubre la ciudad',
        child: 'Infancia',
        young: 'Jóvenes',
        elder: 'Personas Mayores',
        gastronomy: 'Gastronomía',
        accommodation: 'Alojamiento',
        events: 'Actividades',
        resources: 'Recursos',
        agenda: 'Agenda',
        search: 'Buscar'
    },
    index: {
        events: 'Actividades destacadas',
        monuments: 'Monumentos destacados'
    },
    facet: {
        clear: 'Borrar filtro',
        
    },
    search: {
        result: 'Resultado',
        query: 'Consulta'
    },
    sector: {
        youth: {
            menu: [{
                    opt: 'marcha',
                    text: 'Zonas Marcha',
                    uri: '/recurso/mapas-colaborativos/134?srsname=wgs84&rows=200'
                }, {
                    opt: 'noche',
                    text: 'Noche',
                    uri: '/recurso/mapas-colaborativos/125?srsname=wgs84&rows=200'
                }, {
                    opt: 'tomar',
                    text: 'Tomar Algo',
                    uri: '/recurso/mapas-colaborativos/135?srsname=wgs84&rows=200'
                }, {
                    opt: 'envivo',
                    text: 'Música en vivo',
                    uri: '/recurso/mapas-colaborativos/137?srsname=wgs84&rows=200'
                }, {
                    opt: 'zonasverdes',
                    text: 'Zonas verdes',
                    uri: '/recurso/mapas-colaborativos/139?srsname=wgs84&rows=200'
                }, {
                    opt: 'compras',
                    text: 'De compras',
                    uri: '/recurso/mapas-colaborativos/131?srsname=wgs84&rows=200'
                },
                // {opt:'bailar', text:'Para bailar', uri:'/recurso/mapas-colaborativos/129?srsname=wgs84&rows=200'},
                {
                    opt: 'tapas',
                    text: 'De tapas',
                    uri: '/recurso/mapas-colaborativos/130?srsname=wgs84&rows=200'
                },
                // {opt:'accion', text:'Acción', uri:'/recurso/mapas-colaborativos/127?srsname=wgs84&rows=200'},
                {
                    opt: 'ocio',
                    text: 'Ocio',
                    uri: '/recurso/mapas-colaborativos/136?srsname=wgs84&rows=200'
                }
            ]
        }
    },
    detail: {
        near: 'Cerca de aquí',
        addAgenda: 'Añadir a agenda',
        events: 'Actividades',
        monuments: 'Monumentos',
        gastronomy: 'Restaurantes',
        accommodation: 'Alojamientos',
        health: 'Sanidad',
        resources: 'Recursos',
        parking_bike: 'Aparcabicis',
        bizi: 'Bizi',
        taxi: 'Taxis',
        public_parking: 'Aparcamientos Públicos',
        motorcycle_parking: 'Aparcamientos para motos',
        filling_station: 'Gasolineras',
        label: {
            size: 'Capacidad',
            web_site: 'Sitio Web',
            phone: 'Teléfono',
            fax: 'Fax',
            email: 'Mail',
            address: 'Dirección',
            postal_code: 'Código postal',
            program: 'Programa',
            start_date: 'Fecha inicio',
            end_date: 'Fecha fin',
            start_time: 'Hora inicio',
            end_time: 'Hora fin',
            opening_hours: 'Horario',
            accession: 'Tipo de entrada',
            price: 'Precio',
            capacity: 'Número máximo de participantes',
            use: 'Uso',
            pois: 'Puntos de interés',
            visit: 'Visita',
            access: 'Acceso',
            foursquare: 'Foursquare',
            near: 'Cerca de aquí'
        },
        more: 'Más'
    }
};


var query = {
    /*jshint multistr: true */
    search: 'SELECT DISTINCT ?uri ?title min(?latitud) as ?latitud min(?longitud) as ?longitud \
        WHERE { \
         ?uri ?s  ?p. \
         ?uri rdfs:label  ?title. \
         ?uri geo:geometry ?geo. \
         ?geo geo:lat ?latitud. \
         ?geo geo:long ?longitud. \
         FILTER (REGEX(STR(?p), "{0}", "i")) \
        } group by ?uri ?title \
        OFFSET {1} LIMIT 50',
    filter: {
        evento: 'SELECT distinct ?uri ?title ?latitud ?tipo ?subEvent ?longitud ?modified ?comment ?price ?accesible ?accesibilidad ?programa ?image ?maxParticipantes ?startDate ?endDate ?startTime ?endTime ?horario ?url\
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
                ?uri dcterms:identifier "{0}".\
                }',
        alojamiento: 'PREFIX locn: <http://www.w3.org/ns/locn#>\
                SELECT distinct ?uri ?title ?latitud ?longitud ?modified ?tel ?fax ?comment ?accesibilidad ?numCamas ?numHabitaciones ?streetAdr ?addressLocality ?postCode ?email ?socioHoreca ?categoria ?logo ?photo ?url\
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
                ?uri dcterms:identifier "{0}".\
                }',
        restaurante: 'PREFIX locn: <http://www.w3.org/ns/locn#>\
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
                ?uri dcterms:identifier "{0}".\
                }',
        monumento: 'SELECT distinct ?uri ?title ?latitud ?longitud ?modified ?tel ?fax ?comment ?foursquare ?datacion ?uso ?datosAcceso ?estilo ?puntosInteres ?streetAdr ?horario ?price ?detalleVisita ?photo \
                WHERE { ?uri a <http://vocab.linkeddata.es/datosabiertos/def/turismo/lugar#LugarInteresTuristico>.\
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
                ?uri dcterms:identifier "{0}".\
                }',
        recurso: 'SELECT distinct ?uri ?title ?latitud ?longitud ?modified ?tel ?email ?url ?comment ?servicios ?accesibilidad ?streetAdr ?horario ?price  \
                WHERE { ?uri a <http://vocab.linkeddata.es/kos/urbanismo-infraestructuras/equipamiento>.\
                OPTIONAL {?uri rdfs:label  ?title.}\
                OPTIONAL {?uri dcterms:modified  ?modified.}\
                OPTIONAL {?uri rdfs:comment  ?comment.}\
                OPTIONAL {?uri <http://vocab.linkeddata.es/datosabiertos/def/turismo/lugar#servicios> ?servicios.}\
                OPTIONAL {?uri <http://schema.org/streetAddress>  ?streetAdr.}\
                OPTIONAL {?uri <http://purl.org/goodrelations/v1#hasOpeningHoursSpecification>  ?horario.}\
                OPTIONAL {?uri <http://www.w3.org/2006/vcard/ns#tel> ?telin.\
                    ?telin <http://www.w3.org/2006/vcard/ns#Tel> ?tel.\
                }\
                OPTIONAL {?uri <http://www.w3.org/2006/vcard/ns#email> ?email.}\
                OPTIONAL {?uri <http://www.w3.org/2006/vcard/ns#url> ?url.}\
                OPTIONAL {?uri <http://schema.org/price> ?price.}\
                OPTIONAL {?uri <http://vocab.linkeddata.es/datosabiertos/def/turismo/lugar#accesibilidad> ?accesibilidad.}\
                OPTIONAL {?uri geo:geometry ?geo.\
                ?geo geo:lat ?latitud.\
                ?geo geo:long ?longitud}.\
                ?uri dcterms:identifier "{0}".\
                }'
    },
    index: {
        actividades: 'PREFIX acto: <http://vocab.linkeddata.es/datosabiertos/def/cultura-ocio/agenda#> \
            PREFIX s: <http://schema.org/> \
            PREFIX skos: <http://www.w3.org/2004/02/skos/core#> \
            PREFIX ns: <http://www.w3.org/2006/vcard/ns#> \
            SELECT DISTINCT ?uri ?title ?startDate ?endDate ?startTime ?endTime ?horario ?tipo min(?latitud) as ?latitud min(?longitud) as ?longitud \
            WHERE { ?uri a acto:Evento. \
               OPTIONAL{ ?uri rdfs:label  ?title}.\
               OPTIONAL {?uri s:subEvent ?subEvent.}\
               OPTIONAL {?subEvent s:startDate ?startDate.}\
               OPTIONAL {?subEvent s:endDate ?endDate.}\
               OPTIONAL {?subEvent s:startTime ?startTime.}\
               OPTIONAL {?subEvent s:endTime ?endTime.}\
               OPTIONAL {?subEvent s:openingHours ?horario.}\
               OPTIONAL {?uri skos:broader/skos:prefLabel  ?tema.}\
               OPTIONAL {?uri ns:category/skos:prefLabel  ?subtema.}\
               OPTIONAL {?uri geo:geometry ?geo. \
                    ?geo geo:lat ?latitud. \
                    ?geo geo:long ?longitud.}\
               ?uri acto:destacada "true".\
               ?uri acto:orden ?orden.\
               bind (CONCAT(?tema, " ", ?subtema) AS ?tipo)\
            } group by ?uri ?title ?startDate ?endDate ?startTime ?endTime ?horario ?tipo ?orden \
            ORDER BY ASC(?orden) LIMIT 20',
        monumentos: 'PREFIX monumento: <http://vocab.linkeddata.es/datosabiertos/def/turismo/lugar#>\
            SELECT DISTINCT ?uri ?title ?tipo min(?latitud) as ?latitud min(?longitud) as ?longitud \
            WHERE { ?uri a monumento:LugarInteresTuristico. \
               OPTIONAL{ ?uri rdfs:label  ?title}.\
               ?uri monumento:estiloArtistico ?tipo. \
               ?uri monumento:destacado "S".\
               OPTIONAL {?uri geo:geometry ?geo. \
                    ?geo geo:lat ?latitud. \
                    ?geo geo:long ?longitud.}\
            } group by ?uri ?title ?tipo'
    },
    faceta: {

        events: {
            query: 'PREFIX acto: <http://vocab.linkeddata.es/datosabiertos/def/cultura-ocio/agenda#>\
            PREFIX s: <http://schema.org/>\
            PREFIX skos: <http://www.w3.org/2004/02/skos/core#>\
            PREFIX ns: <http://www.w3.org/2006/vcard/ns#>\
            SELECT DISTINCT ?uri ?title ?startDate ?endDate ?startTime ?endTime ?horario ?tipo min(?latitud) as ?latitud min(?longitud) as ?longitud \
            WHERE { ?uri a acto:Evento. \
                OPTIONAL{ ?uri rdfs:label ?title}. \
                OPTIONAL {?uri s:subEvent ?subEvent.} \
                OPTIONAL {?subEvent s:startDate ?startDate.} \
                OPTIONAL {?subEvent s:endDate ?endDate.} \
                OPTIONAL {?subEvent s:startTime ?startTime.} \
                OPTIONAL {?subEvent s:endTime ?endTime.} \
                OPTIONAL {?subEvent s:openingHours ?horario.} \
                OPTIONAL {?uri skos:broader/skos:prefLabel  ?tema.}\
                OPTIONAL {?uri ns:category/skos:prefLabel  ?subtema.}\
                bind (CONCAT(?tema, " ", ?subtema) AS ?tipo).\
                OPTIONAL {?uri geo:geometry ?geo. \
                    ?geo geo:lat ?latitud. \
                    ?geo geo:long ?longitud.} \
                bind (coalesce(xsd:date(?startDate), now()) as ?startAsDate) \
                bind(if(?startAsDate < now(), now(), ?startAsDate) AS ?startFixed) \
                bind (coalesce(xsd:date(?endDate), now()) as ?endFixed) \
                bind(bif:dateDiff(\'day\',?startFixed,?endFixed) as ?diff) \
                filter(?diff >= 0) . \
                filter(!strstarts(str(?tema), "Cursos") ).\
                {0} \
            }\
            group by ?uri ?title ?startDate ?endDate ?startTime ?endTime ?horario ?tipo ?startFixed ?diff \
            order by asc(?startFixed) asc(?diff)',

            facet: 'PREFIX acto: <http://vocab.linkeddata.es/datosabiertos/def/cultura-ocio/agenda#>\
            PREFIX ns: <http://www.w3.org/2006/vcard/ns#>\
            PREFIX skos: <http://www.w3.org/2004/02/skos/core#>\
            SELECT ?urifaceta ?faceta COUNT(?faceta) as ?numero \
            WHERE { ?uri a acto:Evento. \
                    ?uri skos:broader ?urifaceta. \
                    ?urifaceta skos:prefLabel ?faceta. \
                    filter(!strstarts(str(?faceta), "Cursos") ).\
                    {0}\
            } \
            GROUP BY ?urifaceta ?faceta'
        },
        gastronomy: {
            query: 'SELECT DISTINCT ?uri ?title ?tipo min(?latitud) as ?latitud min(?longitud) as ?longitud \
            WHERE { ?uri a <http://vocab.linkeddata.es/kos/turismo/restaurante>. \
               OPTIONAL{ ?uri rdfs:label  ?title}. \
               OPTIONAL {?uri <http://www.zaragoza.es/skos/vocab/tenedores> ?tenedores.} \
               bind(if(bound(?tenedores),concat(?tenedores," tenedor(es)"),"Restaurante") as ?tipo) . \
               {0} \
               OPTIONAL {?uri geo:geometry ?geo. \
                    ?geo geo:lat ?latitud. \
                    ?geo geo:long ?longitud.} \
            } group by ?uri ?title ?tipo \
            order by desc(?tipo)',

            facet: 'SELECT ?faceta COUNT(?faceta) as ?numero \
            WHERE { ?uri a <http://vocab.linkeddata.es/kos/turismo/restaurante>. \
                optional{?uri <http://www.zaragoza.es/skos/vocab/tenedores> ?tenedores.} \
				bind(if(bound(?tenedores),concat(?tenedores," tenedor(es)"),"Restaurante") as ?faceta) . \
				{0} \
            } \
            GROUP BY ?faceta'
        },
        accommodation: {
            query: 'PREFIX locn: <http://www.w3.org/ns/locn#> \
            SELECT DISTINCT ?uri ?title ?tipo min(?latitud) as ?latitud min(?longitud) as ?longitud \
            WHERE { ?uri a <http://vocab.linkeddata.es/kos/turismo/alojamiento>. \
               OPTIONAL{ ?uri rdfs:label  ?title}. \
               OPTIONAL {?uri <http://vocab.linkeddata.es/datosabiertos/def/turismo/alojamiento#categoria> ?tipo.} \
               OPTIONAL {?uri geo:geometry ?geo. \
                    ?geo geo:lat ?latitud. \
                    ?geo geo:long ?longitud.} \
               {0} \
            } group by ?uri ?title ?tipo \
            order by desc(?tipo)',

            facet: 'SELECT ?faceta COUNT(?faceta) as ?numero \
                WHERE { ?uri a <http://vocab.linkeddata.es/kos/turismo/alojamiento>. \
                ?uri <http://vocab.linkeddata.es/datosabiertos/def/turismo/alojamiento#categoria> ?faceta. \
                {0}\
                } \
                GROUP BY ?faceta'
        }
    },

    sector: {

        events: 'PREFIX acto: <http://vocab.linkeddata.es/datosabiertos/def/cultura-ocio/agenda#>\
            PREFIX s: <http://schema.org/>\
            PREFIX skos: <http://www.w3.org/2004/02/skos/core#>\
            PREFIX ns: <http://www.w3.org/2006/vcard/ns#>\
            SELECT DISTINCT ?uri ?title ?startDate ?endDate ?startTime ?endTime ?horario ?tipo min(?latitud) as ?latitud min(?longitud) as ?longitud \
            WHERE { ?uri a acto:Evento. \
                OPTIONAL{ ?uri rdfs:label ?title}. \
                OPTIONAL {?uri s:subEvent ?subEvent.} \
                OPTIONAL {?subEvent s:startDate ?startDate.} \
                OPTIONAL {?subEvent s:endDate ?endDate.} \
                OPTIONAL {?subEvent s:startTime ?startTime.} \
                OPTIONAL {?subEvent s:endTime ?endTime.} \
                OPTIONAL {?subEvent s:openingHours ?horario.} \
                OPTIONAL {?uri skos:broader/skos:prefLabel  ?tema.}\
                OPTIONAL {?uri ns:category/skos:prefLabel  ?subtema.}\
                bind (CONCAT(?tema, " ", ?subtema) AS ?tipo).\
                OPTIONAL {?uri geo:geometry ?geo. \
                    ?geo geo:lat ?latitud. \
                    ?geo geo:long ?longitud.} \
                bind (coalesce(xsd:date(?startDate), now()) as ?startAsDate) \
                bind(if(?startAsDate < now(), now(), ?startAsDate) AS ?startFixed) \
                bind (coalesce(xsd:date(?endDate), now()) as ?endFixed) \
                bind(bif:dateDiff(\'day\',?startFixed,?endFixed) as ?diff) \
                filter(?diff >= 0) . \
                filter(!strstarts(str(?tema), "Cursos") ).\
                ?uri s:typicalAgeRange <http://www.zaragoza.es/api/recurso/cultura-ocio/poblacion-destinataria/evento-zaragoza/{0}> \
            }\
            group by ?uri ?title ?startDate ?endDate ?startTime ?endTime ?horario ?tipo ?startFixed ?diff \
            order by asc(?startFixed) asc(?diff)',
        resources: 'SELECT ?uri ?title ?tipo min(?latitud) as ?latitud min(?longitud) as ?longitud\
            {\
                SELECT DISTINCT ?uri ?title (group_concat(distinct ?tipo;separator=",")) as ?tipo ?latitud ?longitud\
                  WHERE { ?uri a <http://vocab.linkeddata.es/kos/urbanismo-infraestructuras/equipamiento>. \
                      OPTIONAL{ ?uri rdfs:label  ?title}. \
                      ?uri <http://www.w3.org/2006/vcard/ns#category> ?tipoInt. \
                      ?tipoInt rdfs:label ?tipo. \
                      OPTIONAL {?uri geo:geometry ?geo. \
                        ?geo geo:lat ?latitud. \
                        ?geo geo:long ?longitud.}\
                      ?uri <http://schema.org/typicalAgeRange> <http://www.zaragoza.es/api/recurso/clase-persona/{0}> \
                      } \
                  group by ?uri ?title ?latitud ?longitud \
                  order by ?title\
            }group by ?uri ?title ?tipo'
    }
};

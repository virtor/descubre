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
        resources: 'Equipamientos',
        agenda: ' Favoritos',
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
        resources: 'Equipamientos',
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
        evento: 'PREFIX agenda: <http://vocab.linkeddata.es/datosabiertos/def/cultura-ocio/agenda#>\
                PREFIX s: <http://schema.org>\
                PREFIX ns: <http://www.w3.org/2006/vcard/ns#>\
                SELECT distinct ?uri ?title ?latitud ?tipo ?subEvent ?longitud ?modified ?comment ?price ?accesible ?accesibilidad ?programa ?image ?maxParticipantes ?startDate ?endDate ?startTime ?endTime ?horario ?url\
                WHERE { ?uri a agenda:Evento.\
                OPTIONAL {?uri rdfs:label  ?title.}\
                OPTIONAL {?uri dcterms:modified  ?modified.}\
                OPTIONAL {?uri rdfs:comment  ?comment.}\
                OPTIONAL {?uri s:price  ?price.}\
                OPTIONAL {?uri agenda:accesible  ?accesible.}\
                OPTIONAL {?uri agenda:programa  ?programa.}\
                OPTIONAL {?uri agenda:tipoEntrada  ?tipoEntrada.}\
                OPTIONAL {?uri agenda:numMaximoParticipantes  ?maxParticipantes.}\
                OPTIONAL {?uri ns:category  ?tipo.}\
                OPTIONAL {?uri s:subEvent ?subEvent.}\
                OPTIONAL {?subEvent s:startDate ?startDate.}\
                OPTIONAL {?subEvent s:endDate ?endDate.}\
                OPTIONAL {?subEvent s:startTime ?startTime.}\
                OPTIONAL {?subEvent s:endTime ?endTime.}\
                OPTIONAL {?subEvent s:openingHours ?horario.}\
                OPTIONAL {?uri s:image  ?image.}\
                OPTIONAL {?uri s:url  ?url.}\
                OPTIONAL {?uri agenda:barrerasArquitectonicas  ?accesibilidad.}\
                OPTIONAL {?uri geo:geometry ?geo.\
                ?geo geo:lat ?latitud.\
                ?geo geo:long ?longitud}.\
                ?uri dcterms:identifier "{0}".\
                }',
        alojamiento: 'PREFIX aloj: <http://vocab.linkeddata.es/datosabiertos/def/turismo/alojamiento#>\
                PREFIX s: <http://schema.org>\
                PREFIX lugar: <http://vocab.linkeddata.es/datosabiertos/def/turismo/lugar#>\
                PREFIX zgz: <http://www.zaragoza.es/api/def/turismo/lugar#>\
                PREFIX ns: <http://www.w3.org/2006/vcard/ns#>\
                PREFIX locn: <http://www.w3.org/ns/locn#>\
                SELECT distinct ?uri ?title ?latitud ?longitud ?modified ?tel ?fax ?comment ?accesibilidad ?numCamas ?numHabitaciones ?streetAdr ?addressLocality ?postCode ?email ?socioHoreca ?categoria ?logo ?photo ?url\
                WHERE { ?uri a <http://vocab.linkeddata.es/kos/turismo/alojamiento>.\
                OPTIONAL {?uri rdfs:label  ?title.}\
                OPTIONAL {?uri dcterms:modified  ?modified.}\
                OPTIONAL {?uri rdfs:comment  ?comment.}\
                OPTIONAL {?uri s:addressLocality  ?addressLocality.}\
                OPTIONAL {?uri locn:postCode  ?postCode.}\
                OPTIONAL {?uri s:email ?email.}\
                OPTIONAL {?uri ns:logo  ?logo.}\
                OPTIONAL {?uri ns:photo  ?photo.}\
                OPTIONAL {?uri ns:url  ?url.}\
                OPTIONAL {?uri ns:street-adr  ?streetAdr.}\
                OPTIONAL {?uri aloj:numCamas  ?numCamas.}\
                OPTIONAL {?uri aloj:numHabitaciones  ?numHabitaciones.}\
                OPTIONAL {?uri lugar:accesibilidad  ?accesibilidad.}\
                OPTIONAL {?uri zgz:socioHoreca  ?socioHoreca.}\
                OPTIONAL {?uri aloj:categoria ?categoria.}\
                OPTIONAL {?uri s:telephone ?tel.}\
                OPTIONAL {?uri s:faxNumber ?fax.}\
                OPTIONAL {?uri geo:geometry ?geo.\
                ?geo geo:lat ?latitud.\
                ?geo geo:long ?longitud}.\
                ?uri dcterms:identifier "{0}".\
                }',
        restaurante: 'PREFIX tur: <http://vocab.linkeddata.es/kos/turismo/>\
                PREFIX s: <http://schema.org>\
                PREFIX lugar: <http://vocab.linkeddata.es/datosabiertos/def/turismo/lugar#>\
                PREFIX zgz: <http://www.zaragoza.es/api/def/turismo/lugar#>\
                PREFIX zgzkos: <http://www.zaragoza.es/skos/vocab/>\
                PREFIX ns: <http://www.w3.org/2006/vcard/ns#>\
                PREFIX locn: <http://www.w3.org/ns/locn#>\
                SELECT distinct ?uri ?title ?latitud ?longitud ?modified ?tel ?comment ?accesibilidad ?servesCuisine ?tenedores ?capacidad ?streetAdr ?addressLocality ?postCode ?email ?socioHoreca ?restauranteEnHotel ?fincaCatering ?locality ?logo ?photo ?url\
                WHERE { ?uri a tur:restaurante.\
                OPTIONAL {?uri rdfs:label  ?title.}\
                OPTIONAL {?uri dcterms:modified  ?modified.}\
                OPTIONAL {?uri rdfs:comment  ?comment.}\
                OPTIONAL {?uri s:addressLocality  ?addressLocality.}\
                OPTIONAL {?uri locn:postCode  ?postCode.}\
                OPTIONAL {?uri ns:email  ?email.}\
                OPTIONAL {?uri ns:logo  ?logo.}\
                OPTIONAL {?uri ns:photo  ?photo.}\
                OPTIONAL {?uri ns:url  ?url.}\
                OPTIONAL {?uri ns:street-adr  ?streetAdr.}\
                OPTIONAL {?uri zgzkos:capacidad  ?capacidad.}\
                OPTIONAL {?uri lugar:accesibilidad ?accesibilidad.}\
                OPTIONAL {?uri zgzkos:restauranteEnHotel  ?restauranteEnHotel.}\
                OPTIONAL {?uri zgz:socioHoreca  ?socioHoreca.}\
                OPTIONAL {?uri s:servesCuisine ?servesCuisine.}\
                OPTIONAL {?uri zgzkos:fincaCatering ?fincaCatering.}\
                OPTIONAL {?uri ns:tel ?telin.\
                    ?telin ns:Tel ?tel.\
                }\
                OPTIONAL {?uri geo:geometry ?geo.\
                ?geo geo:lat ?latitud.\
                ?geo geo:long ?longitud}.\
                ?uri dcterms:identifier "{0}".\
                }',
        monumento: 'PREFIX tur: <http://vocab.linkeddata.es/kos/turismo/>\
                PREFIX s: <http://schema.org>\
                PREFIX lugar: <http://vocab.linkeddata.es/datosabiertos/def/turismo/lugar#>\
                PREFIX ns: <http://www.w3.org/2006/vcard/ns#>\
                SELECT distinct ?uri ?title ?latitud ?longitud ?modified ?tel ?fax ?comment ?foursquare ?datacion ?uso ?datosAcceso ?estilo ?puntosInteres ?streetAdr ?horario ?price ?detalleVisita ?photo \
                WHERE { ?uri a lugar:LugarInteresTuristico.\
                OPTIONAL {?uri rdfs:label  ?title.}\
                OPTIONAL {?uri dcterms:modified  ?modified.}\
                OPTIONAL {?uri rdfs:comment  ?comment.}\
                OPTIONAL {?uri ns:photo  ?photo.}\
                OPTIONAL {?uri s:streetAddress  ?streetAdr.}\
                OPTIONAL {?uri lugar:estiloArtistico  ?estilo.}\
                OPTIONAL {?uri lugar:puntosInteres  ?puntosInteres.}\
                OPTIONAL {?uri lugar:datacion  ?datacion.}\
                OPTIONAL {?uri s:price  ?price.}\
                OPTIONAL {?uri lugar:uso  ?uso.}\
                OPTIONAL {?uri s:openingHours  ?horario.}\
                OPTIONAL {?uri lugar:foursquare  ?foursquare.}\
                OPTIONAL {?uri lugar:datosAcceso ?datosAcceso.}\
                OPTIONAL {?uri lugar:detalleVisita ?detalleVisita.}\
                OPTIONAL {?uri s:telephone ?tel.}\
                OPTIONAL {?uri s:faxNumber ?fax.}\
                OPTIONAL {?uri geo:geometry ?geo.\
                ?geo geo:lat ?latitud.\
                ?geo geo:long ?longitud}.\
                ?uri dcterms:identifier "{0}".\
                }',
        recurso: 'PREFIX urb: <http://vocab.linkeddata.es/kos/urbanismo-infraestructuras/>\
                PREFIX s: <http://schema.org>\
                PREFIX lugar: <http://vocab.linkeddata.es/datosabiertos/def/turismo/lugar#>\
                PREFIX ns: <http://www.w3.org/2006/vcard/ns#>\
                PREFIX gr: <http://purl.org/goodrelations/v1#>\
                SELECT distinct ?uri ?title ?latitud ?longitud ?modified ?tel ?email ?url ?comment ?servicios ?accesibilidad ?streetAdr ?horario ?price  \
                WHERE { ?uri a urb:equipamiento.\
                OPTIONAL {?uri rdfs:label  ?title.}\
                OPTIONAL {?uri dcterms:modified  ?modified.}\
                OPTIONAL {?uri rdfs:comment  ?comment.}\
                OPTIONAL {?uri lugar:servicios ?servicios.}\
                OPTIONAL {?uri s:streetAddress  ?streetAdr.}\
                OPTIONAL {?uri gr:hasOpeningHoursSpecification  ?horario.}\
                OPTIONAL {?uri ns:tel ?telin.\
                    ?telin ns:Tel ?tel.\
                }\
                OPTIONAL {?uri ns:email ?email.}\
                OPTIONAL {?uri ns:url ?url.}\
                OPTIONAL {?uri s:price ?price.}\
                OPTIONAL {?uri lugar:accesibilidad ?accesibilidad.}\
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
               ?uri acto:orden ?ordenInterno.\
               bind (xsd:int(?ordenInterno) as ?orden)\
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
                ?uri acto:diasParaTerminar ?diasParaTerminarstr.\
                OPTIONAL {?uri geo:geometry ?geo. \
                    ?geo geo:lat ?latitud. \
                    ?geo geo:long ?longitud.} \
                bind (coalesce(xsd:date(?startDate), now()) as ?startAsDate) \
                bind (xsd:int(?diasParaTerminarstr) as ?diasParaTerminar) \
                filter(?diasParaTerminar >= 0) . \
                filter(!strstarts(str(?tema), "Cursos") ).\
                {0} \
            }\
            group by ?diasParaTerminar ?uri ?title ?startDate ?endDate ?startTime ?endTime ?horario ?tipo \
            order by asc(?diasParaTerminar)',

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
                ?uri acto:diasParaTerminar ?diasParaTerminarstr.\
                OPTIONAL {?uri geo:geometry ?geo. \
                    ?geo geo:lat ?latitud. \
                    ?geo geo:long ?longitud.} \
                bind (coalesce(xsd:date(?startDate), now()) as ?startAsDate) \
                bind (xsd:int(?diasParaTerminarstr) as ?diasParaTerminar) \
                filter(?diasParaTerminar >= 0) . \
                filter(!strstarts(str(?tema), "Cursos") ).\
                ?uri s:typicalAgeRange <http://www.zaragoza.es/api/recurso/cultura-ocio/poblacion-destinataria/evento-zaragoza/{0}> \
            }\
            group by ?diasParaTerminar ?uri ?title ?startDate ?endDate ?startTime ?endTime ?horario ?tipo \
            order by asc(?diasParaTerminar)',
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

 'use strict';

describe('descubre.services module', function() {

  beforeEach(module('descubre.services'));

  var Agenda;
  var Query;
  var httpBackend;
  var timeout;

  beforeEach(inject(function($injector,$httpBackend,$timeout) {
    Agenda = $injector.get('Agenda');
    Query = $injector.get('Query');

    httpBackend = $httpBackend;
    timeout = $timeout;
  }));

  describe('when invoked', function() {
    it('Query definida', function() {
      expect(Query).toBeDefined();
    });


    it('Ejecutar query contra SPARQL', function() {
      // Query.list('select distinct ?Concept where {[] a ?Concept} LIMIT 100','');
      Query.describe('http://www.zaragoza.es/api/recurso/cultura-ocio/evento-zaragoza/138035');
    });

    it('Ejecutar query contra SOLR', function() {
      // Query.list('select distinct ?Concept where {[] a ?Concept} LIMIT 100','');
      httpBackend.whenJSONP("http://www.zaragoza.es/buscador/select?&facet=true&facet.mincount=1&fl=uri,title,id,texto_t,x_coordinate,y_coordinate,last_modified,temas_smultiple&json.wrf=JSON_CALLBACK&q=*:*+AND+-tipocontenido_s:estatico+AND+category:undefined&rows=100&start=0&wt=json")
        .respond({"responseHeader":{"status":0,"QTime":4,"params":{"wt":"json","rows":"100","start":"0","facet":"true","json.wrf":"JSON_CALLBACK","facet.mincount":"1","q":"*:* AND -tipocontenido_s:estatico AND category:undefined","fl":"uri,title,id,texto_t,x_coordinate,y_coordinate,last_modified,temas_smultiple"}},"response":{"numFound":0,"start":0,"docs":[]},"facet_counts":{"facet_queries":{},"facet_fields":{},"facet_dates":{},"facet_ranges":{}},"spellcheck":{"suggestions":["undefined",{"numFound":1,"startOffset":47,"endOffset":56,"suggestion":["undefin"]},"collation","*:* AND -tipocontenido_s:estatico AND category:undefin"]}});

      Query.getSolr('*:*').then(function (data) {
        expect(data).toBeDefined();
      });
      timeout.flush();
      httpBackend.flush();  
    });

    it('Agenda definida', function() {
      expect(Agenda).toBeDefined();
    });

    it('Agenda definida', function() {
      var registro = {
        uri:'http://www.zaragoza.es/api/recurso/evento-zaragoza/12',
        title:'Titulo de acto',
        date:'2015-04-20',
        startTime:'20:00',
        endTime:'22:00',
        latitud:'0.12',
        longitud:'46.12'
      };

      var listado;
      
      Agenda.add(registro);

      listado = Agenda.list();
  
      expect(listado.dated).toBeDefined();
      expect(Agenda.existe(registro)).toBe(true);
      var dato = Agenda.get(0,'2015-04-20','dated');
      
      expect(dato).toBeDefined();
      
      Agenda.remove(0,'2015-04-20','dated');

      listado = Agenda.list();
      expect(listado).toBeDefined();

    });

  });
});
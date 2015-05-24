'use strict';
describe('filter', function() {

beforeEach(module('filtros'));

describe('propiedad', function() {
  it('debe obtener el nombre de la propiedad en base a una uri',
      inject(function(propiedadFilter) {
    expect(propiedadFilter("http://www.zaragoza.es/api/valorpropiedad")).toEqual("valorpropiedad");
    expect(propiedadFilter("http://www.zaragoza.es/api#valorpropiedad")).toEqual("valorpropiedad");
    expect(propiedadFilter("sinuri")).toEqual("sinuri");
  }));
});


describe('identificador', function() {
  it('debe obtener el identificador del recurso en base a una uri',
      inject(function(identificadorFilter) {
    expect(identificadorFilter("http://www.zaragoza.es/api/identificador")).toEqual("identificador");
    expect(identificadorFilter("http://www.zaragoza.es/api#identificador")).toEqual("identificador");
    expect(identificadorFilter("sinuri")).toEqual("sinuri");
  }));
});


describe('tipo', function() {
  it('debe obtener el tipo de un recurso en base a una uri',
      inject(function(tipoFilter) {
    expect(tipoFilter("/api/recurso/cultura-ocio/evento-zaragoza")).toEqual("evento");
    expect(tipoFilter("/api/recurso/turismo/monumento")).toEqual("monumento");
    expect(tipoFilter("/api/recurso/turismo/restaurante")).toEqual("restaurante");
    expect(tipoFilter("/api/recurso/turismo/alojamiento")).toEqual("alojamiento");
    expect(tipoFilter("/api/recurso/urbanismo-infraestructuras/equipamiento/recurso")).toEqual("recurso");
    expect(tipoFilter("/erroneo")).toEqual("");
  }));
});



describe('queryDetalle', function() {
  it('debe obtener la consulta sparql en base a un tipo',
      inject(function(queryDetalleFilter) {
    expect(queryDetalleFilter("restaurante","1")).toEqual(query.filter.restaurante.format("1"));
    expect(queryDetalleFilter("monumento","1")).toEqual(query.filter.monumento.format("1"));
    expect(queryDetalleFilter("evento","1")).toEqual(query.filter.evento.format("1"));
    expect(queryDetalleFilter("recurso","1")).toEqual(query.filter.recurso.format("1"));
    expect(queryDetalleFilter("alojamiento","1")).toEqual(query.filter.alojamiento.format("1"));
    expect(queryDetalleFilter("noexiste","1")).toEqual("");
    
  }));
});


describe('getDate', function() {
  it('debe obtener la fecha de un registro',
      inject(function(getDateFilter) {

    var registro = {date:'21-12-2014'};
    expect(getDateFilter(registro)).toEqual(registro.date);

    registro = {date:{value:'22-12-2014'}};
    expect(getDateFilter(registro)).toEqual(registro.date.value);


    registro = {startDate:'23-12-2014'};
    expect(getDateFilter(registro)).toEqual(registro.startDate);
    registro = {startDate:{value:'24-12-2014'}};
    expect(getDateFilter(registro)).toEqual(registro.startDate.value);

    registro = {endDate:'25-12-2014'};
    expect(getDateFilter(registro)).toEqual(registro.endDate);
    registro = {endDate:{value:'26-12-2014'}};
    expect(getDateFilter(registro)).toEqual(registro.endDate.value);

    registro = {valorErroneo:'20-12-2014'};
    expect(getDateFilter(registro)).toBeUndefined();
    
  }));
});

describe('getStartTime', function() {
  it('debe obtener la hora de inicio de un registro',
      inject(function(getStartTimeFilter) {

    var registro = {startTime:'12:00'};
    expect(getStartTimeFilter(registro)).toEqual(registro.startTime);

    registro = {startTime:{value:'12:00'}};
    expect(getStartTimeFilter(registro)).toEqual(registro.startTime.value);

    registro = {valorErroneo:'14:00'};
    expect(getStartTimeFilter(registro)).toBeUndefined();
    
  }));
});

describe('getEndTime', function() {
  it('debe obtener la hora de fin de un registro',
      inject(function(getEndTimeFilter) {

    var registro = {endTime:'12:00'};
    expect(getEndTimeFilter(registro)).toEqual(registro.endTime);

    registro = {endTime:{value:'12:00'}};
    expect(getEndTimeFilter(registro)).toEqual(registro.endTime.value);

    registro = {valorErroneo:'14:00'};
    expect(getEndTimeFilter(registro)).toBeUndefined();
    
  }));
});

describe('getLatitud', function() {
  it('debe obtener la latitud de un registro',
      inject(function(getLatitudFilter) {

    var registro = {latitud:'1.23'};
    expect(getLatitudFilter(registro)).toEqual(registro.latitud);

    registro = {latitud:{value:'2.32'}};
    expect(getLatitudFilter(registro)).toEqual(registro.latitud.value);

    registro = {geometry:{coordinates:[0.12,2.3]}};
    expect(getLatitudFilter(registro)).toEqual(registro.geometry.coordinates[1]);

    registro = {valorErroneo:'2312.2'};
    expect(getLatitudFilter(registro)).toBeUndefined();
    
  }));
});

describe('getLongitud', function() {
  it('debe obtener la longitud de un registro',
      inject(function(getLongitudFilter) {

    var registro = {longitud:'1.23'};
    expect(getLongitudFilter(registro)).toEqual(registro.longitud);

    registro = {longitud:{value:'2.32'}};
    expect(getLongitudFilter(registro)).toEqual(registro.longitud.value);

    registro = {geometry:{coordinates:[0.12,2.3]}};
    expect(getLongitudFilter(registro)).toEqual(registro.geometry.coordinates[0]);

    registro = {valorErroneo:'2312.2'};
    expect(getLongitudFilter(registro)).toBeUndefined();
    
  }));
});

describe('valor', function() {
  it('debe obtener el valor de un objeto',
      inject(function(valorFilter) {
    var obj = {};
    obj.value = "valor";
    expect(valorFilter(obj)).toEqual("valor");
    
    obj = {};
    obj = "valor";
    expect(valorFilter(obj)).toEqual("valor");

    obj = undefined;
    expect(valorFilter(obj)).toEqual("");

    obj = ["valor"];
    expect(valorFilter(obj)).toEqual(obj);

    obj = {"@value" : "valor"};
    var arr = [obj];
    expect(valorFilter(arr)).toEqual("valor");

  }));
});


});
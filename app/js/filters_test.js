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
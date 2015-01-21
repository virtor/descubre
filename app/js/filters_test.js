'use strict';
describe('filter', function() {

beforeEach(module('filtros'));

describe('propiedad', function() {
  it('debe obtener el nombre de la propiedad en base a una uri',
      inject(function(propiedadFilter) {
    expect(propiedadFilter("http://www.zaragoza.es/api/valorpropiedad")).toEqual("valorpropiedad");
    expect(propiedadFilter("http://www.zaragoza.es/api#valorpropiedad")).toEqual("valorpropiedad");
  }));
});
});
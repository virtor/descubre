'use strict';

describe('descubre.services module', function() {

  beforeEach(module('descubre.services'));

  var Agenda;
  var Query;

  beforeEach(inject(function($injector) {
    Agenda = $injector.get('Agenda');
    Query = $injector.get('Query');
  }));

  describe('when invoked', function() {
    it('Query definida', function() {
      expect(Query).toBeDefined();
    });
    it('Agenda definida', function() {
      expect(Agenda).toBeDefined();
    });
  });
});
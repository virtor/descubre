'use strict';

angular.module('descubre.index', ['ngRoute', 'descubre.services', 'filtros','ngMaterial', 'ui.bootstrap', 'ngSanitize'])
 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/index', {
        templateUrl: 'index/index.html',
        controller: 'IndexCtrl as ctrl'
    });
}])

.controller('IndexCtrl', ['$scope', 'Query', 'Agenda', '$filter', '$mdSidenav', function($scope, Query, Agenda, $filter, $mdSidenav) {
    $mdSidenav('left').close();

    $scope.actividades = [];
    $scope.monumentos = [];
    // $scope.restaurantes = [];
    $scope.progresoCarga=0;

    Query.list(query.index.actividades).then(function(result) {
        $scope.actividades = result.results.bindings;
        $scope.progresoCarga = $scope.progresoCarga + 50;
    });

    Query.list(query.index.monumentos).then(function(result) {
        $scope.monumentos = result.results.bindings;
        $scope.progresoCarga = $scope.progresoCarga + 50;
    });

/*    $scope.addCalendar = function(e){
    alert('asa');
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    Agenda.add($scope.detalle);
  };
*/
    // Query.list('SELECT distinct ?type ?uri ?title ?tenedores ?latitud ?longitud\
    //     WHERE { ?uri a <http://vocab.linkeddata.es/kos/turismo/restaurante>.\
    //     OPTIONAL {?uri rdfs:label  ?title.}\
    //     ?uri <http://www.zaragoza.es/skos/vocab/tenedores>  ?tenedores.\
    //     OPTIONAL {?uri geo:geometry ?geo.\
    //     ?geo geo:lat ?latitud.\
    //     ?geo geo:long ?longitud}.\
    //     } ORDER BY DESC(?tenedores) \
    //     LIMIT 20').then(function(result) {
    //     $scope.restaurantes = result.results.bindings;
    //     $scope.progresoCarga = $scope.progresoCarga + 34;
    // });

}])
.controller('DetalleController', ['$scope', 'Query', 'Agenda', '$filter', function($scope, Query, Agenda, $filter) {
  /*
  $scope.claseParquimetro='';
  $scope.claseRestaurante='';
  $scope.claseAlojamiento='';
  $scope.claseMonumento='';
  $scope.claseRecurso='';
  $scope.claseActo='';  
  $scope.claseAparcabici=''; 
  $scope.claseBizi=''; 
  $scope.claseParadaTaxi=''; 
  $scope.claseAparcamiento=''; 
  $scope.claseGasolinera=''; 
  $scope.claseMoto=''; 
  */
  $scope.parquimetrosCercanos = function(){
     $scope.claseParquimetro='glyphicon glyphicon-refresh';
     Query.getApi('/recurso/urbanismo-infraestructuras/equipamiento/parquimetro?rows=30&fl=id,title,description,geometry&srsname=wgs84&point=' + $scope.detalle.longitud.value + '%2C' + $scope.detalle.latitud.value + '&distance=1000').then(function(resultado) {
        var icono = {
            iconUrl: '//www.zaragoza.es/contenidos/iconos/parquimetro_ESRO.png',
             iconSize: [22, 22]
        }

        $scope.markers = {
            main_marker: {
                lat: Math.round10($scope.detalle.latitud.value, -4),
                lng: Math.round10($scope.detalle.longitud.value, -4),
                focus: true,
                message: $scope.detalle.title.value,
                draggable: false
            }
        };
        if (resultado.result && resultado.result.length > 0) {
          $scope.claseParquimetro='';
          for (var i in resultado.result) {
            var result = resultado.result[i];
            $scope.markers['rest' + result.id] = {
                  lat: Math.round10(result.geometry.coordinates[1], -4),
                  lng: Math.round10(result.geometry.coordinates[0], -4),
                  message: '<strong>' + result.title + '</strong>',
                  icon:icono
            };
          }
        } else {
          $scope.claseParquimetro = 'glyphicon glyphicon-exclamation-sign'
        }
    }, function(reason) {
        $scope.claseParquimetro = 'glyphicon glyphicon-remove-circle'
    });
  };

  $scope.restaurantesCercanos = function(){
     $scope.claseRestaurante='glyphicon glyphicon-refresh';
     Query.getApi('/recurso/turismo/restaurante?rows=200&fl=id,title,tenedores,description,geometry&srsname=wgs84&point=' + $scope.detalle.longitud.value + '%2C' + $scope.detalle.latitud.value + '&distance=1000').then(function(resultado) {
        var icono = {
            iconUrl: '//www.zaragoza.es/contenidos/iconos/restaurante20.png',
             iconSize: [22, 22]
        }

        $scope.markers = {
            main_marker: {
                lat: Math.round10($scope.detalle.latitud.value, -4),
                lng: Math.round10($scope.detalle.longitud.value, -4),
                focus: true,
                message: $scope.detalle.title.value,
                draggable: false
            }
        };
        if (resultado.result && resultado.result.length > 0) {
          $scope.claseRestaurante='';
          for (var i in resultado.result) {
            var result = resultado.result[i];
            $scope.markers['rest' + result.id] = {
                  lat: Math.round10(result.geometry.coordinates[1], -4),
                  lng: Math.round10(result.geometry.coordinates[0], -4),
                  message: '<strong>' + result.title 
                    + (angular.isDefined(result.tenedores) ? '. <small>Tenedores: ' + result.tenedores + '</small>': '') 
                    + '</strong><br/>' 
                    + result.description,
                  icon:icono
            };
          }
        } else {
          $scope.claseRestaurante = 'glyphicon glyphicon-exclamation-sign'
        }
    }, function(reason) {
        $scope.claseRestaurante = 'glyphicon glyphicon-remove-circle'
    });
  };
  $scope.actosCercanos = function(){
     $scope.claseActo='glyphicon glyphicon-refresh';
     Query.getApi('/recurso/cultura-ocio/evento-zaragoza/?rows=200&fl=id,title,start_date,end_date,subEvent,description,geometry&srsname=wgs84&point=' + $scope.detalle.longitud.value + '%2C' + $scope.detalle.latitud.value + '&distance=1000').then(function(resultado) {
        var icono = {
            iconUrl: '//www.zaragoza.es/contenidos/iconos/agenda.png',
             iconSize: [22, 22]
        }

        $scope.markers = {
            main_marker: {
                lat: Math.round10($scope.detalle.latitud.value, -4),
                lng: Math.round10($scope.detalle.longitud.value, -4),
                focus: true,
                message: $scope.detalle.title.value,
                draggable: false
            }
        };
        if (resultado.result && resultado.result.length > 0) {
          $scope.claseActo='';
          for (var i in resultado.result) {
            var result = resultado.result[i];
            $scope.markers['rest' + result.id] = {
                  lat: Math.round10(result.geometry.coordinates[1], -4),
                  lng: Math.round10(result.geometry.coordinates[0], -4),
                  message: '<strong>' + result.title + '</strong><div>'
                    + (angular.isDefined(result.subEvent[0].fechaInicio) ? '<small>' + $filter('date')(result.subEvent[0].fechaInicio, 'dd-MM-yyyy') + '</small>': '') 
                    + (angular.isDefined(result.subEvent[0].fechaFinal) ? ' hasta el <small>' + $filter('date')(result.subEvent[0].fechaFinal, 'dd-MM-yyyy') + '</small>': '') 
                    + (angular.isDefined(result.subEvent[0].horaInicio) ? '. <small>' + result.subEvent[0].horaInicio + '</small>': '') 
                    + (angular.isDefined(result.subEvent[0].horaFinal) ? ' - <small>' + result.subEvent[0].horaFinal + '</small>': '') 
                    + '</div>' 
                    + (angular.isDefined(result.subEvent[0].horario) ? '<div>' + result.subEvent[0].horario + '</div>': '') 
                    + result.description,
                  icon:icono
            };
          }
        } else {
          $scope.claseActo = 'glyphicon glyphicon-exclamation-sign'
        }
    }, function(reason) {
        $scope.claseActo = 'glyphicon glyphicon-remove-circle'
    });
  };

  $scope.monumentosCercanos = function(){
     $scope.claseMonumento='glyphicon glyphicon-refresh';
     Query.getApi('/recurso/turismo/monumento?rows=200&fl=id,title,address,geometry&srsname=wgs84&point=' + $scope.detalle.longitud.value + '%2C' + $scope.detalle.latitud.value + '&distance=1000').then(function(resultado) {
        var icono = {
            iconUrl: '//www.zaragoza.es/contenidos/iconos/arte.png',
             iconSize: [22, 22]
        }
        $scope.markers = {
            main_marker: {
                lat: Math.round10($scope.detalle.latitud.value, -4),
                lng: Math.round10($scope.detalle.longitud.value, -4),
                focus: true,
                message: $scope.detalle.title.value,
                draggable: false
            }
        };
        if (resultado.result && resultado.result.length > 0) {
          $scope.claseMonumento='';
          for (var i in resultado.result) {
            var result = resultado.result[i];
            $scope.markers['monu' + result.id] = {
                  lat: Math.round10(result.geometry.coordinates[1], -4),
                  lng: Math.round10(result.geometry.coordinates[0], -4),
                  message: '<strong>' + result.title + '</strong><br/>' + result.address,
                  icon:icono
            };
          }
        } else {
          $scope.claseMonumento = 'glyphicon glyphicon-exclamation-sign'
        }
    }, function(reason) {
        $scope.claseMonumento = 'glyphicon glyphicon-remove-circle'
    });
  };

  $scope.aparcabiciCercanos = function(){
    $scope.claseAparcabici='glyphicon glyphicon-refresh';
     Query.getApi('/recurso/urbanismo-infraestructuras/equipamiento/aparcamiento-bicicleta?rows=200&fl=id,title,description,geometry&srsname=wgs84&point=' + $scope.detalle.longitud.value + '%2C' + $scope.detalle.latitud.value + '&distance=1000').then(function(resultado) {
        var icono = {
            iconUrl: '//www.zaragoza.es/contenidos/iconos/aparcabicis.png',
             iconSize: [22, 22]
        }
        $scope.markers = {
            main_marker: {
                lat: Math.round10($scope.detalle.latitud.value, -4),
                lng: Math.round10($scope.detalle.longitud.value, -4),
                focus: true,
                message: $scope.detalle.title.value,
                draggable: false
            }
        };
        if (resultado.result && resultado.result.length > 0) {
          $scope.claseAparcabici='';
          for (var i in resultado.result) {
            var result = resultado.result[i];
            $scope.markers['aloj' + result.id] = {
                  lat: Math.round10(result.geometry.coordinates[1], -4),
                  lng: Math.round10(result.geometry.coordinates[0], -4),
                  message: '<strong>' + result.title + '</strong>',
                  icon:icono
            };
          }
        } else {
          $scope.claseAparcabici = 'glyphicon glyphicon-exclamation-sign'
        }
    }, function(reason) {
        $scope.claseAparcabici = 'glyphicon glyphicon-remove-circle'
    });
  };
  $scope.biziCercanos = function(){
    $scope.claseBizi='glyphicon glyphicon-refresh';
     Query.getApi('/recurso/urbanismo-infraestructuras/estacion-bicicleta?rows=200&fl=id,title,description,estado,bicisDisponibles,anclajesDisponibles,geometry&srsname=wgs84&point=' + $scope.detalle.longitud.value + '%2C' + $scope.detalle.latitud.value + '&distance=1000').then(function(resultado) {
        var icono = {
            iconUrl: '//www.zaragoza.es/contenidos/iconos/estacionesBizi2.png',
             iconSize: [22, 22]
        }
        $scope.markers = {
            main_marker: {
                lat: Math.round10($scope.detalle.latitud.value, -4),
                lng: Math.round10($scope.detalle.longitud.value, -4),
                focus: true,
                message: $scope.detalle.title.value,
                draggable: false
            }
        };
        if (resultado.result && resultado.result.length > 0) {
          $scope.claseBizi='';
          for (var i in resultado.result) {
            var result = resultado.result[i];
            $scope.markers['aloj' + result.id] = {
                  lat: Math.round10(result.geometry.coordinates[1], -4),
                  lng: Math.round10(result.geometry.coordinates[0], -4),
                  message: '<strong>' + result.title + '</strong><br/>' + result.description,
                  icon:icono
            };
          }
        } else {
          $scope.claseBizi = 'glyphicon glyphicon-exclamation-sign'
        }
    }, function(reason) {
        $scope.claseBizi = 'glyphicon glyphicon-remove-circle'
    });
  };
  $scope.alojamientosCercanos = function(){
    $scope.claseAlojamiento='glyphicon glyphicon-refresh';
     Query.getApi('/recurso/turismo/alojamiento?rows=200&fl=id,title,description,geometry&srsname=wgs84&point=' + $scope.detalle.longitud.value + '%2C' + $scope.detalle.latitud.value + '&distance=1000').then(function(resultado) {
        var icono = {
            iconUrl: '//www.zaragoza.es/contenidos/iconos/alojamiento2.png',
             iconSize: [22, 22]
        }
        $scope.markers = {
            main_marker: {
                lat: Math.round10($scope.detalle.latitud.value, -4),
                lng: Math.round10($scope.detalle.longitud.value, -4),
                focus: true,
                message: $scope.detalle.title.value,
                draggable: false
            }
        };
        if (resultado.result && resultado.result.length > 0) {
          $scope.claseAlojamiento='';
          for (var i in resultado.result) {
            var result = resultado.result[i];
            $scope.markers['aloj' + result.id] = {
                  lat: Math.round10(result.geometry.coordinates[1], -4),
                  lng: Math.round10(result.geometry.coordinates[0], -4),
                  message: '<strong>' + result.title + '</strong><br/>' + result.description,
                  icon:icono
            };
          }
        } else {
          $scope.claseAlojamiento = 'glyphicon glyphicon-exclamation-sign'
        }
    }, function(reason) {
        $scope.claseAlojamiento = 'glyphicon glyphicon-remove-circle'
    });
  };

  $scope.paradaTaxiCercanos = function(){
    $scope.claseParadaTaxi='glyphicon glyphicon-refresh';
     Query.getApi('/recurso/urbanismo-infraestructuras/equipamiento/parada-taxi?rows=200&fl=id,title,geometry&srsname=wgs84&point=' + $scope.detalle.longitud.value + '%2C' + $scope.detalle.latitud.value + '&distance=1000').then(function(resultado) {
        var icono = {
            iconUrl: '//www.zaragoza.es/contenidos/iconos/paradasdeTaxi.png',
             iconSize: [22, 22]
        }
        $scope.markers = {
            main_marker: {
                lat: Math.round10($scope.detalle.latitud.value, -4),
                lng: Math.round10($scope.detalle.longitud.value, -4),
                focus: true,
                message: $scope.detalle.title.value,
                draggable: false
            }
        };
        if (resultado.result && resultado.result.length > 0) {
          $scope.claseParadaTaxi='';
          for (var i in resultado.result) {
            var result = resultado.result[i];
            $scope.markers['aloj' + result.id] = {
                  lat: Math.round10(result.geometry.coordinates[1], -4),
                  lng: Math.round10(result.geometry.coordinates[0], -4),
                  message: '<strong>' + result.title + '</strong>',
                  icon:icono
            };
          }
        } else {
          $scope.claseParadaTaxi = 'glyphicon glyphicon-exclamation-sign'
        }
    }, function(reason) {
        $scope.claseParadaTaxi = 'glyphicon glyphicon-remove-circle'
    });
  };
  $scope.motoCercanos = function(){
    $scope.claseMoto='glyphicon glyphicon-refresh';
     Query.getApi('/recurso/urbanismo-infraestructuras/equipamiento/aparcamiento-moto?rows=200&fl=id,title,geometry&srsname=wgs84&point=' + $scope.detalle.longitud.value + '%2C' + $scope.detalle.latitud.value + '&distance=1000').then(function(resultado) {
        var icono = {
            iconUrl: '//www.zaragoza.es/contenidos/iconos/estacionamiento_motos.png',
             iconSize: [22, 22]
        }
        $scope.markers = {
            main_marker: {
                lat: Math.round10($scope.detalle.latitud.value, -4),
                lng: Math.round10($scope.detalle.longitud.value, -4),
                focus: true,
                message: $scope.detalle.title.value,
                draggable: false
            }
        };
        if (resultado.result && resultado.result.length > 0) {
          $scope.claseMoto='';
          for (var i in resultado.result) {
            var result = resultado.result[i];
            $scope.markers['aloj' + result.id] = {
                  lat: Math.round10(result.geometry.coordinates[1], -4),
                  lng: Math.round10(result.geometry.coordinates[0], -4),
                  message: '<strong>' + result.title + '</strong>',
                  icon:icono
            };
          }
        } else {
          $scope.claseMoto = 'glyphicon glyphicon-exclamation-sign'
        }
    }, function(reason) {
        $scope.claseMoto = 'glyphicon glyphicon-remove-circle'
    });
  };

  $scope.gasolineraCercanos = function(){
    $scope.claseGasolinera='glyphicon glyphicon-refresh';
     Query.getApi('/recurso/urbanismo-infraestructuras/equipamiento/estacion-servicio?rows=200&fl=id,title,geometry&srsname=wgs84&point=' + $scope.detalle.longitud.value + '%2C' + $scope.detalle.latitud.value + '&distance=1000').then(function(resultado) {
        var icono = {
            iconUrl: '//www.zaragoza.es/contenidos/iconos/estacionServicio.png',
             iconSize: [22, 22]
        }
        $scope.markers = {
            main_marker: {
                lat: Math.round10($scope.detalle.latitud.value, -4),
                lng: Math.round10($scope.detalle.longitud.value, -4),
                focus: true,
                message: $scope.detalle.title.value,
                draggable: false
            }
        };
        if (resultado.result && resultado.result.length > 0) {
          $scope.claseGasolinera='';
          for (var i in resultado.result) {
            var result = resultado.result[i];
            $scope.markers['aloj' + result.id] = {
                  lat: Math.round10(result.geometry.coordinates[1], -4),
                  lng: Math.round10(result.geometry.coordinates[0], -4),
                  message: '<strong>' + result.title + '</strong>',
                  icon:icono
            };
          }
        } else {
          $scope.claseGasolinera = 'glyphicon glyphicon-exclamation-sign'
        }
    }, function(reason) {
        $scope.claseGasolinera = 'glyphicon glyphicon-remove-circle'
    });
  };
  $scope.sanidadCercanos = function(){
    $scope.claseSanidad='glyphicon glyphicon-refresh';
     Query.getApi('/recurso/urbanismo-infraestructuras/equipamiento/recurso/?q=subtemas.id==781,subtemas.id==780&rows=200&fl=id,title,geometry&srsname=wgs84&point=' + $scope.detalle.longitud.value + '%2C' + $scope.detalle.latitud.value + '&distance=1000').then(function(resultado) {
        var icono = {
            iconUrl: '//www.zaragoza.es/contenidos/iconos/sanidadYconsumo.png',
             iconSize: [22, 22]
        }
        $scope.markers = {
            main_marker: {
                lat: Math.round10($scope.detalle.latitud.value, -4),
                lng: Math.round10($scope.detalle.longitud.value, -4),
                focus: true,
                message: $scope.detalle.title.value,
                draggable: false
            }
        };
        if (resultado.result && resultado.result.length > 0) {
          $scope.claseSanidad='';
          for (var i in resultado.result) {
            var result = resultado.result[i];
            $scope.markers['aloj' + result.id] = {
                  lat: Math.round10(result.geometry.coordinates[1], -4),
                  lng: Math.round10(result.geometry.coordinates[0], -4),
                  message: '<strong>' + result.title + '</strong>',
                  icon:icono
            };
          }
        } else {
          $scope.claseSanidad = 'glyphicon glyphicon-exclamation-sign'
        }
    }, function(reason) {
        $scope.claseSanidad = 'glyphicon glyphicon-remove-circle'
    });
  };
  $scope.aparcamientoCercanos = function(){
    $scope.claseAparcamiento='glyphicon glyphicon-refresh';
     Query.getApi('/recurso/urbanismo-infraestructuras/equipamiento/aparcamiento-publico?rows=200&fl=id,title,geometry&srsname=wgs84&point=' + $scope.detalle.longitud.value + '%2C' + $scope.detalle.latitud.value + '&distance=1000').then(function(resultado) {
        var icono = {
            iconUrl: '//www.zaragoza.es/contenidos/iconos/aparcamientos.png',
             iconSize: [22, 22]
        }
        $scope.markers = {
            main_marker: {
                lat: Math.round10($scope.detalle.latitud.value, -4),
                lng: Math.round10($scope.detalle.longitud.value, -4),
                focus: true,
                message: $scope.detalle.title.value,
                draggable: false
            }
        };
        if (resultado.result && resultado.result.length > 0) {
          $scope.claseAparcamiento='';
          for (var i in resultado.result) {
            var result = resultado.result[i];
            $scope.markers['aloj' + result.id] = {
                  lat: Math.round10(result.geometry.coordinates[1], -4),
                  lng: Math.round10(result.geometry.coordinates[0], -4),
                  message: '<strong>' + result.title + '</strong>',
                  icon:icono
            };
          }
        } else {
          $scope.claseAparcamiento = 'glyphicon glyphicon-exclamation-sign'
        }
    }, function(reason) {
        $scope.claseAparcamiento = 'glyphicon glyphicon-remove-circle'
    });
  };
  $scope.recursosCercanos = function(){
      $scope.claseRecurso='glyphicon glyphicon-refresh';
     Query.getApi('/recurso/urbanismo-infraestructuras/equipamiento/recurso?rows=200&fl=id,title,geometry&srsname=wgs84&point=' + $scope.detalle.longitud.value + '%2C' + $scope.detalle.latitud.value + '&distance=1000').then(function(resultado) {
        var icono = {
            iconUrl: '//www.zaragoza.es/contenidos/iconos/recursos.png',
             iconSize: [22, 22]
        }
        $scope.markers = {
            main_marker: {
                lat: Math.round10($scope.detalle.latitud.value, -4),
                lng: Math.round10($scope.detalle.longitud.value, -4),
                focus: true,
                message: $scope.detalle.title.value,
                draggable: false
            }
        };
        if (resultado.result && resultado.result.length > 0) {
          $scope.claseRecurso='';
          for (var i in resultado.result) {
            var result = resultado.result[i];
            $scope.markers['rec' + result.id] = {
                  lat: Math.round10(result.geometry.coordinates[1], -4),
                  lng: Math.round10(result.geometry.coordinates[0], -4),
                  message: '<strong>' + result.title + '</strong>',
                  icon:icono
            };
          }
        } else {
          $scope.claseRecurso = 'glyphicon glyphicon-exclamation-sign'
        }
    }, function(reason) {
        $scope.claseRecurso = 'glyphicon glyphicon-remove-circle'
    });
  };

  /*$scope.detalle = function() {
    var consultaDetalle;
    if ($scope.registro.uri.value) {
      var uri = $scope.registro.uri.value;
      consultaDetalle = $filter('queryDetalle')($filter('tipo')(uri),$filter('identificador')(uri));
    } else {
      var identificador = $scope.registro.id.split('-')[1];
      consultaDetalle = $filter('queryDetalle')($scope.vocab,identificador);
    }
    console.log(consultaDetalle);
    if (consultaDetalle == '') {
        Query.describe(uri).then(function(result) {
            $scope.attrs = [];
            $scope.detalle = result;
            console.log($scope.detalle);
        });
    } else {
        Query.list(consultaDetalle).then(function(result) {
            $scope.attrs = result.head.vars;
            $scope.detalle = result.results.bindings[0];
            console.log($scope.detalle);
        });
    }
  };*/
  $scope.$watch(
    'registro.anyOldValue',
    function(value) {
      if (value) {
        var consultaDetalle;
        if ($scope.registro.uri) {
          if ($scope.registro.uri.value) {
            var uri = $scope.registro.uri.value;
            consultaDetalle = $filter('queryDetalle')($filter('tipo')(uri),$filter('identificador')(uri));
          } else {
            var identificador = $scope.registro.id.split('-')[1];
            consultaDetalle = $filter('queryDetalle')($scope.vocab,identificador);
          }
          if (consultaDetalle == '') {
              Query.describe(uri).then(function(result) {
                  $scope.attrs = [];
                  $scope.detalle = result;
              });
          } else {
              Query.list(consultaDetalle).then(function(result) {
                  $scope.attrs = result.head.vars;
                  $scope.detalle = result.results.bindings[0];
              });
          }
        } else {
          $scope.detalle = $scope.registro;
        }
      }
    }
    
  );
}]);
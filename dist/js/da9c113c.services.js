'use strict';
angular.module('descubre.services', [])

.factory('Query', ['$http', '$q', function($http, $q) {
    var SPARQL_ENDPOINT = 'http://datos.zaragoza.es/sparql';
    var API_ENDPOINT = 'http://www.zaragoza.es/api';
    var SOLR_ENDPOINT = 'http://www.zaragoza.es/buscador/select?';
    return {
        list: function(query, graph) {
            var params = {};
            var deferred = $q.defer();
            if (angular.isUndefined(graph)) {
                graph = '';
            }
            console.log(graph);
            console.log(query);
            $http.get(SPARQL_ENDPOINT + '?default-graph-uri=' + encodeURIComponent(graph) + '&query=' + encodeURIComponent(query) + '&format=application%2Fsparql-results%2Bjson&timeout=0').
            success(function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function(data, status, headers, config) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        describe: function(uri, graph) {
            var params = {};
            var deferred = $q.defer();
            if (angular.isUndefined(graph)) {
                graph = '';
            }
            $http.get(SPARQL_ENDPOINT + '?default-graph-uri=' + encodeURIComponent(graph) + '&query=describe+' + encodeURIComponent('<' + uri + '>') + '&format=' + encodeURIComponent('application/x-json+ld') + '&timeout=0').
            success(function(data, status, headers, config) {
                deferred.resolve(data["@graph"][0]);
            }).
            error(function(data, status, headers, config) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        getSolr: function(query, category, facet, fq, start, rows) {
            var params = {};
            var deferred = $q.defer();
            $http({
                method: 'JSONP',
                url: SOLR_ENDPOINT,
                params: {
                    'json.wrf': 'JSON_CALLBACK',
                    'wt': 'json',
                    'start': start || 0,
                    'rows': rows || 100,
                    'facet': 'true',
                    'facet.field' : facet,
                    'facet.mincount' : 1,
                    'fl' : 'uri,title,id,texto_t,x_coordinate,y_coordinate,last_modified,temas_smultiple',
                    'q': query + ' AND -tipocontenido_s:estatico AND category:' + category,
                    'fq': fq
                }
            }).success(function(data, status, headers, config) {
                deferred.resolve(data);
            }).error(function(data, status, headers, config) {
                deferred.reject(data);
            });
            return deferred.promise;
        },
        getApi: function(uri) {
            var params = {};
            var deferred = $q.defer();
            console.log(API_ENDPOINT + uri);
            $http.get(API_ENDPOINT + uri).
            success(function(data, status, headers, config) {
                deferred.resolve(data);
            }).
            error(function(data, status, headers, config) {
                deferred.reject(data);
            });
            return deferred.promise;
        }, 
    };
}]);
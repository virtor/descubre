# Descubre la ciudad
Aplicación web que consume los datos abiertos publicados por el Ayuntamiento de Zaragoza en http://datos.zaragoza.es

## Prerrequisitos
Desarrollado con:
* nodejs v0.10.37
* npm v1.4.28
* grunt v0.1.13

## Instalación
Hacer un fork del repositorio

`$ git clone https://github.com/virtor/descubre.git`

`$ cd descubre`

Configurar proxy:

`$ npm config set proxy null`

`$ npm set https-proxy null`

Instalar las dependencias especificadas en `package.json`

`$ npm install`

Instalar webdriver para los tests de integración

`$ npm run update-webdriver`

### lanzar servidor para angularjs == npm start

`$ ./node_modules/http-server/bin/http-server -a localhost -p 8000 -c-1`


### lanzar en modo test 

`$ npm test` o `$ ./node_modules/karma/bin/karma start karma.conf.js`

### lanzar e2etests

`$ npm protractor` o `$ ./node_modules/http-server/bin/http-server -a localhost -p 8000 -c-1`

y en otro terminal ejecutar

`$ ./node_modules/protractor/bin/protractor e2e-tests/protractor.conf.js`


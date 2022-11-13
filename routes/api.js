/**ROUTE USER APIs. */
var express = require('express')

var router = express.Router()
var profesores = require('./api/profesor.route')
var alumnos = require('./api/alumno.route')
var clases = require('./api/clases.route')
var contrataciones = require('./api/contrataciones.route')

router.use('/profesores', profesores);
router.use('/alumnos', alumnos);
router.use('/clases', clases);
router.use('/contrataciones', contrataciones);


module.exports = router;

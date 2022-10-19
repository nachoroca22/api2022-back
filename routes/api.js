/**ROUTE USER APIs. */
var express = require('express')

var router = express.Router()
var profesores = require('./api/profesor.route')

router.use('/profesores', profesores);

module.exports = router;

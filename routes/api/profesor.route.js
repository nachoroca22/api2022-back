var express = require('express')
var router = express.Router()
var ProfesoresController = require('../../controllers/profesores.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET empleados listing. */
router.get('/test', function(req, res, next) {
    res.send('Llegaste a api/profesores.routes');
  });

// nuevo
router.get('/', ProfesoresController.getProfesores)
router.post('/altaprofesor', ProfesoresController.createProfesor)
    
// Export the Router
module.exports = router;
var express = require('express')
var router = express.Router()
var ClasesController = require('../../controllers/clases.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET empleados listing. */
router.get('/test', function(req, res, next) {
    res.send('Llegaste a api/clases.routes');
  });

// nuevo
router.put('/', ClasesController.getClase)
router.get('/busqueda', ClasesController.getClases)
router.post('/altaclase', ClasesController.createClase)
 
// Export the Router
module.exports = router;
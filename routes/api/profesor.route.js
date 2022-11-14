var express = require('express')
var router = express.Router()
var ProfesoresController = require('../../controllers/profesores.controller');
//var ContratacionesController = require('../../controllers/contrataciones.controller')
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET empleados listing. */
router.get('/test', function(req, res, next) {
    res.send('Llegaste a api/profesores.routes');
  });

// nuevo
router.get('/', ProfesoresController.getProfesores)
router.put('/home',Authorization, ProfesoresController.getProfesor)  
router.post('/altaprofesor', ProfesoresController.createProfesor)
router.post('/login/', ProfesoresController.loginProfesor)
router.post("/actualizarprofesor",Authorization,ProfesoresController.updateProfesor)
router.put('/resetpassword', ProfesoresController.resetPassword)  
router.put('/setpassword', ProfesoresController.setPassword)  
//router.put('/contrataciones', ContratacionesController.getContratacionesByProfesor)  



 
// Export the Router
module.exports = router;
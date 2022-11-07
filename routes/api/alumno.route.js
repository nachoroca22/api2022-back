var express = require('express')
var router = express.Router()
var AlumnosController = require('../../controllers/alumnos.controller');
//var ContratacionesController = require('../../controllers/contrataciones.controller')
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET empleados listing. */
router.get('/test', function(req, res, next) {
    res.send('Llegaste a api/alumnos.routes');
  });

// nuevo
router.put('/home',Authorization, AlumnosController.getAlumno)  
router.post('/altaalumno', AlumnosController.createAlumno)
router.post('/login/', AlumnosController.loginAlumno)
router.post("/actualizaralumno",Authorization,AlumnosController.updateAlumno)
router.put('/resetpassword', AlumnosController.resetPassword)  


//router.put('/contrataciones', ContratacionesController.getContratacionesByAlumno)  

 
// Export the Router
module.exports = router;
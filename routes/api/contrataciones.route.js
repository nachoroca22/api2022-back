var express = require('express')
var router = express.Router()
var ContratacionesController = require('../../controllers/contrataciones.controller');
var Authorization = require('../../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET empleados listing. */
router.get('/test', function(req, res, next) {
    res.send('Llegaste a api/contrataciones.routes');
  });

// nuevo

router.post('/nuevacontratacion',Authorization, ContratacionesController.createContratacion)
router.put('/contratacionalumno',Authorization, ContratacionesController.getContratacionAlumno)
router.put('/contratacionesbyalumno',Authorization, ContratacionesController.getContratacionesByAlumno)
router.put('/contratacionesbyalumnofinalizadas',Authorization, ContratacionesController.getContratacionesByAlumnoFinalizadas)
router.put('/contratacionesbyprofesorfinalizadas',Authorization, ContratacionesController.getContratacionesByProfesorFinalizadas)
router.put('/cambiarestado',Authorization, ContratacionesController.cambiarEstado)
router.put('/comentar',Authorization, ContratacionesController.comentarContratacion)
router.put('/contratacionesbyprofesor',Authorization, ContratacionesController.getContratacionesByProfesor)
router.put('/aprobarcomentario',Authorization, ContratacionesController.aprobarComentario)
router.put('/rechazarcomentario',Authorization, ContratacionesController.rechazarComentario)
router.put('/comentariospendientes',Authorization, ContratacionesController.obtenerCometariosPendientes)
router.put('/comentariosbyclase', ContratacionesController.obtenerCometariosClase)




// Export the Router
module.exports = router;
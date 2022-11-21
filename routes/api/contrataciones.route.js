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

/**
 *  @swagger
 *  components:
 *    schemas:          
 *      AltaContratacion:
 *        type: object
 *        properties:
 *          id_alumno:
 *            type: string
 *            description: id alumno
 *          id_user:
 *            type: string
 *            description: id user
 *          id_clase:
 *            type: string
 *            description: id clase
 *          costo:
 *            type: string
 *            description: Costo
 *          mensaje:
 *            type: string
 *            description: Mensaje
 *          horario:
 *            type: string
 *            description: Horario
 *          profesor:
 *            type: string
 *            description: Profesor
 *          usuario:
 *            type: string
 *            description: Usuario
 *          tipoClase:
 *            type: string
 *            description: Tipo Clase
 *          duracion:
 *            type: string
 *            description: Duracion
 *          frecuencia:
 *            type: string
 *            description: Frecuencia
 *          materia:
 *            type: string
 *            description: Materia
 *          alumno:
 *            type: string
 *            description: Alumno
 *          telefono_alumno:
 *            type: string
 *            description: Telefono alumno
 *          usuario_alumno:
 *            type: string
 *            description: Usuario alumno       
 *        
 *        example:          
 *          id_alumno: 
 *          id_user:
 *          id_clase:
 *          costo:
 *          mensaje:
 *          horario:
 *          profesor:
 *          usuario:
 *          tipoClase:
 *          duracion:
 *          frecuencia:
 *          materia:
 *          alumno:
 *          telefono_alumno:
 *          usuario_alumno:  
 * 
 *      Contratacion:
 *        type: object
 *        properties:
 *          clase_id:
 *            type: string
 *            description: clase id
 *          profesor:
 *            type: string
 *            description: profesor
 *          profesorEmail:
 *	           type: string
 *	           description: profesorEmail
 *          tipo:
 *            type: string
 *            description: tipo
 *          alumno:
 *            type: string
 *            description: alumno
 *          alumno_nombre:
 *            type: string
 *            description: alumno_nombre
 *          alumno_telefono:
 *            type: string
 *            description: alumno_telefono
 *          costo:
 *            type: string
 *            description: costo
 *          estado:
 *            type: string
 *            description: estado
 *          msjContacto:
 *            type: string
 *            description: msjContacto
 *          horaContacto:
 *            type: string
 *            description: horaContacto
 *          calificacion: 
 *            type: string
 *            description: calificacion
 *          comentarios:
 *            type: string
 *            description: comentarios
 *        
 *        example:
 *          clase_id:
 *          profesor:
 *          profesorEmail:
 *          tipo:
 *          alumno:
 *          alumno_nombre:
 *          alumno_telefono:
 *          costo:
 *          estado:
 *          msjContacto:
 *          horaContacto:
 *          calificacion:
 *          comentarios:
 * 
 *      Comentario:
 *        type: object
 *        properties:
 *          clase_id:
 *            type: string
 *            description: clase id
 *          tipo:
 *            type: string
 *            description: tipo
 *          alumno:
 *            type: string
 *            description: alumno
 *          calificacion:
 *            type: string
 *            description: calificacion
 *          comentario:
 *            type: string
 *            description: comentario
 *        example:
 *          clase_id:
 *          tipo:
 *          alumno:
 *          calificacion:
 *          comentario:
 * 
 */
/**
 *  @swagger
 *  /contrataciones/nuevacontratacion/:
 *    post:
 *      summary: Alta nuevo alumno
 *      tags: [Contrataciones] 
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/AltaContratacion'      
 *      responses:
 *        201:
 *          description: Succesfully Created Contratacion         
 *        400:
 *          description: Contratacion creation was Unsuccesfull
 */

/**
 *  @swagger
 *  /contrataciones/contratacionalumno/{id_contratacion}:
 *    put:
 *      summary: Busqueda de contrataciones por id_contratacion
 *      tags: [Contrataciones] 
 *      parameters:
 *        - in: patch
 *          id: id_contratacion
 *          schema:
 *            type: string
 *          required: true   
 *          description: id_contratacion   
 *      responses:
 *        200:
 *          description: Contrataciones encontradas
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Contratacion'
 *        202:
 *          description: Contrataciones inexistentes
 *        400:
 *          description: Error
 */

/**
 *  @swagger
 *  /contrataciones/contratacionesbyalumno/{id_alumno}:
 *    put:
 *      summary: Busqueda de contrataciones por id_alumno
 *      tags: [Contrataciones] 
 *      parameters:
 *        - in: patch
 *          id: id_alumno
 *          schema:
 *            type: string
 *          required: true   
 *          description: id_alumno   
 *      responses:
 *        200:
 *          description: Contrataciones del alumno encontadas
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Contratacion'
 *        202:
 *          description: El alumno no tiene contrataciones
 *        400:
 *          description: Error
 */

/**
 *  @swagger
 *  /contrataciones/contratacionesbyalumnofinalizadas/{id_alumno}:
 *    put:
 *      summary: Busqueda de contrataciones finalizadas por id alumno 
 *      tags: [Contrataciones] 
 *      parameters:
 *        - in: patch
 *          id: id_alumno
 *          schema:
 *            type: string
 *          required: true   
 *          description: id_alumno   
 *      responses:
 *        200:
 *          description: Contrataciones del alumno encontadas
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Contratacion'
 *        202:
 *          description: El alumno no tiene contrataciones
 *        400:
 *          description: Error
 */

/**
 *  @swagger
 *  /contrataciones/contratacionesbyprofesorfinalizadas/{id_user}:
 *    put:
 *      summary: Busqueda contrataciones finalizadas por id profesor
 *      tags: [Contrataciones] 
 *      parameters:
 *        - in: patch
 *          id: id_user
 *          schema:
 *            type: string
 *          required: true   
 *          description: id_user   
 *      responses:
 *        200:
 *          description: Contrataciones del Profesor encontadas
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Contratacion'
 *        202:
 *          description: El Profesor no tiene contrataciones
 *        400:
 *          description: Error
 */

/**
 *  @swagger
 *  /contrataciones/cambiarestado/{id_contratacion}:
 *    put:
 *      summary: Cambiar estado de contratacion por id_contratacion
 *      tags: [Contrataciones] 
 *      parameters:
 *        - in: patch
 *          id: id_contratacion
 *          schema:
 *            type: string
 *          required: true   
 *          description: id contratacion
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                estado:
 *                  type: string
 *                  description: estado
 *        
 *      responses:
 *        200:
 *          description: Contratacion actualizada
 *          
 *        202:
 *          description: Contratacion inexistentes
 *        400:
 *          description: Error
 */

/**
 *  @swagger
 *  /contrataciones/comentar/{id_contratacion}:
 *    put:
 *      summary: Comentar contratacion por id_contratacion
 *      tags: [Contrataciones] 
 *      parameters:
 *        - in: patch
 *          id: id_contratacion
 *          schema:
 *            type: string
 *          required: true   
 *          description: id contratacion
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                comentario:
 *                  type: string
 *                  description: Comentario
 *                calificacion_alumno:
 *                  type: string
 *                  description: Calificacion alumno
 *        
 *      responses:
 *        200:
 *          description: Se envío el comentario para revisión
 *          
 *        202:
 *          description: No puede comentar una clase no realizada / La clase ya fue comentada
 *        
 *        400:
 *          description: Error
 */

/**
 *  @swagger
 *  /contrataciones/contratacionesbyprofesor/{id_user}:
 *    put:
 *      summary: Buscar contrataciones por id_profesor
 *      tags: [Contrataciones] 
 *      parameters:
 *        - in: patch
 *          id: id_user
 *          schema:
 *            type: string
 *          required: true   
 *          description: id user      
 *        
 *      responses:
 *        200:
 *          description: Contrataciones del profesor encontadas
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Contratacion'
 *        202:
 *          description: El profesor no tiene contrataciones
 *        
 *        400:
 *          description: Error
 */

/**
 *  @swagger
 *  /contrataciones/aprobarcomentario/{id_contratacion}:
 *    put:
 *      summary: Aprobar un comentario de una contratacion por id_contratacion
 *      tags: [Contrataciones] 
 *      parameters:
 *        - in: patch
 *          id: id_contratacion
 *          schema:
 *            type: string
 *          required: true   
 *          description: id contratacion     
 *        
 *      responses:
 *        200:
 *          description: Comentario aprobado
 *          
 *        202:
 *          description: Contratacion inexistente
 *        
 *        400:
 *          description: Error
 */

/**
 *  @swagger
 *  /contrataciones/rechazarcomentario/{id_contratacion}:
 *    put:
 *      summary: Rechazar un comentario de una contratacion por id_contratacion
 *      tags: [Contrataciones] 
 *      parameters:
 *        - in: patch
 *          id: id_contratacion
 *          schema:
 *            type: string
 *          required: true   
 *          description: id contratacion     
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                descargo_comentario:
 *                  type: string
 *                  description: Descargo comentario              
 *   
 *      responses:
 *        200:
 *          description: Comentario desaprobado
 *          
 *        202:
 *          description: Contratacion inexistente
 *        
 *        400:
 *          description: Error
 */

/**
 *  @swagger
 *  /contrataciones/comentariospendientes/{id_user}:
 *    put:
 *      summary: Buscar comentarios pendientes por id_profesor
 *      tags: [Contrataciones] 
 *      parameters:
 *        - in: patch
 *          id: id_user
 *          schema:
 *            type: string
 *          required: true   
 *          description: id profesor                 
 *   
 *      responses:
 *        200:
 *          description: Comentarios pendientes del profesor encontados
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Comentario'
 *          
 *        202:
 *          description: El profesor no tiene comentarios pendientes
 *        
 *        400:
 *          description: Error
 */

/**
 *  @swagger
 *  /contrataciones/comentariosbyclase/{id_clase}:
 *    put:
 *      summary: Buscar comentarios por id_clase
 *      tags: [Contrataciones] 
 *      parameters:
 *        - in: patch
 *          id: id_clase
 *          schema:
 *            type: string
 *          required: true   
 *          description: id clase                 
 *   
 *      responses:
 *        200:
 *          description: Comentarios encontrados
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Comentario'
 *          
 *        202:
 *          description: Comentarios inexistentes
 *        
 *        400:
 *          description: Error
 */
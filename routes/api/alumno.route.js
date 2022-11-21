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
router.put('/setpassword', AlumnosController.setPassword)  


//router.put('/contrataciones', ContratacionesController.getContratacionesByAlumno)  

 
// Export the Router
module.exports = router;

/**
 *  @swagger
 *  components:
 *    schemas:          
 *      Alumno:
 *        type: object
 *        properties:   
 *          id_alumno:
 *            type: string
 *            description: id alumno
 *          rol:
 *            type: string
 *            description: rol
 *          estado:
 *            type: string
 *            description: estado 
 *          telefono:
 *            type: string
 *            description: Telefono                  
 *          name:
 *            type: string
 *            description: Nombre
 *          apellido:
 *            type: string
 *            description: Apellido
 *          usuario:
 *            type: string
 *            description: Nombre de usuario     
 *          fechaNac:
 *            type: string
 *            description: Fecha de nacimiento
 *          genero:
 *            type: string
 *            description: Genero
 *          nivel_primaria:
 *            type: string
 *            description: Nivel primaria          
 *          nivel_secundaria:
 *            type: string
 *            description: Nivel secundaria   
 *          nivel_terciario:
 *            type: string
 *            description: Nivel terciario 
 *          nivel_universitario:
 *            type: string
 *            description: Nivel universitario 
 *         
 *        example: 
 *          id_alumno:
 *          rol:
 *          estado:    
 *          telefono:
 *          name: 
 *          apellido:
 *          usuario:
 *          fechaNac:
 *          genero:
 *          nivel_primaria:
 *          nivel_secundaria:
 *          nivel_terciario:
 *          nivel_universitario:
 * 
 *      AltaAlumno:
 *        type: object
 *        properties: 
 *          id_alumno:
 *            type: string
 *            description: id alumno
 *          name:
 *            type: string
 *            description: Nombre
 *          apellido:
 *            type: string
 *            description: Apellido
 *          usuario:
 *            type: string
 *            description: Nombre de usuario   
 *  
 *        required:
 *          - name *
 *          - apellido *
 *          - usuario *
 *        example:          
 *          name: 
 *          apellido:
 *          usuario:
 * 
 *      ActualizacionAlumno:
 *        type: object
 *        properties:       
 *          fechaNac:
 *            type: string
 *            description: Fecha de nacimiento
 *          genero:
 *            type: string
 *            description: Genero
 *          telefono:
 *            type: string
 *            description: Telefono          
 *          nivel_primaria:
 *            type: string
 *            description: Nivel primaria          
 *          nivel_secundaria:
 *            type: string
 *            description: Nivel secundaria   
 *          nivel_terciario:
 *            type: string
 *            description: Nivel terciario 
 *          nivel_universitario:
 *            type: string
 *            description: Nivel universitario
 *       
 *        required:
 *          - fechaNac
 *          - genero
 *          - telefono
 *          - nivel_primaria
 *          - nivel_secundaria
 *          - nivel_terciario
 *          - nivel_universitario      
 * 
 *      Login:
 *        type: object
 *        properties:
 *          usuario:
 *            type: string
 *            description: Nombre de usuario
 *          password:
 *            type: string
 *            description: Password
 *        required:
 *          - usuario *
 *          - password *
 * 
 *      ResetPassword:
 *        type: object
 *        properties:
 *          usuario:
 *            type: string
 *            description: Nombre de usuario          
 *        requiered:
 *          - usuario *
 * 
 *      SetPassword:
 *        type: object
 *        properties:
 *          password:
 *            type: string
 *            description: Password de usuario          
 *        requiered:
 *          - password *
 */


/**
 *  @swagger
 *  /alumno/home/{id_alumno}:
 *    put:
 *      summary: Busqueda de alumno por id
 *      tags: [Alumnos] 
 *      parameters:
 *        - in: patch
 *          alumno: id
 *          schema:
 *            type: string
 *          required: true   
 *          description: Alumno por id  
 *      responses:
 *        200:
 *          description: Alumno encontrado
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Alumno'
 *        202:
 *          description: Alumno Inexistente
 *        400:
 *          description: Error
 */
/**
 *  @swagger
 *  /alumno/altaalumno/:
 *    post:
 *      summary: Alta nuevo alumno
 *      tags: [Alumnos] 
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/AltaAlumno'      
 *      responses:
 *        201:
 *          description: Succesfully Created Alumno          
 *        400:
 *          description: Alumno Creation was Unsuccesfull
 */
/**
 *  @swagger
 *  /alumno/actualizaralumno/{id_alumno}:
 *    post:
 *      summary: Actualizar datos alumno
 *      tags: [Alumnos]
 *      parameters:
 *        - in: patch
 *          id: id_alumno
 *          schema:
 *            type: string
 *          required: true   
 *          description: id alumno
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/ActualizacionAlumno'  
 *          
 *      responses:
 *        200:
 *          description: Succesfully Updated Alumno         
 *        202:
 *          description: Alumno Inexistente
 *        400:
 *          description: id_alumno must be present
 */

/**
 *  @swagger
 *  /alumno/login/:
 *    post:
 *      summary: Login usuario
 *      tags: [Alumnos]      
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Login'  
 *      responses:
 *        201:
 *          description: Succesfully login          
 *        400:
 *          description: Invalid username or password
 */
/**
 *  @swagger
 *  /alumno/setpassword/{id_alumno}:
 *    put:
 *      summary: Set password usuario
 *      tags: [Alumnos] 
 *      parameters:
 *        - in: patch
 *          id: id_alumno
 *          schema:
 *            type: string
 *          required: true   
 *          description: id alumno 
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/SetPassword' 
 *      responses:
 *        200:
 *          description: Set Password Alumno
 *        202:
 *          description: Alumno Inexistente
 *        400:
 *          description: User must be present
 */
/**
 *  @swagger
 *  /alumno/resetpassword/{usuario}:
 *    put:
 *      summary: Reset password usuario
 *      tags: [Alumnos] 
 *      parameters:
 *        - in: patch
 *          usuario: usuario
 *          schema:
 *            type: string
 *          required: true   
 *          description: usuario 
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/ResetPassword' 
 *      responses:
 *        200:
 *          description: Reset Password Alumno
 *        202:
 *          description: Alumno Inexistente
 *        400:
 *          description: User must be present
 */
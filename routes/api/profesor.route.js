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

/**
 *  @swagger
 *  components:
 *    schemas:   
 *      Profesor:
 *        type: object
 *        properties:   
 *          id_user:
 *            type: string
 *            description: id profesor
 *          rol:
 *            type: string
 *            description: rol
 *          estado:
 *            type: string
 *            description: estado  
 *          fechaIngreso:
 *            type: string
 *            description: fechaIngreso        
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
 *          telefono:
 *            type: string
 *            description: Telefono          
 *          estudios:
 *            type: string
 *            description: Estudios   
 *          presentacion:
 *            type: string
 *            description: Presentacion 
 *         
 *        example: 
 *          id_user:
 *          rol:
 *          estado:
 *          fechaIngreso:     
 *          name: 
 *          apellido:
 *          usuario:
 *          fechaNac:
 *          genero:
 *          telefono:
 *          estudios:
 *          presentacion:
 * 
 *      AltaProfesor:
 *        type: object
 *        properties: 
 *          id_user:
 *            type: string
 *            description: id profesor
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
 *      ActualizacionProfesor:
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
 *          estudios:
 *            type: string
 *            description: Estudios   
 *          presentacion:
 *            type: string
 *            description: Presentacion
 *       
 *        required:
 *          - fechaNac
 *          - genero
 *          - telefono
 *          - estudios
 *          - presentacion
 *        example:          
 *          fechaNac: 
 *          genero:
 *          telefono:
 *          estudios:
 *          presentacion: 
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
 *  /profesor/altaprofesor/:
 *    post:
 *      summary: Alta nuevo profesor
 *      tags: [Profesor] 
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/AltaProfesor'      
 *      responses:
 *        200:
 *          description: Succesfully Created Profesor         
 *        202:
 *          description: El correo ya se encuentra registrado.
 */
/**
 *  @swagger
 *  /profesor/actualizarprofesor/{id_profesor}:
 *    post:
 *      summary: Actualizar datos profesor por id
 *      tags: [Profesor] 
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/ActualizacionProfesor'  
 *      parameters:
 *        - in: patch
 *          id: id_profesor
 *          schema:
 *            type: string
 *          required: true   
 *          description: id_profesor   
 * 
 *      responses:
 *        200:
 *          description: Succesfully Updated Profesor       
 *        202:
 *          description: Profesor Inexistente
 */

/**
 *  @swagger
 *  /profesor/home/{id_profesor}:
 *    put:
 *      summary: Busqueda de profesor por id
 *      tags: [Profesor] 
 *      parameters:
 *        - in: patch
 *          id: id_profesor
 *          schema:
 *            type: string
 *          required: true   
 *          description: id_profesor   
 *      responses:
 *        200:
 *          description: Profesor encontrado
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Profesor'
 *        202:
 *          description: Profesor inexistente
 */

/**
 *  @swagger
 *  /profesor/profesores/:
 *    get:
 *      summary: Busqueda de profesores
 *      tags: [Profesor]
 *      responses:
 *        200:
 *          description: Succesfully Profesores Recieved
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Profesor'
 *        202:
 *          description: Unsuccesfully Profesores Recieved
 */

/**
 *  @swagger
 *  /profesor/login/:
 *    post:
 *      summary: Login usuario
 *      tags: [Profesor]      
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Login'  
 *      responses:
 *        200:
 *          description: Succesfully login          
 *        202:
 *          description: Invalid username or password
 */
/**
 *  @swagger
 *  /profesor/setpassword/{id_user}:
 *    put:
 *      summary: Set password usuario
 *      tags: [Profesor] 
 *      parameters:
 *        - in: patch
 *          id: id_user
 *          schema:
 *            type: string
 *          required: true   
 *          description: id_user 
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/SetPassword' 
 *      responses:
 *        200:
 *          description: Set Password Profesor
 *        202:
 *          description: Profesor Inexistente
 *        400:
 *          description: User must be present
 */
/**
 *  @swagger
 *  /profesor/resetpassword/{usuario}:
 *    put:
 *      summary: Reset password usuario
 *      tags: [Profesor] 
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
 *          description: Reset Password Profesor
 *        202:
 *          description: Profesor Inexistente
 *        400:
 *          description: User must be present
 */
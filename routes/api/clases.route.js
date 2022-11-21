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
router.post('/altaclase',Authorization, ClasesController.createClase)
router.put('/clasesfiltradas', ClasesController.getClasesFiltros)
router.get('/materias',ClasesController.getMateriasFiltros)
router.put("/clasesprofesor",Authorization,ClasesController.getClasesProfesor)
router.put("/actualizarclase",Authorization,ClasesController.updateClase)
router.put("/disableclase",Authorization,ClasesController.disableClase)
router.put('/clasefull', ClasesController.getClaseFull)



// Export the Router
module.exports = router;

/**
 *  @swagger
 *  components:
 *    schemas:          
 *      Clases:
 *        type: object
 *        properties:
 *          materia:
 *            type: string
 *            description: Nombre de materia *
 *          tipoClase:
 *            type: string
 *            description: Tipo de clase
 *          costo:
 *            type: string
 *            description: Costo de la clase
 *          frecuencia:
 *            type: string
 *            description: Frecuncia de la clase
 *          duracion:
 *            type: string
 *            description: Duracion de la clase
 *          descripcion:
 *            type: string
 *            description: Descripcion de la clase
 *       
 *        requiered:
 *          - materia *
 *          - tipoClase *
 *          - costo *
 *          - frecuencia *
 *          - duracion *
 *          - descripcion *
 *        example:          
 *          materia: 
 *          tipoClase:
 *          costo:
 *          frecuencia:
 *          duracion:
 *          descripcion:
 *  
 *      Clasefull:
 *        type: object
 *        properties:
 *          materia:
 *            type: string
 *            description: Nombre de materia
 *          tipoClase:
 *            type: string
 *            description: Tipo de clase
 *          frecuencia:
 *            type: string
 *            description: Frecuencia
 *          duracion:
 *            type: string
 *            description: Duracion
 *        requiered:
 *          - materia
 *          - tipoClase 
 *          - frecuencia
 *          - duracion
 */

/** 
 *  @swagger
 *  /clase/busqueda/:
 *    get:
 *      summary: Busqueda de clases
 *      tags: [Clases]      
 *      responses:
 *        200:
 *          description: Clase encontrada
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Clases'
 *        202:
 *          description: Clase inexistente
 *        400:
 *          description: Error
 */
/**
 *  @swagger
 *  /clase/altaclase/:
 *    post:
 *      summary: Alta nueva clase
 *      tags: [Clases]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Clases' 
 *      responses:
 *        200:
 *          description: Clase encontrada
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Clases'
 *        202:
 *          description: Clase creada
 *        400:
 *          description: Error
 */
/**
 *  @swagger
 *  /clase/busqueda/{id}:
 *    get:
 *      summary: Busqueda de una clase por id
 *      tags: [Clases] 
 *      parameters:
 *        - in: patch
 *          name: id
 *          schema:
 *            type: string
 *          required: true   
 *          description: Clase por id  
 *      responses:
 *        200:
 *          description: Clase encontrada
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Clases'
 *        202:
 *          description: Clase inexistente
 *        404:
 *          description: Clase no encontrada
 */
/**
 *  @swagger
 *  /clase/clasesfiltradas/{id}:
 *    put:
 *      summary: Busqueda de una clase por id
 *      tags: [Clases] 
 *      parameters:
 *        - in: patch
 *          name: id
 *          schema:
 *            type: string
 *          required: true   
 *          description: Clase por id  
 *      responses:
 *        200:
 *          description: Succesfully Updated Clase
 *        404:
 *          description: id_clase must be present
 */
/**
 *  @swagger
 *  /clase/materias/{id}:
 *    get:
 *      summary: Busqueda de una clase por id
 *      tags: [Clases] 
 *      parameters:
 *        - in: patch
 *          name: id
 *          schema:
 *            type: string
 *          required: true   
 *          description: Clase por id  
 *      responses:
 *        200:
 *          description: Clase encontrada
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/Clases'
 *        202:
 *          description: Clase inexistente
 *        404:
 *          description: Clase no encontrada
 */
/**
 *  @swagger
 *  /clase/clasesprofesor/{id}:
 *    put:
 *      summary: Busqueda de una clase por id
 *      tags: [Clases] 
 *      parameters:
 *        - in: patch
 *          name: id
 *          schema:
 *            type: string
 *          required: true   
 *          description: Clase por id  
 *      responses:
 *        200:
 *          description: Succesfully Updated Clase
 *        404:
 *          description: id_clase must be present
 */
/**
/**
 *  @swagger
 *  /clase/actualizarclase/{id}:
 *    put:
 *      summary: Busqueda de una clase por id
 *      tags: [Clases] 
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Clases' 
 *      parameters:
 *        - in: patch
 *          name: id
 *          schema:
 *            type: string
 *          required: true   
 *          description: Clase por id  
 *      responses:
 *        200:
 *          description: Succesfully Updated Clase
 *        404:
 *          description: id_clase must be present
 */
/**
 *  @swagger
 *  /clase/disableclase/{id}:
 *    put:
 *      summary: Busqueda de una clase por id
 *      tags: [Clases] 
 *      parameters:
 *        - in: patch
 *          name: id
 *          schema:
 *            type: string
 *          required: true   
 *          description: Clase por id  
 *      responses:
 *        200:
 *          description: Clase succesfully disabled
 *        404:
 *          description: id_clase must be present
 */
/**
 *  @swagger
 *  /clase/clasefull/:
 *    put:
 *      summary: Busqueda de una clase por id
 *      tags: [Clases] 
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/Clasefull' 
 *      responses:
 *        200:
 *          description: Clases succesfully received
 *        404:
 *          description: id_clase must be present
 */
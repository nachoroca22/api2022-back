var ClaseService = require('../services/clases.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getClases = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Clases = await ClaseService.getClases({}, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Clases, message: "Succesfully Clases Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createClase = async function (req, res, next) {
    // Req.Body contains the form submit values.
    //console.log("llegue al controller",req.body)
    var Clase = {
        materia: req.body.materia,
        tipoClase: req.body.tipoClase,
        costo: req.body.costo,
        frecuencia: req.body.frecuencia,
        duracion: req.body.duracion,
        descripcion: req.body.descripcion,
        id_profesor: req.body.id_profesor,
        calificacion: 0,
        contrataciones: 0,

    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdClase = await ClaseService.createClase(Clase)
        return res.status(201).json({token: createdClase, message: "Succesfully Created Clase"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Clase creation was Unsuccesfull"})
    }
}


exports.updateClase = async function (req, res, next) {
    
    // Id is necessary for the update
    if (!req.body.id_clase) {
        return res.status(400).json({status: 400., message: "id_clase must be present"})
    }
    var id_clase = req.body.id_clase;
    var Clase = {
        id_clase,
        tipoClase: req.body.tipoClase ? req.body.tipoClase : null,
        costo: req.body.costo ? req.body.costo : null,
        frecuencia: req.body.frecuencia ? req.body.frecuencia : null,
        duracion: req.body.duracion ? req.body.duracion: null,
        descripcion: req.body.duracion ? req.body.descripcion: null,
    }
    try {
        var updateClase = await ClaseService.updateClase(Clase)
        if(!updateClase){
            return res.status(200).json({status: 200, data: updateClase, message: "Clase Inexistente"})
        }
        else{
            return res.status(200).json({status: 200, data: updateClase, message: "Succesfully Updated Clase"})
        }   
        
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.disableClase = async function (req, res, next) {
    
    // Id is necessary for the update
    if (!req.body.id_clase) {
        return res.status(400).json({status: 400., message: "id_clase must be present"})
    }
    var id_clase = req.body.id_clase;
    var Clase = {
        id_clase,
    }
    try {
        var updateClase = await ClaseService.disableClase(Clase)
        if(!updateClase){
            return res.status(200).json({status: 200, data: updateClase, message: "Clase Inexistente"})
        }
        else{
            return res.status(200).json({status: 200, data: updateClase, message: "Clase succesfully disabled "})
        }   
        
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.getClase = async function (req, res, next){
    var Clase = {
        id_clase: req.body.id_clase,
    }

    try{
        var clase = await ClaseService.getClase(Clase);
        if(!clase){
            return res.status(202).json({status: 202, message: "Clase inexistente"})
        }
        return res.status(200).json({status: 200, data: clase, message: "Clase encontrada"})
        
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }

}

exports.getClasesFiltros = async function (req, res, next) {
    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    var filtros = req.body
    try {
        var Clases = await ClaseService.getClasesFiltros(filtros,page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Clases, message: "Succesfully Clases Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getMateriasFiltros = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 100;
    try {
        var Materias = await ClaseService.getMateriasFiltros({}, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Materias, message: "Succesfully Materias Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.getClasesProfesor = async function (req, res, next){
    var Clase = {
        id_profesor: req.body.id_profesor,
    }

    try{
        var clasesProfesor = await ClaseService.getClasesProfesor(Clase);
        if(!clasesProfesor){
            return res.status(202).json({status: 202, message: "El profesor no tiene clases"})
        }
        return res.status(200).json({status: 200, data: clasesProfesor, message: "Clases del profesor encontadas"})
        
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }

}
//var ContratacionesService = require('../services/contrataciones.service');
var ContratacionService = require('../services/contrataciones.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List

exports.createContratacion = async function (req, res, next) {
    // Req.Body contains the form submit values.
    //console.log("llegue al controller",req.body)
    var Contratacion = {
        id_alumno: req.body.id_alumno,
        id_user: req.body.id_user,
        id_clase: req.body.id_clase,
        costo: req.body.costo,
        mensaje:req.body.mensaje,
        horario: req.body.horario,
        profesor: req.body.profesor,
        usuario: req.body.usuario,
        tipoClase: req.body.tipoClase,
        duracion: req.body.duracion,
        frecuencia: req.body.frecuencia,
        materia: req.body.materia,
        alumno: req.body.alumno,
        telefono_alumno: req.body.telefono_alumno,
        usuario_alumno: req.body.usuario_alumno,

    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdContratacion = await ContratacionService.createContratacion(Contratacion)
        return res.status(201).json({token: createdContratacion, message: "Succesfully Created Contratacion"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Contratacion creation was Unsuccesfull"})
    }
}

exports.getContratacionesByAlumno = async function (req, res, next){
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    var Alumno = {
        id_alumno: req.body.id_alumno,
    }

    try{
        var contratacionesAlumno = await ContratacionService.contratacionesByAlumno(Alumno, page, limit)
        if(!contratacionesAlumno){
            return res.status(202).json({status: 202, message: "El alumno no tiene contrataciones"})
        }
        return res.status(200).json({status: 200, data: contratacionesAlumno, message: "Contrataciones del alumno encontadas"})
        
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.getContratacionesByAlumnoFinalizadas = async function (req, res, next){
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    var Alumno = {
        id_alumno: req.body.id_alumno,
    }

    try{
        var contratacionesAlumno = await ContratacionService.contratacionesByAlumnoFinalizadas(Alumno, page, limit)
        if(!contratacionesAlumno){
            return res.status(202).json({status: 202, message: "El alumno no tiene contrataciones"})
        }
        return res.status(200).json({status: 200, data: contratacionesAlumno, message: "Contrataciones del alumno encontadas"})
        
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.getContratacionesByProfesorFinalizadas = async function (req, res, next){
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    var Profesor = {
        id_user: req.body.id_user,
    }

    try{
        var contratacionesProfesor = await ContratacionService.contratacionesByProfesorFinalizadas(Profesor, page, limit)
        if(!contratacionesProfesor){
            return res.status(202).json({status: 202, message: "El Profesor no tiene contrataciones"})
        }
        return res.status(200).json({status: 200, data: contratacionesProfesor, message: "Contrataciones del Profesor encontadas"})
        
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.getContratacionAlumno = async function (req, res, next){
    var Contratacion = {
        id_contratacion: req.body.id_contratacion,
    }

    try{
        var getContratacionAlumno = await ContratacionService.getContratacionAlumno(Contratacion);
        if(!getContratacionAlumno){
            return res.status(202).json({status: 202, message: "Contrataciones inexistentes"})
        }
        return res.status(200).json({status: 200, data: getContratacionAlumno, message: "Contrataciones encontradas"})
        
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }

}

exports.getContratacionesByProfesor = async function (req, res, next){
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    var Profesor = {
        id_user: req.body.id_user,
    }

    try{
        var contratacionesProfesor = await ContratacionService.contratacionesByProfesor(Profesor, page, limit)
        if(!contratacionesProfesor){
            return res.status(202).json({status: 202, message: "El profesor no tiene contrataciones"})
        }
        return res.status(200).json({status: 200, data: contratacionesProfesor, message: "Contrataciones del profesor encontadas"})
        
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.cambiarEstado = async function (req, res, next){
    var Contratacion = {
        id_contratacion: req.body.id_contratacion,
        estado: req.body.estado,
    }

    try{
        var getContratacionAlumno = await ContratacionService.actualizarEstado(Contratacion);
        if(!getContratacionAlumno){
            return res.status(202).json({status: 202, message: "Contratacion inexistentes"})
        }
        return res.status(200).json({status: 200, data: getContratacionAlumno, message: "Contratacion actualizada"})
        
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }

}

exports.comentarContratacion = async function (req, res, next){
    var Contratacion = {
        id_contratacion: req.body.id_contratacion,
        comentario: req.body.comentario,
        calificacion_alumno: req.body.calificacion_alumno,
    }

    try{
        var comentarContratacion = await ContratacionService.comentarContratacion(Contratacion);
        console.log(comentarContratacion)
        if(comentarContratacion==="No puede comentar una clase no realizada"){
            return res.status(202).json({status: 202, message: "No puede comentar una clase no realizada"})
        }
        if(comentarContratacion === "La clase ya fue comentada"){
            return res.status(202).json({status: 202, message: "La clase ya fue comentada"})
        }
        return res.status(200).json({status: 200, data: comentarContratacion, message: "Se envío el comentario para revisión."})
        
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }

}
//cunado ya existe data: 

exports.aprobarComentario = async function (req, res, next){
    var Contratacion = {
        id_contratacion: req.body.id_contratacion,
    }

    try{
        var aprobarComentario = await ContratacionService.aprobarComentario(Contratacion);
        if(!aprobarComentario){
            return res.status(202).json({status: 202, message: "Contratacion inexistentes"})
        }
        return res.status(200).json({status: 200, data: aprobarComentario, message: "Comentario aprobado"})
        
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }

}

exports.rechazarComentario = async function (req, res, next){
    console.log("controllleeerr",req.body)
    var Contratacion = {
        id_contratacion: req.body.id_contratacion,
        descargo_comentario: req.body.descargo_comentario
    }

    try{
        var rechazarComentario = await ContratacionService.rechazarComentario(Contratacion);
        if(!rechazarComentario){
            return res.status(202).json({status: 202, message: "Contratacion inexistentes"})
        }
        return res.status(200).json({status: 200, data: rechazarComentario, message: "Comentario aprobado"})
        
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }

}

exports.obtenerCometariosPendientes = async function (req, res, next){
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    var Profesor = {
        id_user: req.body.id_user,
    }

    try{
        var comentariosProfesor = await ContratacionService.obtenerCometariosPendientes(Profesor, page, limit)
        if(!comentariosProfesor){
            return res.status(202).json({status: 202, message: "El profesor no tiene comentarios pendientes"})
        }
        return res.status(200).json({status: 200, data: comentariosProfesor, message: "Comentarios pendientes del profesor encontados"})
        
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }
}

exports.obtenerCometariosClase = async function (req, res, next){
    var Contratacion = {
        id_clase: req.body.id_clase,
    }

    try{
        var getComentariosClase = await ContratacionService.obtenerCometariosClase(Contratacion);
        if(!getComentariosClase){
            return res.status(202).json({status: 202, message: "Comentarios inexistentes"})
        }
        return res.status(200).json({status: 200, data: getComentariosClase, message: "Comentarios encontrados"})
        
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }

}



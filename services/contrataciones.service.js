// Gettign the Newly created Mongoose Model we just created 
var Contratacion = require('../models/contrataciones.model');
var Clase = require('../models/clases.model');

const mail = require("./mail.service")

// Saving the context of this module inside the _the variable
_this = this 

// Async function to get the Empleados List

exports.createContratacion = async function (contratacion) {
    // Creating a new Mongoose Object by using the new keyword
    var newContratacion = new Contratacion({
        
        id_alumno: contratacion.id_alumno,
        id_user: contratacion.id_user,
        id_clase: contratacion.id_clase,
        costo: contratacion.costo,
        mensaje: contratacion.mensaje,
        horario: contratacion.horario,
        profesor: contratacion.profesor,
        usuario: contratacion.usuario,
        tipoClase: contratacion.tipoClase,
        duracion: contratacion.duracion,
        frecuencia: contratacion.frecuencia,
        materia: contratacion.materia,
        alumno: contratacion.alumno,
        telefono_alumno: contratacion.telefono_alumno,
        usuario_alumno: contratacion.usuario_alumno,
        calificacion_alumno: 0,
        estado: 10,
        comentario: "",
        estado_comentario: "No aplica",
        descargo_comentario: "",

    })

    try {
        // Saving the Empleado 
        var savedContratacion = await newContratacion.save();
        return ("Succesfully contratacion created");
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating Clase")
    }
}

exports.contratacionesByAlumno = async  function (alumno){
    try {
        if(!alumno.id_alumno){
            return ("No hay Id de Alumno")
        }
        else{ 
            var searchContrataciones = await Contratacion.paginate({
                id_alumno: alumno.id_alumno,
                $or:[{estado:10},{estado:20}]            
            })
            if(searchContrataciones){
                return searchContrataciones
            }else{
                return "No hay contrataciones";
            }
        }
            
    } catch (e) {
            throw Error("Error occured while Finding Contrataciones")
        }  
}

exports.contratacionesByAlumnoFinalizadas = async  function (alumno){
    try {
        if(!alumno.id_alumno){
            return ("No hay Id de Alumno")
        }
        else{ 
            var searchContrataciones = await Contratacion.paginate({
                id_alumno: alumno.id_alumno,
                $or:[{estado:30},{estado:40}] 

            })
            if(searchContrataciones){
                return searchContrataciones
            }else{
                return "No hay contrataciones";
            }
        }
            
    } catch (e) {
            throw Error("Error occured while Finding Contrataciones")
        }  
}

exports.contratacionesByProfesorFinalizadas = async  function (profesor){
    try {
        if(!profesor.id_user){
            return ("No hay Id de Profesor")
        }
        else{ 
            var searchContrataciones = await Contratacion.paginate({
                id_user: profesor.id_user,
                $or:[{estado:30},{estado:40}]   

            })
            if(searchContrataciones){
                return searchContrataciones
            }else{
                return "No hay contrataciones";
            }
        }
            
    } catch (e) {
            throw Error("Error occured while Finding Contrataciones")
        }  
}

exports.getContratacionAlumno = async function (query, page, limit) {
    // Options setup for the mongoose paginate
    console.log("queeeryyyyy",query.id_contratacion)
    let id_contratacion = parseInt(query.id_contratacion)
    var options = {
        page,
        limit
    }
    
    try {
        
        var ClasesFiltros = await Contratacion.aggregate([
            {$match:{id_contratacion: id_contratacion}},
            {$lookup: {
                from: 'clases',
                localField: 'id_clase',
                foreignField: 'id_clase',
                as: 'clases',
            }},
            {$lookup: {
                from: 'alumnos',
                localField: 'id_alumno',
                foreignField: 'id_alumno',
                as: 'alumnos',
            }},
            {$lookup: {
                from: 'profesors',
                localField: 'id_user',
                foreignField: 'id_user',
                as: 'profesors',
            }},

            {$replaceRoot:{newRoot:{$mergeObjects:[{$arrayElemAt:['$profesors',0]},"$$ROOT"]}}},
            {$replaceRoot:{newRoot:{$mergeObjects:[{$arrayElemAt:['$clases',0]},"$$ROOT"]}}},
            {$replaceRoot:{newRoot:{$mergeObjects:[{$arrayElemAt:['$alumnos',0]},"$$ROOT"]}}},
            //{$match:{estado:true, id_clase:id_clase}},
            
            {$project:{
                id_contratacion:1,
                id_alumno:1,
                apellido_alumno:1,
                name_alumno:1,
                telefono_alumno:1,
                usuario_alumno:1,
                calificacion_alumno:1,
                comentario:1,
                estado_comentario:1,
                mensaje:1,
                horario:1,
                estado:1,
                costo:1,
                id_clase:1,
                materia:1,
                tipoClase:1,
                frecuencia:1,
                duracion:1,
                id_user:1,
                name:1,
                apellido:1,
                usuario:1,               
                }  
            }, 
            // para paginar en mongo
            {$setWindowFields: {output: {totalCount: {$count: {}}}}},
            {$skip: 0 },
            {$limit: 10 } 
        ])
        
        let ClaseFiltros = ClasesFiltros[0]
        return ClaseFiltros;

    }catch (e) {
        throw Error("Error trayendo las clases");
  }
}

exports.actualizarEstado = async function (contratacion) {
    // Creating a new Mongoose Object by using the new keyword
    var estado = contratacion.estado
    try {
        var searchContratacion = await Contratacion.findOne({
            id_contratacion: contratacion.id_contratacion
        })
    } catch (e) {
        throw Error("Error occured while Finding the Contratacion")
    }
    if(searchContratacion){
        searchContratacion.estado = estado     
        try {
            var savedContratacion = await searchContratacion.save()
            return savedContratacion;
        } catch (e) {
            throw Error("And Error occured while updating the Contratacion");
        }
    }else{
        return false
    }
}

exports.comentarContratacion = async function (contratacion) {
    // Creating a new Mongoose Object by using the new keyword
    console.log("connntra",contratacion)
    try {
        var searchContratacion = await Contratacion.findOne({
            id_contratacion: contratacion.id_contratacion
        })
    } catch (e) {
        throw Error("Error occured while Finding the Contratacion")
    }
    console.log(searchContratacion)
    if(searchContratacion){
        if(searchContratacion.estado === 20 || searchContratacion.estado==30){
            if(searchContratacion.estado_comentario === "No aplica"){
                searchContratacion.comentario = contratacion.comentario
                searchContratacion.calificacion_alumno = parseInt(contratacion.calificacion_alumno)
                searchContratacion.estado_comentario = "Recibido"
                try {
                    var savedContratacion = await searchContratacion.save()
                    return savedContratacion;
                } catch (e) {
                    throw Error("And Error occured while updating the Contratacion");
                }
            }else{
                return "La clase ya fue comentada"}
        }else{
            return "No puede comentar una clase no realizada" 
        }
    }else{
        return false
    }
}

exports.aprobarComentario = async function (contratacion) {
    // Creating a new Mongoose Object by using the new keyword
    try {
        var searchContratacion = await Contratacion.findOne({
            id_contratacion: contratacion.id_contratacion
        })
    } catch (e) {
        throw Error("Error occured while Finding the Contratacion")
    }

    if(searchContratacion){
        if(searchContratacion.estado_comentario === "Recibido"){
            searchContratacion.estado_comentario = "Aprobado"
            try {
                var savedContratacion = await searchContratacion.save()
                var searchClase = await Clase.findOne({
                    id_clase: searchContratacion.id_clase
                })
                searchClase.calificaciones = searchClase.calificaciones + searchContratacion.calificacion_alumno
                searchClase.contrataciones = searchClase.contrataciones + 1
                searchClase.calificacion= ~~(searchClase.calificaciones/searchClase.contrataciones)

                var savedClase = await searchClase.save()
                return savedContratacion;

            } catch (e) {
                throw Error("And Error occured while updating the Contratacion");
            }
        }else{
            return "El comentario ya fue aprobado" 
        }
    }else{
        return false
    }
}

exports.rechazarComentario = async function (contratacion) {
    console.log("serrrviceee",contratacion.id_contratacion)

    // Creating a new Mongoose Object by using the new keyword
    try {
        var searchContratacion = await Contratacion.findOne({
            id_contratacion: contratacion.id_contratacion
        })
    } catch (e) {
        throw Error("Error occured while Finding the Contratacion")
    }
    
    if(searchContratacion){
        if(searchContratacion.estado_comentario === "Recibido"){
            searchContratacion.estado_comentario = "Rechazado"
            searchContratacion.descargo_comentario = contratacion.descargo_comentario
            try { 
                var mailOptions = {
                    from: 'tu-profe-uade@outook.com',
                    to: searchContratacion.usuario_alumno,
                    subject: 'TuProfe - Comentario rechazado',
                    text: 'Hola ' + searchContratacion.alumno + " te comunicamos que el profesor " + searchContratacion.profesor + " rechazo tu comentario por el siguiente motivo: \n" + contratacion.descargo_comentario 
                };
                 mail.sendEmail(mailOptions);
                 
            } catch (e) {
                throw Error("And Error occured while sending the email");
            }
            try{
                var savedContratacion = await searchContratacion.save()
                return savedContratacion;
            }catch (e) {
                throw Error("And Error occured while updating the comentario");
            }
        }else{
            return "El comentario ya fue aprobado" 
        }
    }else{
        return false
    }
}

exports.contratacionesByProfesor = async  function (profesor){
    try {
        if(!profesor.id_user){
            return ("No hay Id de Profesor")
        }
        else{ 
            var searchContrataciones = await Contratacion.paginate({
                id_user: profesor.id_user,
                $or:[{estado:10},{estado:20}]   
            })
            if(searchContrataciones){
                return searchContrataciones
            }else{
                return "No hay contrataciones";
            }
        }
            
    } catch (e) {
            throw Error("Error occured while Finding Contrataciones")
        }  
}

exports.obtenerCometariosPendientes = async  function (profesor){
    try {
        if(!profesor.id_user){
            return ("No hay Id de Profesor")
        }
        else{ 
            var searchContrataciones = await Contratacion.paginate({
                id_user: profesor.id_user,
                estado_comentario: "Recibido"
            })
            if(searchContrataciones){
                return searchContrataciones
            }else{
                return "No hay comentarios pendientes";
            }
        }
            
    } catch (e) {
            throw Error("Error occured while Finding Contrataciones")
        }  
}

exports.obtenerCometariosClase = async function (contratacion) {
    // Options setup for the mongoose paginate
    let id_clase = parseInt(contratacion.id_clase)
    let paginado = contratacion.paginado
    try {
        var comentariosClase = await Contratacion.aggregate([
            {$match:{id_clase: id_clase, estado_comentario: "Aprobado"}},

            
            {$project:{
                id_clase:1,
                alumno:1,
                comentario:1,
                calificacion_alumno:1,
                }
            },
            // para paginar en mongo
            {$setWindowFields: {output: {totalCount: {$count: {}}}}},
            {$skip: paginado },
            {$limit: 10 } 
        ])
        
        return comentariosClase;

    }catch (e) {
        throw Error("Error trayendo las clases");
  }

}



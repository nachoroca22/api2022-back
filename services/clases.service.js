// Gettign the Newly created Mongoose Model we just created 
var Clase = require('../models/clases.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { getMaxListeners } = require('../models/profesores.model');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the Empleados List

exports.getClases = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        var Clases = await Clase.paginate(query, options)
        // Return the Empleados list that was retured by the mongoose promise
        return Clases;

    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating Profesores');
    }
}

exports.createClase = async function (clase) {
    // Creating a new Mongoose Object by using the new keyword
    var newClase = new Clase({
        materia: clase.materia,
        tipoClase: clase.tipoClase,
        costo: clase.costo,
        frecuencia: clase.frecuencia,
        duracion: clase.duracion,
        descripcion: clase.descripcion,
        id_profesor: clase.id_profesor,
        calificacion: 0,
        contrataciones: 0,
    })

    try {
        // Saving the Empleado 
        var savedClase = await newClase.save();
        return ("Succesfully clase created");
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating Clase")
    }
}

exports.updateClase = async function (clase) {

    try {
        //Find the old User Object by the Id
        var oldClase = await Clase.findOne({
            id_clase: clase.id_clase
        })
    } catch (e) {
        throw Error("Error occured while Finding the Clase")
    }
    // If no old Alumno Object exists return false
    if (!oldClase) {
        return false;
    }
    //Edit the Alumno Object
        oldClase.tipoClase = clase.tipoClase
        oldClase.costo = clase.costo
        oldClase.frecuencia = clase.frecuencia
        oldClase.duracion = clase.duracion
        oldClase.descripcion = clase.descripcion
    
    try {
        var savedClase = await oldClase.save()
        return savedClase;
    } catch (e) {
        throw Error("And Error occured while updating the Clase");
    }
}

exports.disableClase = async function (clase) {

    try {
        //Find the old User Object by the Id
        var oldClase = await Clase.findOne({
            id_clase: clase.id_clase
        })
    } catch (e) {
        throw Error("Error occured while Finding the Clase")
    }
    // If no old Alumno Object exists return false
    if (!oldClase) {
        return false;
    }
    //Edit the Alumno Object
        oldClase.estado = false

    try {
        var savedClase = await oldClase.save()
        return savedClase;
    } catch (e) {
        throw Error("And Error occured while diable the Clase");
    }
}

exports.getClase = async  function (clase){
    try {
        var searchClase = await Clase.findOne({
            id_clase: clase.id_clase
        })
        if(!searchClase){
        }
        else{
            return searchClase;
        }
        
    } catch (e) {
            throw Error("Error occured while Finding the clase")
        }  
}

exports.getClasesFiltros = async function (query, page, limit) {
    // Options setup for the mongoose paginate
    console.log(query.materia)
    var options = {
        page,
        limit
    }
    
    try {
        var ClasesFiltros = await Clase.aggregate([
            {$lookup: {
                from: 'profesors',
                localField: 'id_profesor',
                foreignField: 'id_user',
                as: 'clases',
            }},
            // solo clases activas
            {$replaceRoot:{newRoot:{$mergeObjects:[{$arrayElemAt:['$clases',0]},"$$ROOT"]}}},
            {$match:{estado:true}},
            {$project:{
                materia:1,
                tipoClase:1,
                costo:1,
                frecuencia:1,
                calificacion:1,
                duracion:1,
                descripcion:1,
                id_clase:1,
                id_user:1,
                name: 1,
                apellido: 1,
                }
            },
            // para paginar en mongo
            {$setWindowFields: {output: {totalCount: {$count: {}}}}},
            {$skip: 0 },
            {$limit: 15 } 
        ])
        return ClasesFiltros;

    }catch (e) {
        throw Error("Error trayendo las clases");
  }
}

exports.getMateriasFiltros = async function (query, page, limit) {
    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    try {
        var MateriasFiltros = await Clase.find({estado: true}).distinct('materia').sort()
        MateriasFiltros.push("Todas")
        return MateriasFiltros;

    }catch (e) {
        throw Error("Error trayendo las clases");
  }
}

exports.getClasesProfesor = async  function (profesor){
    try {
        var searchClase = await Clase.paginate({
            id_profesor: profesor.id_profesor,
            estado: true
        })
        if(!searchClase){
        }
        else{
            return searchClase;
        }
        
    } catch (e) {
            throw Error("Error occured while Finding the clase")
        }  
}
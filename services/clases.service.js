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
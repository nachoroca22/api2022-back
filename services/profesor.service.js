// Gettign the Newly created Mongoose Model we just created 
var Profesor = require('../models/profesores.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { getMaxListeners } = require('../models/profesores.model');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the Empleados List

exports.getProfesores = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    // Try Catch the awaited promise to handle the error 
    try {
        var Profesores = await Profesor.paginate(query, options)
        // Return the Empleados list that was retured by the mongoose promise
        return Profesores;

    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while Paginating Profesores');
    }
}

exports.createProfesor = async function (profesor) {
    // Creating a new Mongoose Object by using the new keyword
    var hashedPassword = bcrypt.hashSync(profesor.password, 8);
    var newProfesor = new Profesor({
        name: profesor.name,
        apellido: profesor.apellido,
        fechaNac: profesor.fechaNac,
        rol: profesor.rol,
        genero: profesor.genero,
        usuario: profesor.usuario,
        password: hashedPassword,
        estudios: profesor.estudios,
        presentacion: profesor.presentacion,
        estado: profesor.estado,
        fechaIngreso : profesor.fechaIngreso,
    })

    try {
        // Saving the Empleado 
        var savedProfesor = await newProfesor.save();
        var token = jwt.sign({
            id: savedProfesor._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating Profesor")
    }
}

exports.updateProfesor= async function (profesor) {

    try {
        //Find the old User Object by the Id
        var oldProfesor = await Profesor.findOne({
            id_user: profesor.id_user
        })
    } catch (e) {
        throw Error("Error occured while Finding the Profesor")
    }
    // If no old Alumno Object exists return false
    if (!oldProfesor) {
        return false;
    }
    //Edit the Alumno Object
        oldProfesor.fechaNac = profesor.fechaNac
        oldProfesor.genero = profesor.genero
        oldProfesor.estudios = profesor.estudios
        oldProfesor.presentacion = profesor.presentacion
    
    try {
        var savedProfesor = await oldProfesor.save()
        return savedProfesor;
    } catch (e) {
        throw Error("And Error occured while updating the Profesor");
    }
}

exports.loginProfesor = async function (profesor) {

    // Creating a new Mongoose Object by using the new keyword
    
    try {
        console.log("hola",profesor)
        // Find the Empleado 
        var _details = await Profesor.findOne({
            usuario: profesor.usuario
        });
        var passwordIsValid = bcrypt.compareSync(profesor.password, _details.password);
        if (!passwordIsValid) throw Error("Invalid username/password")

        var token = jwt.sign({
            id: _details._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        rol=_details.rol
        id_user=_details.id_user
       return [token,rol,id_user];
    } catch (e) {
        // return a Error message describing the reason     
        throw Error("Error while Login Profesor")
    }
}

exports.getProfesor = async  function (profesor){
    try {
        console.log("hola",profesor)
        var searchProfesor = await Profesor.findOne({
            id_user: profesor.id_user
        })
        if(!searchProfesor){
        }
        else{
            return searchProfesor;
        }
        
    } catch (e) {
            throw Error("Error occured while Finding the Profesor")
        }  
}

exports.getContratacionesByProfesor = async  function (contratacion){
    try {
        var searchContrataciones = await Profesor.findOne({
            id_user: contratacion.id_user
        })
        if(!searchContrataciones){
        }
        else{
            return searchContrataciones;
        }
        
    } catch (e) {
            throw Error("Error occured while Finding the Contrataciones")
        }  
}
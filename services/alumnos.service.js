// Gettign the Newly created Mongoose Model we just created 
var Alumno = require('../models/alumnos.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { getMaxListeners } = require('../models/alumnos.model');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the Empleados List

exports.createAlumno = async function (alumno) {
    // Creating a new Mongoose Object by using the new keyword
    var hashedPassword = bcrypt.hashSync(alumno.password, 8);
    var newAlumno = new Alumno({
        name: alumno.name,
        apellido: alumno.apellido,
        fechaNac: alumno.fechaNac,
        rol: "Alumno",
        estado: true,
        genero: alumno.genero,
        usuario: alumno.usuario,
        password: hashedPassword,
        nivel_primaria: alumno.nivel_primaria,
        nivel_secundaria: alumno.nivel_secundaria,
        nivel_terciario: alumno.nivel_terciario,
        nivel_universitario : alumno.nivel_universitario,
    })

    try {
        // Saving the Empleado 
        var savedAlumno = await newAlumno.save();
        var token = jwt.sign({
            id: savedAlumno._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating Alumno")
    }
}

exports.loginAlumno = async function (alumno) {

    // Creating a new Mongoose Object by using the new keyword
    
    try {
        console.log("hola",alumno)
        // Find the alumno 
        var _details = await Alumno.findOne({
            usuario: alumno.usuario
        });
        var passwordIsValid = bcrypt.compareSync(alumno.password, _details.password);
        if (!passwordIsValid) throw Error("Invalid username/password")

        var token = jwt.sign({
            id: _details._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        rol=_details.rol
        id_alumno=_details.id_alumno
       return [token,rol,id_alumno];
    } catch (e) {
        // return a Error message describing the reason     
        throw Error("Error while Login Alumno")
    }
}

exports.getAlumno= async  function (alumno){
    try {
        console.log("hola",alumno)
        var searchAlumno = await Alumno.findOne({
            id_alumno: alumno.id_alumno
        })
        if(!searchAlumno){
        }
        else{
            return searchAlumno;
        }
        
    } catch (e) {
            throw Error("Error occured while Finding the Alumno")
        }  
}

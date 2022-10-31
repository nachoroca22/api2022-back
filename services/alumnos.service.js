// Gettign the Newly created Mongoose Model we just created 
var Alumno = require('../models/alumnos.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { getMaxListeners } = require('../models/alumnos.model');
const mail = require("./mail.service")
// Saving the context of this module inside the _the variable
_this = this

// Async function to get the Empleados List

exports.createAlumno = async function (alumno) {
    // Creating a new Mongoose Object by using the new keyword

    var password = Math.random().toString(36).slice(2, 12)

    var hashedPassword = bcrypt.hashSync(password, 8);

    var newAlumno = new Alumno({
        name: alumno.name,
        apellido: alumno.apellido,
        fechaNac: "DD/MM/AAAA",
        rol: "Alumno",
        estado: true,
        genero: "30",
        usuario: alumno.usuario,
        password: hashedPassword,
        nivel_primaria: "30",
        nivel_secundaria: "30",
        nivel_terciario: "30",
        nivel_universitario : "30",
    })

    try {
        // Saving the Empleado 
        var savedAlumno = await newAlumno.save();
        var token = jwt.sign({
            id: savedAlumno._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });

        var mailOptions = {
            from: 'tu-profe-uade@outook.com',
            to: alumno.usuario,
            subject: 'TuProfe - Registo de Alumno',
            text: 'Bienvenido ' + alumno.name + " ya podes acceder a nuestro portal y contratar a los mejores profesores!!!! \nUser: " + alumno.usuario + "\nPassword: " + password
        };
        mail.sendEmail(mailOptions);


        return token;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating Alumno")
    }
}

exports.updateAlumno= async function (alumno) {

    try {
        //Find the old User Object by the Id
        var oldAlumno = await Alumno.findOne({
            id_alumno: alumno.id_alumno
        })
    } catch (e) {
        throw Error("Error occured while Finding the Alumno")
    }
    // If no old Alumno Object exists return false
    if (!oldAlumno) {
        return false;
    }
    //Edit the Alumno Object
        oldAlumno.fechaNac = alumno.fechaNac
        oldAlumno.genero = alumno.genero
        oldAlumno.nivel_primaria = alumno.nivel_primaria
        oldAlumno.nivel_secundaria = alumno.nivel_secundaria
        oldAlumno.nivel_terciario = alumno.nivel_terciario
        oldAlumno.nivel_universitario = alumno.nivel_universitario

    
    try {
        var savedAlumno = await oldAlumno.save()
        return savedAlumno;
    } catch (e) {
        throw Error("And Error occured while updating the Alumno");
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

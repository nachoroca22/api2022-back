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
    try {
        var searchAlumno = await Alumno.findOne({
            usuario_alumno: alumno.usuario_alumno
        })
        if(!searchAlumno){
            var password = Math.random().toString(36).slice(2, 12)
            var hashedPassword = bcrypt.hashSync(password, 8);
            var newAlumno = new Alumno({
                name_alumno: alumno.name_alumno,
                apellido_alumno: alumno.apellido_alumno,
                fechaNac_alumno: "DD/MM/AAAA",
                telefono_alumno: null,
                rol: "Alumno",
                estado_alumno: true,
                genero_alumno: "30",
                usuario_alumno: alumno.usuario_alumno,
                password: hashedPassword,
                nivel_primaria: "30",
                nivel_secundaria: "30",
                nivel_terciario: "30",
                nivel_universitario : "30",
            })
            try{
                var savedAlumno = await newAlumno.save();
                var token = jwt.sign({
                    id: savedAlumno._id
                }, process.env.SECRET, {
                    expiresIn: 86400 // expires in 24 hours
                });
                var mailOptions = {
                    from: 'tu-profe-uade@outook.com',
                    to: alumno.usuario_alumno,
                    subject: 'TuProfe - Registo de Alumno',
                    text: 'Bienvenido ' + alumno.name_alumno + " ya podes acceder a nuestro portal y contratar a los mejores profesores!!!! \nUser: " + alumno.usuario_alumno + "\nPassword: " + password
                };
                mail.sendEmail(mailOptions);
                return token;
            }catch (e) {
                // return a Error message describing the reason 
                console.log(e)    
                throw Error("Error while Creating Alumno")
            }
        }
    } catch (e) {
        throw Error("Error occured while Finding the Profesor")
    }
} 

exports.resetPassword = async function (alumno) {
    // Creating a new Mongoose Object by using the new keyword
    try {
        var searchAlumno = await Alumno.findOne({
            usuario_alumno: alumno.usuario_alumno
        })
    } catch (e) {
        throw Error("Error occured while Finding the Alumno")
    }
    if(searchAlumno){
        var password = Math.random().toString(36).slice(2, 12)
        var hashedPassword = bcrypt.hashSync(password, 8)
        searchAlumno.password = hashedPassword
            
        try {
            var savedAlumno = await searchAlumno.save()
            var mailOptions = {
                from: 'tu-profe-uade@outook.com',
                to: alumno.usuario_alumno,
                subject: 'TuProfe - Reset de password de Alumno',
                text: 'Hola ' + searchAlumno.name_alumno + " te enviamos tu nueva password de acceso: " + "\nPassword: " + password
            };
             mail.sendEmail(mailOptions);
            return savedAlumno;
        } catch (e) {
            throw Error("And Error occured while updating the Alumno");
        }
    }else{
        return false
    }
}

exports.setPassword = async function (alumno) {
    console.log(alumno)
    // Creating a new Mongoose Object by using the new keyword
    try {
        var searchAlumno = await Alumno.findOne({
            id_alumno: alumno.id_alumno
        })
    } catch (e) {
        throw Error("Error occured while Finding the Alumno")
    }
    if(searchAlumno){
        var password = alumno.password
        var hashedPassword = bcrypt.hashSync(password, 8)
        searchAlumno.password = hashedPassword
            
        try {
            var savedAlumno = await searchAlumno.save()
            return savedAlumno;
        } catch (e) {
            throw Error("And Error occured while updating the Alumno");
        }
    }else{
        return false
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
        oldAlumno.fechaNac_alumno = alumno.fechaNac_alumno
        oldAlumno.genero_alumno = alumno.genero_alumno
        oldAlumno.telefono_alumno = alumno.telefono_alumno
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
        // Find the alumno 
        var _details = await Alumno.findOne({
            usuario_alumno: alumno.usuario_alumno
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

// Gettign the Newly created Mongoose Model we just created 
var Profesor = require('../models/profesores.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { getMaxListeners } = require('../models/profesores.model');
const mail = require("./mail.service")

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
    try {
        var searchProfesor = await Profesor.findOne({
            usuario: profesor.usuario
        })
        if(!searchProfesor){
            var password = Math.random().toString(36).slice(2, 12)
            var hashedPassword = bcrypt.hashSync(password, 8);
            var newProfesor = new Profesor({
                nombreImagen:"https://res.cloudinary.com/tuprofe-uade/image/upload/v1669237787/default_image_aqjwnm.png",
                name: profesor.name,
                apellido: profesor.apellido,
                fechaNac: "DD/MM/AAAA",
                rol: "Profesor",
                estado: true,
                genero: "30",
                usuario: profesor.usuario,
                telefono: profesor.telefono,
                password: hashedPassword,
                estudios: "",
                presentacion: "",
             }) 
             try {
                // Saving the Empleado 
                var savedProfesor = await newProfesor.save();
                var token = jwt.sign({
                    id: savedProfesor._id
                }, process.env.SECRET, {
                    expiresIn: 86400 // expires in 24 hours
                });
                var mailOptions = {
                    from: 'tu.profe.uade@gmail.com',
                    to: profesor.usuario,
                    subject: 'TuProfe - Registo de Profesor',
                    text: 'Bienvenido ' + profesor.name + " ya podes acceder a nuestro portal y publicar tus clases!!! \nUser: " + profesor.usuario + "\nPassword: " + password
                };
                mail.sendEmail(mailOptions);
                return token;
            } catch (e) {
                // return a Error message describing the reason 
                console.log(e)    
                throw Error("Error while Creating Profesor")
            }

        } /* else{
            return ("El correo ya se encuentra registrado.")
        }  */         
    } catch (e) {
            throw Error("Error occured while Finding the Profesor")
    } 

}

exports.resetPassword = async function (profesor) {
    // Creating a new Mongoose Object by using the new keyword
    try {
        var searchProfesor = await Profesor.findOne({
            usuario: profesor.usuario
        })
    } catch (e) {
        throw Error("Error occured while Finding the Profesor")
    }
    if(searchProfesor){
        var password = Math.random().toString(36).slice(2, 12)
        var hashedPassword = bcrypt.hashSync(password, 8)
        searchProfesor.password = hashedPassword
            
        try {
            var savedProfesor = await searchProfesor.save()
            var mailOptions = {
                from: 'tu.profe.uade@gmail.com',
                to: profesor.usuario,
                subject: 'TuProfe - Reset de password de Profesor',
                text: 'Hola ' + searchProfesor.name + " te enviamos tu nueva password de acceso: " + "\nPassword: " + password
            };
             mail.sendEmail(mailOptions);
            return savedProfesor;
        } catch (e) {
            throw Error("And Error occured while updating the Profesor");
        }
    }else{
        return false
    }
}

exports.setPassword = async function (profesor) {
    // Creating a new Mongoose Object by using the new keyword
    try {
        var searchProfesor = await Profesor.findOne({
            id_user: profesor.id_user
        })
    } catch (e) {
        throw Error("Error occured while Finding the Profesor")
    }
    if(searchProfesor){
        var password = profesor.password
        var hashedPassword = bcrypt.hashSync(password, 8)
        searchProfesor.password = hashedPassword
            
        try {
            var savedProfesor = await searchProfesor.save()
            return savedProfesor;
        } catch (e) {
            throw Error("And Error occured while updating the Profesor");
        }
    }else{
        return false
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
    // If no old profesor Object exists return false
    if (!oldProfesor) {
        return false;
    }
    //Edit the profesor Object
        oldProfesor.fechaNac = profesor.fechaNac
        oldProfesor.genero = profesor.genero
        oldProfesor.estudios = profesor.estudios
        oldProfesor.telefono = profesor.telefono
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

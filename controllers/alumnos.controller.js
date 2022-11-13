var AlumnoService = require('../services/alumnos.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List

exports.createAlumno = async function (req, res, next) {
    // Req.Body contains the form submit values.
    //console.log("llegue al controller",req.body)
    var Alumno = {
        name_alumno: req.body.name_alumno,
        apellido_alumno: req.body.apellido_alumno,
        usuario_alumno: req.body.usuario_alumno,
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdAlumno = await AlumnoService.createAlumno(Alumno)
        return res.status(201).json({token: createdAlumno, message: "Succesfully Created Alumno"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Alumno Creation was Unsuccesfull"})
    }
}

exports.resetPassword = async function (req, res, next) {
    console.log(req.body)
    if (!req.body.usuario_alumno) {
        return res.status(400).json({status: 400., message: "usuario must be present"})
    }
    var usuario_alumno = req.body.usuario_alumno;
    var Alumno = {
        usuario_alumno
    }

    try {
        var resetePassword = await AlumnoService.resetPassword(Alumno)
        if(!resetePassword){
            return res.status(200).json({status: 200, data: resetePassword, message: "Alumno Inexistente"})
        }
        else{
            return res.status(200).json({status: 200, data: resetePassword, message: "Reset Password Alumno"})
        }   
        
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.updateAlumno = async function (req, res, next) {
    
    // Id is necessary for the update
    if (!req.body.id_alumno) {
        return res.status(400).json({status: 400., message: "id_alumno must be present"})
    }
    var id_alumno = req.body.id_alumno;
    var Alumno = {
        id_alumno,
        fechaNac_alumno: req.body.fechaNac_alumno ? req.body.fechaNac_alumno : null,
        telefono_alumno: req.body.telefono_alumno ? req.body.telefono_alumno : null,
        genero_alumno: req.body.genero_alumno ? req.body.genero_alumno : null,
        nivel_primaria: req.body.nivel_primaria ? req.body.nivel_primaria : null,
        nivel_secundaria: req.body.nivel_secundaria ? req.body.nivel_secundaria: null,
        nivel_terciario: req.body.nivel_terciario ? req.body.nivel_terciario: null,
        nivel_universitario: req.body.nivel_universitario ? req.body.nivel_universitario: null,

    }
    try {
        var updateAlumno = await AlumnoService.updateAlumno(Alumno)
        if(!updateAlumno){
            return res.status(200).json({status: 200, data: updateAlumno, message: "Alumno Inexistente"})
        }
        else{
            return res.status(200).json({status: 200, data: updateAlumno, message: "Succesfully Updated Alumno"})
        }   
        
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.loginAlumno = async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log("llegue a login",req.body)
    var Alumno = {
        usuario_alumno: req.body.usuario_alumno,
        password: req.body.password
    }
    try {
        // Calling the Service function with the new object from the Request Body
        let loginAlumno = await AlumnoService.loginAlumno(Alumno);
        return res.status(201).json({token: loginAlumno[0],rol: loginAlumno[1], id_alumno: loginAlumno[2],message: "Succesfully login"})

    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: "Invalid username or password"})
    }
}

exports.getAlumno = async function (req, res, next){
    var Alumno = {
        id_alumno: req.body.id_alumno,
    }

    try{
        var alumno = await AlumnoService.getAlumno(Alumno);
        if(!alumno){
            return res.status(202).json({status: 202, message: "Alumno inexistente"})
        }
        return res.status(200).json({status: 200, data: alumno, message: "Alumno encontrado"})
        
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }

}
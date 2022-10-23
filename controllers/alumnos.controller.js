var AlumnoService = require('../services/alumnos.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List

exports.createAlumno = async function (req, res, next) {
    // Req.Body contains the form submit values.
    //console.log("llegue al controller",req.body)
    var Alumno = {
        name: req.body.name,
        apellido: req.body.apellido,
        fechaNac: req.body.fechaNac,
        genero: req.body.genero,
        usuario: req.body.usuario,
        password: req.body.password,
        estado: req.body.estado,
        rol: req.body.rol,
        nivel_primaria: req.body.nivel_primaria,
        nivel_secundaria: req.body.nivel_secundaria,
        nivel_terciario: req.body.nivel_terciario,
        nivel_universitario: req.body.nivel_universitario,

    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdAlumno = await AlumnoService.createAlumno(Alumno)
        return res.status(201).json({token: createdAlumno, message: "Succesfully Created Allumno"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Alumno Creation was Unsuccesfull"})
    }
}

exports.loginAlumno = async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log("llegue a login",req.body)
    var Alumno = {
        usuario: req.body.usuario,
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
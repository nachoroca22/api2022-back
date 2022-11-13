var ProfesorService = require('../services/profesor.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.getProfesores = async function (req, res, next) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    try {
        var Profesores = await ProfesorService.getProfesores({}, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Profesores, message: "Succesfully Profesores Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createProfesor = async function (req, res, next) {
    // Req.Body contains the form submit values.
    //console.log("llegue al controller",req.body)
    var Profesor = {
        //legajo: req.body.legajo,
        name: req.body.name,
        apellido: req.body.apellido,
        usuario: req.body.usuario,
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdProfesor = await ProfesorService.createProfesor(Profesor)
        if (createdProfesor !== undefined){
            return res.status(201).json({token: createdProfesor, message: "Succesfully Created Profesor"})
        }else{
            return res.status(204).json({token,message: "El correo ya se encuentra registrado."})
        }
        
        
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Profesor Creation was Unsuccesfull"})
    }
}

exports.resetPassword = async function (req, res, next) {
    if (!req.body.usuario) {
        return res.status(400).json({status: 400., message: "usuario must be present"})
    }
    var usuario = req.body.usuario;
    var Profesor = {
        usuario
    }

    try {
        var resetePassword = await ProfesorService.resetPassword(Profesor)
        if(!resetePassword){
            return res.status(200).json({status: 200, data: resetePassword, message: "Profesor Inexistente"})
        }
        else{
            return res.status(200).json({status: 200, data: resetePassword, message: "Reset Password Profesor"})
        }   
        
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}



exports.updateProfesor = async function (req, res, next) {
    
    // Id is necessary for the update
    if (!req.body.id_user) {
        return res.status(400).json({status: 400., message: "id_clase must be present"})
    }
    var id_user = req.body.id_user;
    var Profesor = {
        id_user,
        fechaNac: req.body.fechaNac ? req.body.fechaNac : null,
        genero: req.body.genero ? req.body.genero : null,
        telefono: req.body.telefono ? req.body.telefono : null,
        estudios: req.body.estudios ? req.body.estudios : null,
        presentacion: req.body.presentacion ? req.body.presentacion: null,
    }
    try {
        var updateProfesor = await ProfesorService.updateProfesor(Profesor)
        if(!updateProfesor){
            return res.status(200).json({status: 200, data: updateProfesor, message: "Profesor Inexistente"})
        }
        else{
            return res.status(200).json({status: 200, data: updateProfesor, message: "Succesfully Updated Profesor"})
        }   
        
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.loginProfesor = async function (req, res, next) {
    // Req.Body contains the form submit values.
    console.log("llegue a login",req.body)
    var Profesor = {
        usuario: req.body.usuario,
        password: req.body.password
    }
    try {
        // Calling the Service function with the new object from the Request Body
        let loginProfesor = await ProfesorService.loginProfesor(Profesor);
        return res.status(201).json({token: loginProfesor[0],rol: loginProfesor[1], id_user: loginProfesor[2],message: "Succesfully login"})

    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: "Invalid username or password"})
    }
}

exports.getProfesor = async function (req, res, next){
    var Profesor = {
        id_user: req.body.id_user,
    }

    try{
        var profesor = await ProfesorService.getProfesor(Profesor);
        if(!profesor){
            return res.status(202).json({status: 202, message: "Profesor inexistente"})
        }
        return res.status(200).json({status: 200, data: profesor, message: "Profesor encontrado"})
        
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }

}

exports.getContrataciones = async function (req, res, next){
    var Contratacion = {
        id_user: req.body.id_user,
    }

    try{
        var profesor = await ProfesorService.getContrataciones(Profesor);
        if(!profesor){
            return res.status(202).json({status: 202, message: "Profesor inexistente"})
        }
        return res.status(200).json({status: 200, data: profesor, message: "Profesor encontrado"})
        
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }

}
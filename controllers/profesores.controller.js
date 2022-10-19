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
        fechaNac: req.body.fechaNac,
        rol: req.body.rol,
        genero: req.body.genero,
        usuario: req.body.usuario,
        password: req.body.password,
        estudios: req.body.estudios,
        presentacion: req.body.presentacion,
        estado: req.body.estado,
        fechaIngreso: req.body.fechaIngreso,

    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdProfesor = await ProfesorService.createProfesor(Profesor)
        return res.status(201).json({token: createdProfesor, message: "Succesfully Created Profesor"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Profesor Creation was Unsuccesfull"})
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
        return res.status(201).json({token: loginProfesor[0],rol: loginProfesor[1] ,message: "Succesfully login"})

    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: "Invalid username or password"})
    }
}
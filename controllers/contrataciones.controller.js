//var ContratacionesService = require('../services/contrataciones.service');
var AlumnoService = require('../services/alumno.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List

exports.createContratacion = async function (req, res, next) {
    // Req.Body contains the form submit values.
    //console.log("llegue al controller",req.body)
    var Contratacion = {
        is_user: req.body.is_user,
        id_clase: req.body.id_clase,
        id_alumno: req.body.id_alumno,
        costo: req.body.costo,
        estado: "Solicitada",
        msjContacto: req.body.msjContacto,
        horaContacto: req.body.horaContacto, 
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdContratacion = await AlumnoService.createContratacion(Contratacion)
        return res.status(201).json({token: createdContratacion, message: "Succesfully Created Contratacion"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "Contratacion creation was Unsuccesfull"})
    }
}

exports.getContratacionesByProfesor = async function (req, res, next){
    var Contrataciones = {
        id_user: req.body.id_user,
    }

    try{
        var profesor = await ContratacionesService.getProfesor(Profesor);
        if(!profesor){
            return res.status(202).json({status: 202, message: "Contrataciones inexistentes"})
        }
        return res.status(200).json({status: 200, data: Contrataciones, message: "Contrataciones encontradas"})
        
    } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
    }

}
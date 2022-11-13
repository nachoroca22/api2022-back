var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
const AutoIncrement = require('mongoose-sequence')(mongoose);

var ContratacionSchema = new mongoose.Schema({
    id_contratacion: Number,
    id_alumno: Number,
    id_user: Number,
    id_clase: Number, 
    costo: Number,
    mensaje: String,
    horario: String,
    profesor: String,
    usuario: String,
    tipoClase: String,
    duracion: Number,
    frecuencia: String,
    materia: String,
    alumno: String,
    telefono_alumno: Number,
    usuario_alumno: String,
    calificacion_alumno: Number,
    estado: Number,
    comentario: String,
    descargo_comentario: String,
    estado_comentario: String,
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

ContratacionSchema.plugin(AutoIncrement, {inc_field: 'id_contratacion'});
ContratacionSchema.plugin(mongoosePaginate)
const Contratacion = mongoose.model('Contratacion', ContratacionSchema)

module.exports = Contratacion;
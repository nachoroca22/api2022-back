var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
const AutoIncrement = require('mongoose-sequence')(mongoose);

var ContratacionSchema = new mongoose.Schema({
    id_contratacion: Number,
    is_user: Number,
    id_clase: Number,
    id_alumno: Number,
    calificacion: Number,
    costo: String,
    estado: String,
    msjContacto: String,
    horaContacto: String,
    comentarios: String,
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

ContratacionSchema.plugin(AutoIncrement, {inc_field: 'id_contratacion'});
ContratacionSchema.plugin(mongoosePaginate)
const Contratacion = mongoose.model('Contratacion', ContratacionSchema)

module.exports = Contratacion;
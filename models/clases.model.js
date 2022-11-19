var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
const AutoIncrement = require('mongoose-sequence')(mongoose);

var ClaseSchema = new mongoose.Schema({
    id_clase: Number,
    materia: String,
    tipoClase: String,
    costo: String,
    frecuencia: String,
    duracion: String,
    descripcion: String,
    id_profesor: Number,
    calificacion: Number,
    calificaciones: Number,
    contrataciones: Number,
    estado: {
        type: Boolean,
        default: true
      }
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

ClaseSchema.plugin(AutoIncrement, {inc_field: 'id_clase'});
ClaseSchema.plugin(mongoosePaginate)
const Clase = mongoose.model('Clase', ClaseSchema)

module.exports = Clase;
var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
const AutoIncrement = require('mongoose-sequence')(mongoose);

var ProfesorSchema = new mongoose.Schema({
    id_profe: Number,
    name: String,
    apellido: String,
    fechaNac: String,
    genero: String,
    usuario: String,
    password: String,
    estudios: String,
    rol: String,
    presentacion: String,
    estado: {
        type: Boolean,
        default: false
      },
    fechaIngreso: {
        type: Date,
        default: Date.now
      }
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

ProfesorSchema.plugin(AutoIncrement, {inc_field: 'id_profe'});
ProfesorSchema.plugin(mongoosePaginate)
const Profesor = mongoose.model('Profesor', ProfesorSchema)

module.exports = Profesor;
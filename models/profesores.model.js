var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
const AutoIncrement = require('mongoose-sequence')(mongoose);

var ProfesorSchema = new mongoose.Schema({
    id_user: Number,
    name: String,
    apellido: String,
    fechaNac: String,
    genero: String,
    usuario: String,
    telefono: Number,
    password: String,
    foto: String,
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

ProfesorSchema.plugin(AutoIncrement, {inc_field: 'id_user'});
ProfesorSchema.plugin(mongoosePaginate)
const Profesor = mongoose.model('Profesor', ProfesorSchema)

module.exports = Profesor;
var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
const AutoIncrement = require('mongoose-sequence')(mongoose);

var AlumnoSchema = new mongoose.Schema({
    id_alumno: Number,
    name: String,
    apellido: String,
    genero: String,
    fechaNac: String,
    usuario: {
        type: String,
        unique: true,
    },
    password: String,
    estado: Boolean,
    rol: String,
    nivel_primaria: String,
    nivel_secundaria: String,
    nivel_terciario: String,
    nivel_universitario: String
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

AlumnoSchema.plugin(AutoIncrement, {inc_field: 'id_alumno'});
AlumnoSchema.plugin(mongoosePaginate)
const Alumno = mongoose.model('Alumno', AlumnoSchema)

module.exports = Alumno;
const mongoose = require('mongoose');
const { Schema } = mongoose;

const Restaurantes = new Schema();

Restaurantes.add({
    nombre: {type: String, required:true},
    direccion: {type: String, required: true},
    estado: {type: Boolean, required: true}
});

module.exports = mongoose.model('Restaurantes', Restaurantes);
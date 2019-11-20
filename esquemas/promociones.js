const mongoose = require('mongoose');
const { Schema } = mongoose;

const Promociones = new Schema();

Promociones.add({
    nombre: {type: String, required:true},
    carta: {type: String, required: true},
    premium: {type: Boolean, required: true},
    activo: {type: Boolean, required: true},
    fechaInactivar: {type: Date, required: true},
    idRestaurante: {type: String, required: true}
});

module.exports = mongoose.model('Promociones', Promociones);
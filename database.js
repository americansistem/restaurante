const mongoose = require('mongoose');
const uri = "mongodb://primerUsuario:ed25797059@cluster0-shard-00-00-dsvka.mongodb.net:27017,cluster0-shard-00-01-dsvka.mongodb.net:27017,cluster0-shard-00-02-dsvka.mongodb.net:27017/ananke-examen?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true })
    .then(db => { console.log('Conexión exitosa con cluster MongoDB: Atlas') })
    .catch(err => { console.log(err) });

module.exports = mongoose;

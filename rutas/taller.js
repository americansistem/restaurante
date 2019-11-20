const express = require('express');
const router = express.Router();
let Restaurantes = require('../esquemas/restaurantes.js');
let Promociones = require('../esquemas/promociones.js');


router.post('/crearRestaurante', async (req, res) => {
    let miNuevoRestaurante = new Restaurantes({
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        estado : req.body.estado
    });

    miNuevoRestaurante.save()
        .then((nodo) => {
            res.json({
                status: "ok",
                nodoCreado: nodo
            });
        })
        .catch((err) => {
            res.json({
                status: "fail",
                error: err
            });
        });
});

router.post('/crearPromocion', async (req, res) => {
    let miNuevaPromocion = new Promociones({
        nombre:req.body.nombre,
        carta: req.body.carta,
        premium: req.body.premium,
        activo: req.body.activo,
        fechaInactivar: req.body.fechaInactivar,
        idRestaurante: req.body.idRestaurante
    });

    miNuevaPromocion.save()
        .then((nodo) => {
            res.json({
                status: "ok",
                nodoCreado: nodo
            });
        })
        .catch((err) => {
            res.json({
                status: "fail",
                error: err
            });
        });  
});


router.get('/buscarPorRestaurante', async (req, res) => {

    Restaurantes.find()
        .then((losNodos) => {
            res.json({
                "status": "ok",
                "Restaurantes": losNodos
            });
        })
        .catch((err) => {
            res.json({
                "status": "fail",
                "error": err
            });
        });

});


router.post('/', async (req, res) => {
    
});

router.post('/', async (req, res) => {
    
});

router.post('/', async (req, res) => {
    
});

router.post('/', async (req, res) => {
    
});

router.post('/', async (req, res) => {
    
});

router.post('/crear/nuevoRestaurante', async (req, res) => {
    
});






module.exports = router;
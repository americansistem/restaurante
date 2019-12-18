const express = require('express');
const router = express.Router();
let Restaurantes = require('../esquemas/restaurantes.js');
let Promociones = require('../esquemas/promociones.js');



// Punto 1 consultar promociones vigentes y no caducan aun 
router.get('/consultaPromVigente', async (req, res) => {
    let fechaActual = new Date();
    Promociones.find({fechaInactivar : {$gt: new Date(fechaActual)}})
        .then((promo) => {
            
           res.json({
                "status": "ok",
                "nodo":promo
               });
        })
        .catch((err) => {
            res.json({
                "status": "fail",
                "error": err
            });
        });
});

//Punto 2 consultar las cinco promociones Premium más recientes 
router.get('/PromPremium', async (req, res) => {

    Promociones.find({premium:true}).limit(5)
    .then((Prom) => {
        
        
       res.json({
            "status": "ok",
            "nodo":Prom

        });
    })
    .catch((err) => {
        res.json({
            "status": "fail",
            "error": err
        });
    });

});


//Punto 3 consultar promociones próximas a expirar, se debe formatear la busqueda
router.get('/PromocionesExpirar', async (req, res) => {
    let fechaActual = new Date();
    /*let cantidad = req.params.cantidad; */
    Promociones.find({fechaInactivar : {$gt: new Date(fechaActual)}}).limit(cantidad)
        .then((Prom) => {
            
           res.json({
                "status": "ok",
                "nodo":Prom
            });
        })
        .catch((err) => {
            res.json({
                "status": "fail",
                "error": err
            });
        });

});

//Punto 4 Obtener toda la información de una promoción en particular, incluyendo al restaurante LISTO
router.get('/infoPromocion', async (req, res) => {
    let idTarget = req.params.id;
    Promociones.findById(idTarget)
        .then((promo) => {
            
            Restaurantes.findById(promo.idRestaurante)
            .then((Restau) => {

                let PromocionTarget = promo.toObject();               
            
            res.json({
                "status": "ok",
                Restaurante: Restau,
                Promocion: PromocionTarget
                
            });
        })
    })
    .catch((err) => {
        res.json({
            "status": "fail",
            "error": err
        });
    });
});


//Punto 5 Obtener todas las promociones de un mismo restaurante
router.get('/PromMismoRestaurante', async (req, res) => {
    let idTarget = req.params.id;
    Promociones.find({idRestaurante:idTarget})
        .then((Promo) => {

            res.json({
                "status": "ok",
                "Nodo": Promo

                
            });
        })
        .catch((err) => {
            res.json({
                "status": "fail",
                "error": err
            });
        });

});


//Punto 6 Crear un nuevo restaurante de pautas 
router.post('/nuevoRestaurante', async (req, res) => {
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


//Punto 7 Crear una nueva promoción y vincularla con uno de los restaurantes existentes 
router.post('/crearPromocion', async (req, res) => {
    let miNuevoPromocion = new Promociones({
        titulo: req.body.titulo,
        contenido: req.body.contenido,
        premium: req.body.premium,
        estado: req.body.estado,
        fechaInicial: req.body.fechaInicial,
        fechaExpiracion: req.body.fechaExpiracion,
        idRestaurante: req.body.idRestaurante
    });

    miNuevoPromocion.save()
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

//Punto 8 Actualizar un solo campo a la vez de promociones LISTO
router.put('/actualizarPromo', async (req, res) => {

    Promociones.findByIdAndUpdate(req.params.id,
        req.body.queryUpdate)
        .then(() => {
            res.json({
                "status": "ok",

        });
        })
        .catch((err) => {
            res.json({
                "status": "fail",
                "error": err
            });
        });


});


//punto 9 Desactivar (o eliminar) una promoción existente
router.put('/desactivar', async (req, res) => {

    Restaurantes.update({id: req.params.id },{$set: { estado : false } })
        .then(() => {
            res.json({
                "status": "ok",

        });
        })
        .catch((err) => {
            res.json({
                "status": "fail",
                "error": err
            });
        });


});











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
router.get('/buscarPromociones', async (req, res) => {

    Promociones.find()
        .then((losNodos) => {
            res.json({
                "status": "ok",
                "Promociones": losNodos
            });
        })
        .catch((err) => {
            res.json({
                "status": "fail",
                "error": err
            });
        });

});






module.exports = router;

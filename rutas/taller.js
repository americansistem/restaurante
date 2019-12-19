const express = require('express');
const router = express.Router();
let Restaurantes = require('../esquemas/restaurantes.js');
let Promociones = require('../esquemas/promociones.js');





//REQ 1 Obtener todas las promociones vigentes (que no han cumplido su fecha de expiración) PENDIENTE
router.get('/obtenerPromocionesVigentes', async (req, res) => {
    let fechaActual = new Date();
    Promociones.find({fechaInactivar : {$gt: new Date(fechaActual)}}).sort({fechaInactivar:1})
        .then((LasPromociones) => {
                     
           res.json({
                "status": "ok",
                "nodo":LasPromociones
            });
        })
        .catch((err) => {
            res.json({
                "status": "fail",
                "error": err
            });
        });
});

//REQ 2 Obtener las cinco promociones Premium más recientes LISTO
router.get('/obtenerPromocionesPremium', async (req, res) => {

    Promociones.find({premium:true}).sort({premium:1}).limit(5)
    .then((LasPromociones) => {
        sumatoria = null;
            for(i=0; i < LasPromociones.length; i++){
            if(LasPromociones[i].premium === true){
                sumatoria = sumatoria +1;
            }
            }
       res.json({
            "status": "ok",
            "Registros":sumatoria,
            "nodo":LasPromociones

        });
    })
    .catch((err) => {
        res.json({
            "status": "fail",
            "error": err
        });
    });

});


//REQ 3 Obtener las promociones próximas a expirar (usted define el criterio de proximidad) FALTANTE 
router.get('/obtenerPromocionesPoExpirar/:cantidad', async (req, res) => {
    let fechaActual = new Date();
    let cantidad = parseInt(req.params.cantidad); 
    Promociones.find({fechaInactivar : {$gt: new Date(fechaActual)},activo:true}).sort({fechaInactivar:1}).limit(cantidad)
        .then((LasPromociones) => {
            
           res.json({
                "status": "ok",
                "nodo":LasPromociones
            });
        })
        .catch((err) => {
            res.json({
                "status": "fail",
                "error": err
            });
        });

});

//REQ 4 Obtener toda la información de una promoción en particular, incluyendo al restaurante LISTO
router.get('/obtenerInfounaPromocionConSuRestaurante/:id', async (req, res) => {
    let idTarget = req.params.id;
    Promociones.findById(idTarget)
        .then((promo) => {
            
            Restaurantes.findById(promo.idRestaurante)
            .then((Restaurant) => {

                let PromocionTarget = promo.toObject();               
            
            res.json({
                "status": "ok",
                Promocion: PromocionTarget,
                Restaurante: Restaurant
                
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

//REQ 5 Obtener todas las promociones de un mismo restaurante LISTO
router.get('/obtenerPromocionesMismoRestaurante/:id', async (req, res) => {
    let idTarget = req.params.id;
    Promociones.find({idRestaurante:idTarget})
        .then((LasPromociones) => {

            Restaurantes.findById(idTarget)
            .then((Restaurant) => {
 
            res.json({
                "status": "ok",
                "Nodo": LasPromociones,
                "Restaurante":Restaurant
   
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

//REQ 6 Crear un nuevo restaurante de pautas LISTO
router.post('/crearNuevoRestaurante', async (req, res) => {
    let miNuevoRestaurante = new Restaurantes({
        nombre: req.body.nombre,
        direccion: req.body.direccion
       
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

//REQ 7 Crear una nueva promoción y vincularla con uno de los restaurantes existentes LISTO
router.post('/crearPromocion', async (req, res) => {
    let miNuevoPromocion = new Promociones({
        nombre: req.body.nombre,
        carta: req.body.carta,
        premium: req.body.premium,
        activo: req.body.activo,
        fechaInactivar: req.body.fechaInactivar,
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

//REQ 8 Actualizar un solo campo a la vez de restaurantes LISTO
router.put('/actualizarDatoDeUnRestaurante/:id', async (req, res) => {

    Restaurantes.findByIdAndUpdate(req.params.id,
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

//REQ 8 Actualizar un solo campo a la vez de promociones LISTO
router.put('/actualizarUnDatoDePromo/:id', async (req, res) => {

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

//Desactivar (o eliminar) una restaurante existente
router.put('/desactivarRestaurante/:id', async (req, res) => {
    let idTarget = req.params.id;
    Restaurantes.findByIdAndUpdate(idTarget,{ activo : false })
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

//Desactivar (o eliminar) una promoción existente
router.put('/desactivarPromocion/:id', async (req, res) => {
    Promociones.findByIdAndUpdate(idTarget,{ activo : false })
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



//Obtener todos los restaurantes
router.get('/obtenerTodosLosRestaurantes', async (req, res) => {

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
                "Promo": losNodos
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

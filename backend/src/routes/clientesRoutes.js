const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController')


router.get('/', (req, res) => {
    res.send('estás dentro de /pedidos/')
})


router.get('/all', clientesController.all)
// router.get('/civ', pedidosController.civ)


/*
router.get('/testdata',filmeController.testdata );
router.get('/list',filmeController.filme_list );
router.get('/get/:id', filmeController.filme_detail);
router.get('/get_all_generos', filmeController.genero_list);
router.post('/create', filmeController.filme_create);
router.put('/update/:id', filmeController.filme_update);
*/

module.exports = router;
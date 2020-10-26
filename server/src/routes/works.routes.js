const { Router } = require ('express')
const router  = Router()

const worksCtrl = require('../controllers/works.controllers.js')

// Rutas de: Mostrar todos los trabajos, crear trabajos, agrupa por id_tecnico y semana
router.get('/', worksCtrl.getWorks);         
router.post('/', worksCtrl.createWorks);
router.get('/find',worksCtrl.getHours)


module.exports = router;
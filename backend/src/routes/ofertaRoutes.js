const router = express.Router();
const OfertaController = require('../controller/ofertaController');

router.get('/', OfertaController.list);
router.get('/:id', OfertaController.getById);
router.post('/', OfertaController.create);
router.put('/:id', OfertaController.update);
router.delete('/:id', OfertaController.remove);

module.exports = router;
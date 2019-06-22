let express = require('express');
let router = express.Router();
let productController = require('../controllers/product');
let cron = require('node-cron');

router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);
router.get('/:id', productController.getProductById);
router.get('/update/all', productController.updatePriceProduct);

cron.schedule('0 0 */1 * * *', productController.updatePriceProduct);


module.exports = router;
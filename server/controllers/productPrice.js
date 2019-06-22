const ProductPrice = require('../db/index').productPrice;

let productPriceController = {
    createProductPrice: (req, res, next) => {
        ProductPrice.create({
            productPrice: req.productPrice,
            ProductId: req.ProductId
        })
        .then(productPrice => {
            next();
        })
        .catch(error => {
            console.log(error);
            next(error);
        })
    }
}

module.exports = productPriceController;
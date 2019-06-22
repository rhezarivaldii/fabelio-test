const Product = require("../db/index").product;
const ProductPrice = require("../db/index").productPrice;
const productPriceController = require("./productPrice");

const Comment = require("../db/index").comment;
const Vote = require("../db/index").vote;
const axios = require("axios");
const cheerio = require("cheerio");

const responseDto = require("../core/utils/responseDto");

let productController = {
  getAllProducts: (req, res, next) => {
    Product.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: ProductPrice,
          order: [["createdAt", "DESC"]],
          limit: 1,
          as: "prices"
        }
      ]
    })
      .then(products => {
        console.log(JSON.stringify(products));
        res
          .status(200)
          .json(responseDto(true, products, "Success fetching all products"));
      })
      .catch(error => {
        console.log(error);
        res.status(404).json(responseDto(false, null, error));
      });
  },
  getProductById: (req, res, next) => {
    Product.findOne({
      where: { id: req.params.id },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: ProductPrice,
          order: [["createdAt", "DESC"]],
          as: "prices"
        },
        {
          model: Comment,
          order: [["createdAt", "DESC"]],
          as: "comments",
          include: [
            {
              model: Vote,
              order: [["createdAt", "DESC"]],
              as: "votes"
            }
          ]
        }
      ]
    })
      .then(product => {
        console.log(product);
        if (product == null) {
          res
            .status(404)
            .json(responseDto(false, null, "Product does not exist"));
          return;
        }
        res
          .status(200)
          .json(responseDto(true, product, "Success fetching product"));
      })
      .catch(error => {
        console.log(error);
        res.status(404).json(responseDto(false, null, error));
      });
  },
  createProduct: async (req, res, next) => {
    let productFromFabelio = await fetchNewProduct(req.body.productUrl);

    if (!productFromFabelio) {
      res
        .status(400)
        .json(responseDto(false, null, "Can not fetch product from Fabelio"));
      return;
    }

    req.body.prices = productFromFabelio.productPrice;

    Product.create(
      {
        productName: productFromFabelio.productName,
        productDesc: productFromFabelio.productDesc,
        productUrl: productFromFabelio.productUrl,
        productImg: productFromFabelio.productImg,
        prices: {
          productPrice: productFromFabelio.productPrice
        }
      },
      {
        include: [
          {
            association: Product.latestProductPrice,
            as: "prices"
          }
        ]
      }
    )
      .then(createdProduct => {
        res
          .status(201)
          .json(responseDto(true, createdProduct, "Data has been created"));
      })
      .catch(error => {
        console.log(error);
        res.status(400).json(responseDto(false, null, error));
      });
  },
  updatePriceProduct: async (req, res, next) => {
    console.log("Starting the cron job to update product price");
    Product.findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: ProductPrice,
          order: [["createdAt", "DESC"]],
          as: "prices"
        }
      ]
    })
      .then(async products => {
        await products.forEach(async product => {
          let updatedProductPrice = await fetchUpdatedPrice(product.productUrl);
          console.log(
            "updated price for product " +
              product.productName +
              " is " +
              updatedProductPrice
          );

          let body = {
            productPrice: updatedProductPrice,
            ProductId: product.id
          };

          productPriceController.createProductPrice(body, res, (e) => {
            if (e) {
              console.log(e);
              res.status(400).json(responseDto(false, null, error));
            }
          });
        });
        console.log("Data has been updated");
        // res.status(200).json(responseDto(true, {}, "Data has been updated"));
      })
      .catch(error => {
        console.log(error);
        // res.status(400).json(responseDto(false, null, error));
      });
  }
};

let fetchUpdatedPrice = async productUrl => {
  let response = await axios.get(productUrl);

  let $ = cheerio.load(response.data, {
    normalizeWhitespace: true,
    xmlMode: true
  });
  let productId = $(".price-final_price").data("product-id");

  let productPrice = $(`#product-price-${productId}`)
    .first()
    .text()
    .trim();

  console.log("New product price : " + productPrice);
  return productPrice;
};

async function fetchNewProduct(productUrl) {
  let productModel = {};
  let response;

  try {
    response = await axios.get(productUrl);
  } catch(error) {
    return null;
  }

  let $ = cheerio.load(response.data, {
    normalizeWhitespace: true,
    xmlMode: true
  });

  let productName = $(".page-title")
    .text()
    .trim();
  let productId = $(".price-final_price").data("product-id");
  let productPrice = $(`#product-price-${productId}`)
    .first()
    .text()
    .trim();

  let imageParent = captureImageData($("script"));

  console.log("Image Parent is " + imageParent);

  let productDesc = $(".product-info__description")
    .text()
    .trim();      
    
    productModel["productName"] = productName;
    productModel["productPrice"] = productPrice;
    productModel["productUrl"] = productUrl;
    productModel["productDesc"] = productDesc;

    try {
      productModel["productImg"] = JSON.stringify(imageParent.data);
    } catch (e) {
      productModel["productImg"] = "Empty";
      console.log("Cannot get images");
    }
  return productModel;
}

let captureImageData = scripts => {
  let imageParent;

  scripts.each((i, script) => {
    if (script.attribs.type == "text/x-magento-init") {
        try {
            let newData = JSON.parse(script.children[0].data);

            console.log(newData);
            let keys = Object.keys(newData);
      
            for (let i = 0; i < keys.length; i++) {
              if (newData[keys[i]]["mage/gallery/gallery"]) {
                imageParent = newData[keys[i]]["mage/gallery/gallery"];
                console.log(imageParent.data);
                break;
              }
            }
        } catch(e) {
            console.log("Something happens");
        }
    }
  });
  return imageParent;
};

module.exports = productController;

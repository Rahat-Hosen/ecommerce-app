const Product = require("../Model/Product");
const User = require("../Model/User");
const cloudinary = require("cloudinary");
const serverError = require("../utils/serverError");

const addProduct = (req, res) => {
  const { name, category, regularPrice, salePrice, description, tags } =
    req.body;

  const { email } = req.user;
  User.findOne({ email })
    .then((response) => {
      if (response.role === "admin" || response.role === "vendor") {
        cloudinary.v2.uploader.upload(
          req.file.path,
          { public_id: "ecommerce-app/products/" + req.file.filename },
          function (err, result) {
            if (err) {
              serverError(res);
            } else {
              const product = {
                author: {
                  authorId: response._id,
                  storeName: response.storeName,
                },
                name,
                category,
                regularPrice,
                salePrice,
                description,
                tags: JSON.parse(tags),
                image: [
                  {
                    url: result.url,
                    public_id: result.public_id,
                  },
                ],
              };
              new Product(product)
                .save()
                .then((response) => {
                  res.status(200).json(response);
                })
                .catch(() => {
                  serverError(res);
                });
            }
          }
        );
      }
    })
    .catch(() => {
      serverError(res);
    });
};

const getProduct = (req, res) => {
  Product.find()
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(() => {
      serverError(res);
    });
};

const updateProduct = (req, res) => {
  const id = req.params.id;
  const { name, regularPrice, salePrice, description, inCart, inWish } =
    req.body;
  const updateProduct = {
    name,
    regularPrice,
    salePrice,
    description,
    inCart,
    inWish,
  };
  Product.findOneAndUpdate({ _id: id }, updateProduct, { new: true })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch(() => {
      serverError(res);
    });
};

const deleteProduct = (req, res) => {
  const id = req.params.id;
  const { email } = req.user;
  User.findOne({ email })
    .then((response) => {
      if (response.role === "admin" || response.role === "vendor") {
        Product.findOneAndRemove({ _id: id })
          .then((response) => {
            cloudinary.v2.uploader.destroy(
              response.public_id,
              function (result) {
                if (result) {
                  res.status(200).json(response);
                }
              }
            );
          })
          .catch(() => {
            serverError(res);
          });
      }
    })
    .catch(() => {
      serverError(res);
    });
};

module.exports = {
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};

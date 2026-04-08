const express = require("express");
const Router = express.Router();
const { getAll,addProduct,updateProduct ,DeleteProduct , getOneProduct} = require("../controllers/product.controller");
Router.get("/", getAll);
Router.post("/add",addProduct)
Router.patch("/:id",updateProduct)
Router.delete("/:id",DeleteProduct)
Router.get("/:id", getOneProduct);
module.exports = Router;

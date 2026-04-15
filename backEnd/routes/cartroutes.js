const express = require("express");
const Router = express.Router();
const { addToCart , getCart , removeFromCart , createCart} = require("../controllers/product.controller");

Router.post("/:cartId" , addToCart)
Router.get("/:cartId", getCart);
Router.delete("/:cartId/:productId", removeFromCart);
Router.post("/", createCart);
module.exports = Router;

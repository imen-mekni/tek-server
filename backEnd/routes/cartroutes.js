const express = require("express");
const Router = express.Router();
const { addToCart , getCart , removeFromCart , createCart , updateQuantity} = require("../controllers/product.controller");

Router.post("/:cartId" , addToCart)
Router.get("/:cartId", getCart);
Router.delete("/:cartId/:productId", removeFromCart);
Router.put("/:cartId/:productId", updateQuantity);
Router.post("/", createCart);
module.exports = Router;

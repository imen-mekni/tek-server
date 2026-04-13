const { Product, Cart, CartItem } = require("../Mysql");
module.exports={
  getAll :(req, res) => {
    Product.findAll()
    .then((response)=>{res.status(200).send(response)})
    .catch((error)=>{res.status(500).send(error)})
},
addProduct:(req,res)=>{
  console.log(req.body)
    Product.create(req.body)
    .then(()=>{res.status(201).send("Product added successfully")})
    .catch((error)=>{throw error})
},
updateProduct:(req,res)=>{
    Product.update(req.body ,{where :{id:req.params.id}})
    .then(()=>{res.status(201).send("Product updated successfully")})
    .catch((error)=>{res.status(500).send(error)})
},
DeleteProduct:(req,res)=>{
  Product.destroy({where :{id:req.params.id}})
  .then(()=>{res.status(200).send("Product deleted successfully")})
  .catch((error)=>{res.status(500).send(error)})
} ,
getOneProduct: (req, res) => {
  Product.findByPk(req.params.id)
    .then((response) => {
      if (!response) {
        return res.status(404).send("Product not found");
      }
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
},
addToCart: async (req, res) => {
  try {
    const { cartId } = req.params;
    const { productId, quantity } = req.body;

    const cart = await Cart.findByPk(cartId);
    if (!cart) {
      return res.status(404).send("Cart not found");
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }

    const [item, created] = await CartItem.findOrCreate({
      where: {
        cartId: cart.id,
        productId: product.id,
      },
      defaults: { quantity: quantity || 1 },
    });

    if (!created) {
      item.quantity += quantity || 1;
      await item.save();
    }

    res.status(200).json(item);

  } catch (error) {
    res.status(500).send(error.message);
  }
}
};

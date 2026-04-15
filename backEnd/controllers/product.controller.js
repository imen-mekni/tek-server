const { Product, Cart, CartItem } = require("../Mysql");
module.exports = {
  getAll: (req, res) => {
    Product.findAll()
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  },
  addProduct: (req, res) => {
    console.log(req.body);
    Product.create(req.body)
      .then(() => {
        res.status(201).send("Product added successfully");
      })
      .catch((error) => {
        throw error;
      });
  },
  updateProduct: (req, res) => {
    Product.update(req.body, { where: { id: req.params.id } })
      .then(() => {
        res.status(201).send("Product updated successfully");
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  },
  DeleteProduct: (req, res) => {
    Product.destroy({ where: { id: req.params.id } })
      .then(() => {
        res.status(200).send("Product deleted successfully");
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  },
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
      let { productId, quantity } = req.body;

      quantity = Number(quantity) || 1;

      let cart = await Cart.findByPk(cartId);

      if (!cart) {
        cart = await Cart.create({});
      }

      const product = await Product.findByPk(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const [item, created] = await CartItem.findOrCreate({
        where: {
          cartId: cart.id,
          productId: product.id,
        },
        defaults: {
          quantity,
        },
      });

      if (!created) {
        item.quantity += quantity;
        await item.save();
      }

      return res.status(200).json({
        message: created ? "Product added to cart" : "Product quantity updated",
        item,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  },
  createCart: async (req, res) => {
  try {
    const cart = await Cart.create({});

    return res.status(201).json({
      id: cart.id,
      message: "Cart created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
},
  getCart: async (req, res) => {
    try {
      const { cartId } = req.params;

      const cartItems = await CartItem.findAll({
        where: { cartId },
        include: [
          {
            model: Product,
            attributes: ["id", "name", "price", "imageUrl"],
          },
        ],
      });

      const formatted = cartItems.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        imageUrl: item.product.imageUrl,
        quantity: item.quantity,
      }));

      res.status(200).json(formatted);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  },
  removeFromCart: async (req, res) => {
  try {
    const { cartId, productId } = req.params;

    const item = await CartItem.findOne({
      where: {
        cartId,
        productId,
      },
    });

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }
    if (item.quantity > 1) {
      item.quantity -= 1;
      await item.save();

      return res.status(200).json({
        message: "Quantity decreased by 1",
        item,
      });
    }
    await item.destroy();

    return res.status(200).json({
      message: "Product removed from cart",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
},

};

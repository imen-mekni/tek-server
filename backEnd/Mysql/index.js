const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();
const sampleData = require("../data.json");

const connection = new Sequelize(process.env.DATABASE_URL, {
  dialect: "mysql",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

connection
  .authenticate()
  .then(() => console.log(" connection established successfully"))
  .catch((err) => console.log("database not connected", err));


const Product = connection.define("product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  categories: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: "electronics",
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
const Cart = connection.define("cart", {
});
const CartItem = connection.define("cartItem", {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});


Cart.hasMany(CartItem);
CartItem.belongsTo(Cart);

Product.hasMany(CartItem);
CartItem.belongsTo(Product);
connection
  .sync({ force: true })
  .then(async () => {
    console.log("Tables synced successfully");

    const count = await Product.count();

    if (count === 0) {
      await Product.bulkCreate(sampleData);
      console.log("Products data have been saved");
    } else {
      console.log("Data already exists, skipping insert");
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });

module.exports = {
  connection,
  Product,
  Cart,
  CartItem,
};

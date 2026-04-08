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
    type: DataTypes.ENUM("phones", "computers", "electronics"),
    allowNull: false,
    defaultValue: "electronics",
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


connection
  .sync({ alter: true })
  .then(() => {
    console.log("Tables synced successfully");
    return Product.bulkCreate(sampleData, { ignoreDuplicates: true });
  })
  .then(() => {
    console.log(" Products data have been saved");
  })
  .catch((error) => {
    console.error(" Error:", error);
  });


module.exports = Product;

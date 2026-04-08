const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const connection = new Sequelize(process.env.DATABASE_URL, {
  dialect: "mysql",
});
// verify connection
connection.authenticate()
  .then(() => console.log("connection established successfully"))
  .catch((err) => console.log("database not connected", err));

module.exports = connection;


//your Product table using sequilize
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


// this call, Sequelize will automatically perform an SQL query to the database and create a table, printing the message phrase table created successfully!.

// !!!!!!!!!!!!!!!!please use the code below only one time!!!!!!!!!!!!!!!!!!!

connection
  .sync({ alter: true })
  .then(() => {
    console.log("product table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

// export your Model Phrase below
module.exports = Product;

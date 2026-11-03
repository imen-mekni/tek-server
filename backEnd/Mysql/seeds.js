const Product = require("./index");
const sampleData = require("../data.json");

Product.destroy({ where: {} })
  .then(() => Product.bulkCreate(sampleData))
  .then(() => console.log("Products data have been saved"))
  .catch((err) => console.log(err));

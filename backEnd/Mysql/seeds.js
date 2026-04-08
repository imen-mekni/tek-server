const Product = require("./index");
const sampleData = require("../data.json");

Product.bulkCreate(sampleData, { ignoreDuplicates: true }).then(() =>
  console.log("products data have been saved")
);

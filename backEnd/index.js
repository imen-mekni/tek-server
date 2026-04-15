const express = require("express");
const cors = require("cors");
const productRoute = require("./routes/product.routes");
const cartroute = require("./routes/cartroutes");

const db = require("./Mysql");

const port = 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRoute);
app.use("/api/cart",cartroute );

app.listen(port, () => {
  console.log(`listening on ${port}`);
});

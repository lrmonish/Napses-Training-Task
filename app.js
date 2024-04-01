const express = require("express");
const cors = require("cors");
const app = express();
const { sequelize } = require("./models");

const userRoute = require("./routes/userRoutes.js");
const aadharRoute = require("./routes/aadharRoute");
const addressRoute = require("./routes/addressRoute");
const roleRoute = require("./routes/roleRoute");

app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use(userRoute);
app.use(aadharRoute);
app.use(addressRoute);
app.use(roleRoute);

app.listen(4000, () => {
  function main() {
    sequelize.sync();
    console.log("synced!!!");
  }
  main();
  console.log("Server listening on port 4000");
});

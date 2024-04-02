const express = require("express");
const cors = require("cors");
const app = express();
const { sequelize, Image, Comment } = require("./models");

const userRoute = require("./routes/userRoutes.js");
const aadharRoute = require("./routes/aadharRoute");
const addressRoute = require("./routes/addressRoute");
const roleRoute = require("./routes/roleRoute");

const multer = require("multer");

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

const upload = multer({ dest: "./upload/images" });
app.post("/image", upload.single("profile"), async (req, res) => {
  try {
    const { filename } = req.file;
    const { name } = req.body;
    const imageUrl = `/upload/images/${filename}`;

    const image = await Image.create({ name, imageUrl });
    res.status(201).json({ message: image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/images/:id/comments", async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const image = await Image.findByPk(id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    const comment = await Comment.create({ content, imageId: id });
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/images/:id/comments", async (req, res) => {
  try {
    const { id } = req.params;

    const image = await Image.findByPk(id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    const comments = await Comment.findAll({ where: { imageId: id } });
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(4000, () => {
  function main() {
    sequelize.sync();
    console.log("synced!!!");
  }
  main();
  console.log("Server listening on port 4000");
});

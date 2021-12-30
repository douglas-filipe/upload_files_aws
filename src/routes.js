const routes = require("express").Router();
const multer = require("multer");
const multerConfig = require("./config/multer");

const Post = require("./models/Post");

routes.get("/posts", async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

routes.post("/posts", multer(multerConfig).single("file"), async (req, res) => {
  const { originalname: name, size, key, location: url } = req.file;
  try {
    const post = await Post.create({
      name,
      size,
      key,
      url,
    });
    return res.json(post);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "Error" });
  }
});

routes.delete("/posts/:id", async (req, res) => {
  const post = await Post.findById(req.params.id)

  await post.remove();

  return res.status(204).json()
});

module.exports = routes;

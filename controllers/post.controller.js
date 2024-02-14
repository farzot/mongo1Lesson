const post = require("../schemas/post");
const mongoose = require("mongoose");

const addpost = async (req, res) => {
  const { title, post_text, author } = req.body;

  if (!title || !post_text || !author) {
    return res.status(400).json({ message: "Togri kiriting " });
  }

  try {
    const oldPost = await post.findOne({ post_text });

    if (oldPost) {
      return res.status(400).send({ message: "Bunday post yozilgan " });
    }
    const newPost = await post.create({
      title,
      post_text,
      author,
    });
    // await newpost.save();

    res.status(201).send({ message: "post qoshildi ", newPost });
  } catch (error) {
    res.status(500).send({ Error: "Serverda xatolik" });
    console.log(error);
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await post.find({});

    return res.status(200).send(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ Error: "serverda xatolik" });
  }
};
const getPostsById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ message: "Incorrect Id" });
    }

    const post1 = await post.findOne({ _id: req.params.id });

    if (!post1) {
      return res.status(400).send({ message: "Bunday post yo'q " });
    }

    res.status(200).send(post1);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ Error: "serverda xatolik" });
  }
};
const deletePostByid = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ message: "Incorrect Id" });
    }

    const post1 = await post.deleteOne({ _id: req.params.id });

    console.log(post1);

    if (!post1) {
      return res.status(400).send({ message: "Bunday post yo'q " });
    }

    return res.status(200).send(post1);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ Error: "serverda xatolik" });
  }
};

const updatePostByid = async (req, res) => {
  const { title, post_text, author } = req.body;

  if (!title || !post_text || !author) {
    return res.status(400).json({ message: "Togri kiriting " });
  }

  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ message: "Incorrect Id" });
    }

    const post1 = await post.updateOne(
      { _id: req.params.id },
      { title, post_text, author }
    );

    console.log(post1);

    // if (!post1) {
    //   return res.status(400).send({ message: "Bunday post yoq " });
    // }

    res.status(200).send(post1);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ Error: "serverda xatolik" });
  }
};

module.exports = {
  addpost,
  getPosts,
  getPostsById,
  deletePostByid,
  updatePostByid,
};

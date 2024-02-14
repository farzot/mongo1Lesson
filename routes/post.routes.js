const { Router } = require("express");
const {
  addpost,
  getPosts,
  getPostsById,
  deletePostByid,
  updatePostByid,
} = require("../controllers/post.controller");

const router = Router();

router.post("/", addpost);

router.get("/", getPosts);
router.get("/:id", getPostsById);

router.delete("/:id", deletePostByid);
router.put("/:id", updatePostByid);

module.exports = router;

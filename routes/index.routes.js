const { Router } = require("express");
const userRouter = require("./post.routes");

const router = Router();

router.use("/post", userRouter);

module.exports = router;

const router = require("express").Router();
const taskRouter = require("./taskRouter");
const UserController = require("../controllers/UserController");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/googleSignIn", UserController.googleSignIn);

router.use("/tasks", taskRouter);

module.exports = router;

const router = require("express").Router();
const TaskController = require("../controllers/TaskController");
const { authentication, authorization } = require("../middlewares/validate");

router.use(authentication);
router.post("/", TaskController.add);
router.get("/", TaskController.read);
router.get("/:id", TaskController.readById);
router.put("/:id", authorization, TaskController.update);
router.delete("/:id", authorization, TaskController.delete);

module.exports = router;

const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");

const authValidator = require("../validators/authValidator");
const userValidator = require("../validators/userValidator");

const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const isolatedTasksController = require("../controllers/isolatedTasksController");
const listController = require("../controllers/listController");
const listTaskController = require("../controllers/listTaskController");

router.get("/", function (req, res, next) {
  res.json({
    message:
      "API online, confira seu console para ver se seu banco de dados está conectado",
  });
});

//login
router.post("/login", authValidator.login, authController.login);
//register
router.post("/register", authValidator.register, authController.register);

//users
router.get("/user/me", authMiddleware.privateRoute, userController.info);
router.put(
  "/user/me",
  userValidator.editAction,
  authMiddleware.privateRoute,
  userController.editAction
);

//isolated tasks
router.get(
  "/isolated-tasks",
  authMiddleware.privateRoute,
  isolatedTasksController.getAction
);

router.post(
  "/isolated-tasks",
  authMiddleware.privateRoute,
  isolatedTasksController.addAction
);
router.delete(
  "/isolated-tasks/:id",
  authMiddleware.privateRoute,
  isolatedTasksController.deleteAction
);
router.put(
  "/isolated-tasks/:id",
  authMiddleware.privateRoute,
  isolatedTasksController.editAction
);

//lists
router.get("/lists", authMiddleware.privateRoute, listController.getAction);
router.post("/lists", authMiddleware.privateRoute, listController.addAction);
router.delete(
  "/lists",
  authMiddleware.privateRoute,
  listController.deleteAction
);
router.put("/lists", authMiddleware.privateRoute, listController.editAction);

//list tasks
router.post(
  "/list-tasks",
  authMiddleware.privateRoute,
  listTaskController.addAction
);
router.put(
  "/list-tasks",
  authMiddleware.privateRoute,
  listTaskController.editAction
);
router.delete(
  "/list-tasks",
  authMiddleware.privateRoute,
  listTaskController.deleteAction
);

module.exports = router;

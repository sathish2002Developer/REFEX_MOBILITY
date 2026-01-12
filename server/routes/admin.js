const router = require("express").Router();
const usersController = require("../controllers/users");
const authMiddleware = require("../middlewares/auth");
const {
  createUserSchema,
  updateUserSchema,
} = require("../middlewares/userValidator");

// All admin routes require authentication
router.use(authMiddleware.requireAuth);

// User management routes
router.get("/users", usersController.getAllUsers);
router.get("/users/:id", usersController.getUserById);
router.post("/users", createUserSchema, usersController.createUser);
router.put("/users/:id", updateUserSchema, usersController.updateUserById);
router.delete("/users/:id", usersController.deleteUserById);

module.exports = router;



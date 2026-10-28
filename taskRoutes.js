const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const { validateTaskBody, validateIdParam } = require("../middleware/validate");

// Resources are nouns, methods are verbs — RESTful naming (see PDF slide 8)
router.get("/", getAllTasks);
router.get("/:id", validateIdParam, getTaskById);
router.post("/", validateTaskBody, createTask);
router.put("/:id", validateIdParam, validateTaskBody, updateTask);
router.delete("/:id", validateIdParam, deleteTask);

module.exports = router;

const store = require("../data/tasks");

// GET /tasks — retrieve all tasks (safe, idempotent)
function getAllTasks(req, res) {
  const { completed } = req.query;
  let result = store.getAll();

  if (completed !== undefined) {
    const flag = completed === "true";
    result = result.filter((t) => t.completed === flag);
  }

  res.status(200).json({ count: result.length, tasks: result });
}

// GET /tasks/:id — retrieve a single task
function getTaskById(req, res) {
  const task = store.getById(req.taskId);
  if (!task) {
    return res.status(404).json({ error: `Task with id ${req.taskId} not found.` });
  }
  res.status(200).json(task);
}

// POST /tasks — create a new task (unsafe, non-idempotent)
function createTask(req, res) {
  const { title, completed = false } = req.body;
  const newTask = store.create({ title: title.trim(), completed });
  res.status(201).json(newTask);
}

// PUT /tasks/:id — update/replace an existing task
function updateTask(req, res) {
  const existing = store.getById(req.taskId);
  if (!existing) {
    return res.status(404).json({ error: `Task with id ${req.taskId} not found.` });
  }

  const updates = {};
  if (req.body.title !== undefined) updates.title = req.body.title.trim();
  if (req.body.completed !== undefined) updates.completed = req.body.completed;

  const updated = store.update(req.taskId, updates);
  res.status(200).json(updated);
}

// DELETE /tasks/:id — remove a task
function deleteTask(req, res) {
  const removed = store.remove(req.taskId);
  if (!removed) {
    return res.status(404).json({ error: `Task with id ${req.taskId} not found.` });
  }
  res.status(204).send();
}

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };

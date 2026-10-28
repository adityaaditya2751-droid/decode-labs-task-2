const express = require("express");
const taskRoutes = require("./routes/taskRoutes");
const { notFoundHandler, errorHandler } = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON request bodies — "the neurotransmitter"
app.use(express.json());

// Tiny request logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.originalUrl}`);
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Task API is running.",
    endpoints: {
      "GET /tasks": "List all tasks (supports ?completed=true|false)",
      "GET /tasks/:id": "Get a single task",
      "POST /tasks": "Create a task { title, completed? }",
      "PUT /tasks/:id": "Update a task { title?, completed? }",
      "DELETE /tasks/:id": "Delete a task",
    },
  });
});

app.use("/tasks", taskRoutes);

// 404 for unmatched routes, then centralized error handler
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Task API listening on http://localhost:${PORT}`);
});

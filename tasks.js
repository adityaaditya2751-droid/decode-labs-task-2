// In-memory "database". In a real app this would be replaced by a
// persistence layer (Project 3 territory) — for Project 2 we only
// care about the API/logic layer, not storage.

let tasks = [
  { id: 1, title: "Design API endpoints", completed: true },
  { id: 2, title: "Add input validation", completed: false },
  { id: 3, title: "Handle HTTP status codes", completed: false },
];

let nextId = 4;

module.exports = {
  getAll: () => tasks,
  getById: (id) => tasks.find((t) => t.id === id),
  create: (task) => {
    const newTask = { id: nextId++, ...task };
    tasks.push(newTask);
    return newTask;
  },
  update: (id, updates) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return null;
    Object.assign(task, updates);
    return task;
  },
  remove: (id) => {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  },
};

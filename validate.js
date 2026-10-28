// "The Gatekeeper Rule" — never trust the client.
// Syntactic validation: is the shape/type correct?
// Semantic validation: does the value make sense?

function validateTaskBody(req, res, next) {
  const { title, completed } = req.body;

  if (req.method === "POST") {
    if (title === undefined) {
      return res.status(400).json({ error: "Field 'title' is required." });
    }
  }

  if (title !== undefined && (typeof title !== "string" || title.trim().length === 0)) {
    return res
      .status(400)
      .json({ error: "Field 'title' must be a non-empty string." });
  }

  if (title !== undefined && title.length > 200) {
    return res
      .status(400)
      .json({ error: "Field 'title' must be 200 characters or fewer." });
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return res
      .status(400)
      .json({ error: "Field 'completed' must be a boolean." });
  }

  next();
}

function validateIdParam(req, res, next) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "URL param 'id' must be a positive integer." });
  }
  req.taskId = id;
  next();
}

module.exports = { validateTaskBody, validateIdParam };

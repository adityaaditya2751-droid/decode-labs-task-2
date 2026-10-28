# Task API — Project 2: Backend API Development
DecodeLabs Full Stack Training Kit | Batch 2026

A simple, dependency-light REST API built with Express, demonstrating
core backend concepts: RESTful routing, request validation, and
correct HTTP status code usage.

## Setup

```bash
npm install
npm start          # runs on http://localhost:3000
# or, for auto-restart on changes:
npm run dev
```

## Endpoints

| Method | Route          | Description                              | Success | Errors        |
|--------|----------------|-------------------------------------------|---------|----------------|
| GET    | `/tasks`       | List all tasks (`?completed=true/false`) | 200     | —              |
| GET    | `/tasks/:id`   | Get one task                              | 200     | 400, 404       |
| POST   | `/tasks`       | Create a task `{ title, completed? }`     | 201     | 400            |
| PUT    | `/tasks/:id`   | Update a task `{ title?, completed? }`    | 200     | 400, 404       |
| DELETE | `/tasks/:id`   | Delete a task                             | 204     | 400, 404       |

## Example requests

```bash
curl http://localhost:3000/tasks

curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "Write tests"}'

curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'

curl -X DELETE http://localhost:3000/tasks/1
```

## Design notes (mapping back to the training deck)

- **RESTful naming**: resources are nouns (`/tasks`), HTTP methods are
  the verbs (GET/POST/PUT/DELETE) — no `/getTasks` or `/createTask`.
- **The Gatekeeper Rule**: all input is validated in
  `middleware/validate.js` before it reaches the controller — both
  syntactic (right type/shape) and semantic (non-empty, sane length).
- **Status codes with intent**: 200 (read/update success), 201
  (created), 204 (deleted, no body), 400 (bad input), 404 (not found).
- **Centralized error handling**: `middleware/errorHandler.js` catches
  anything unhandled and returns a consistent 500 shape instead of
  leaking a stack trace.
- **In-memory store**: `data/tasks.js` stands in for a database so
  this project stays focused on API/logic layer only, per the brief
  ("this isn't about databases yet").

## Project structure

```
task-api/
├── server.js              # app entrypoint
├── routes/taskRoutes.js   # route → controller wiring
├── controllers/taskController.js
├── middleware/
│   ├── validate.js        # input validation (the "gatekeeper")
│   └── errorHandler.js    # 404 + centralized error handling
└── data/tasks.js          # in-memory data store
```

const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/authMiddleware");

// CREATE TASK
router.post("/", auth, (req, res) => {
  const { title } = req.body;

  console.log("User ID:", req.user.id); // DEBUG

  db.query(
    "INSERT INTO tasks (title, user_id) VALUES (?, ?)",
    [title, req.user.id],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      res.send("Task added");
    }
  );
});

// GET TASKS
router.get("/", auth, (req, res) => {
  db.query(
    "SELECT * FROM tasks WHERE user_id = ?",
    [req.user.id],
    (err, result) => {
      if (err) return res.send(err);
      res.json(result);
    }
  );
});

module.exports = router;
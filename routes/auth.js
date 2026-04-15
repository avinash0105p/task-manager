const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET = "secret123";

// Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, hashed, "user"],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("User Registered");
    }
  );
});

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (result.length === 0) return res.send("User not found");

    const valid = await bcrypt.compare(password, result[0].password);

    if (!valid) return res.send("Wrong password");

    const token = jwt.sign({ id: result[0].id }, SECRET);

    res.json({ token });
  });
});

module.exports = router;
// implement your API here
const express = require("express");
const cors = require("cors");
const server = express();
const port = 3005;

const Db = require("./data/db");

server.use(express.json());
server.use(cors());

// GET
server.get("/api/users/", (req, res) => {
  Db.find()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
});

// GET by ID
server.get("/api/users/:id", (req, res) => {
  Db.findById(req.params.id)
    .then(data => {
      if (!data) {
        res
          .status(400)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.status(200).json(data);
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
});

// POST
server.post("/api/users", (req, res) => {
  const { body } = req;
  if (!body.name || !body.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    Db.insert(req.body)
      .then(data => {
        res.status(201).json(data);
      })
      .catch(error => {
        res.status(500).json({
          error: "There was an error while saving the user to the database."
        });
      });
  }
});

// PUT
server.put("/api/users/:id", (req, res) => {
  const { body, params } = req;
  if (!body.name || !body.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    Db.update(params.id, body)
      .then(data => {
        if (!data)
          res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
        else res.status(200).json(data);
      })
      .catch(error => {
        res
          .status(500)
          .json({ error: "The user information could not be modified." });
      });
  }
});

// DELETE
server.delete("/api/users/:id", (req, res) => {
  Db.remove(req.params.id)
    .then(data => {
      if (!data) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else {
        res.status(200).json(data);
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The user could not be removed." });
    });
});

// LISTEN
server.listen(port, () => {
  console.log(`Listening on ${port}`);
});

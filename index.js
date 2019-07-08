// implement your API here
const express = require('express');
const server = express();
const port = 3005;

const Db = require('./data/db');

server.use(express.json());

// GET
server.get('/api/users/', (req, res) => {
    Db.find()
      .then(data => {
          res
          .status(200)
          .json(data);
      })
      .catch(() => {
          res
          .status(500)
          .json({ errorMessage: "Please provide name and bio for the user." });
      });
});

// LISTEN
server.listen(port, () => {
    console.log(`Listening on ${port}`);
})
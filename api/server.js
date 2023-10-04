const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const path = require('path');
const usersRouter = require("./users/users-router.js");
const restaurantRouter = require("./restaurants/restaurants.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/users", usersRouter);
server.use("/api/restaurant", restaurantRouter);
server.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname + '../../client/index.html'));
})

server.get('/login' , (req, res) => {
  res.sendFile(path.resolve(__dirname + '../../client/main.html'));  
})

module.exports = server;

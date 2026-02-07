require("dotenv").config();
require("./dbConfig");
const express = require("express");
const cors = require("cors");
const router = require("./routes");

const server = express();
const port = 3000;
server.use(cors());

//parser middleware
server.use(express.json());

server.use(router);

server.listen(port, () => {
  console.log("Server is runnning on port ", port);
});

//mongodb+srv://disaster:disaster@cluster0.trgh0vb.mongodb.net/?appName=Cluster0

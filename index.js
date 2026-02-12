require("dotenv").config();
require("./dbConfig");
const express = require("express");
const cors = require("cors");
const router = require("./routes");

const server = express();
const port = process.env.PORT || 3000;

// CORS configuration - allow your frontend to access the API
server.use(cors({
  origin: '*', // Allow all origins, or specify your frontend URL
  credentials: true
}));

//parser middleware
server.use(express.json());

// Health check route
server.get('/', (req, res) => {
  res.status(200).json({
    message: 'DMS Backend API is running!',
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

server.use(router);

server.listen(port, () => {
  console.log("Server is runnning on port ", port);
});

//mongodb+srv://disaster:disaster@cluster0.trgh0vb.mongodb.net/?appName=Cluster0

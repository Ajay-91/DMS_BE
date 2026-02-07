const mongoose = require("mongoose");
//add project name bwt / and  ? in connectionString

mongoose
  .connect(
    process.env.connectionString
  )
  .then((res) => {
    console.log("connect to mongoose");
  })
  .catch((err) => {
    console.log(err);
  });

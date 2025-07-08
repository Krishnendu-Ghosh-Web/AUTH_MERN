const mongoose = require("mongoose");

const DB =
  "mongodb+srv://bkrishnendughosh:Krish%401234@authusers.s4vyqkw.mongodb.net/Authusers?retryWrites=true&w=majority&appName=Authusers";

mongoose
  .connect(DB)
  .then(() => console.log("Database connected"))
  .catch((error) => {
    console.log("Connection error:", error);
  });

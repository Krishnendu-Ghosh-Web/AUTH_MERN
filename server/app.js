const express = require("express");
const app = express();
const router = require("./routes/router");
const cors = require("cors");
const cookiParser = require("cookie-parser");
require("./db/connection");
const port = 8009;
// app.get("/", (req, res) => {
//   res.status(201).json("server created");
// });
app.use(express.json());
app.use(cors());
app.use(router);
app.use(cookiParser());
app.listen(port, () => {
  console.log(`server start at port no:${port}`);
});

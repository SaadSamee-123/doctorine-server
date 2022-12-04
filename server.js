
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
require("dotenv").config();
const dbConfig = require("./config/dbConfig");
app.use(express.json());
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const doctorRoute = require("./routes/doctorsRoute");
const path = require("path");

app.get("/", (_, res) => {
  res.status(200).send("Online");
});

app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/doctor", doctorRoute);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}
const port = process.env.PORT || 8000;

// app.get("/", (req, res) => res.send("Hello World!"));
// app.listen(port, () => console.log(`Node Express Server Started at ${port}!`));

server.listen(port, () => {
  console.log(`Server has started`);
});

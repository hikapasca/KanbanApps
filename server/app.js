require("dotenv").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.port || 3000;
const errorHandler = require("./middlewares/errorHandler");
const router = require("./routes");
const app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Halo Semuanya");
});

app.use(router);
app.use(errorHandler);

io.on("connection", function (socket) {
  socket.emit("news", { hello: "world" });
  socket.on("my other event", function (data) {
    console.log(data);
  });
});

// app.listen(PORT, function () {
//   console.log(`NOW LISTENING ON PORT ${PORT}`);
// });

server.listen(PORT, function () {
  console.log(`now running on port ${PORT}`);
});

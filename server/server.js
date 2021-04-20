const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors = require("cors");
require("./Users");
app.use(bodyParser.json());
app.use(cors());

const Users = mongoose.model("UserData");
const mongouri =
  "mongodb+srv://app:a4ExWFX2369X1VkW@cluster0.9on1s.mongodb.net/BankingApp?retryWrites=true&w=majority";

mongoose.connect(mongouri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to mongo");
});
mongoose.connection.on("error", (err) => {
  console.log("Error:", err);
});

app.get("/", (req, res) => {
  Users.find({})
    .then((data) => res.send(data))
    .catch((err) => console.log(err));
});

app.post("/send", (req, res) => {
  const UsersD = new Users({
    name: req.body.name,
    email: req.body.email,
    Current_Bal: req.body.Current_Bal,
  });
  UsersD.save()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => console.log(err));
});
app.post("/update", (req, res) => {
  Users.findByIdAndUpdate(req.body.id, {
    Current_Bal: req.body.Current_Bal,
  })
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => console.log(err));
});

app.listen(3000, () => {
  console.log("server running");
});

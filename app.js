require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const port = process.env.PORT || 4000;

mongoose.connect(
  `mongodb+srv://authjs:Abc123@cluster0-qjyit.mongodb.net/test?retryWrites=true&w=majority`,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const userRouter = require("./routes/user.route");
const dataRouter = require("./routes/data.route");

const app = express();
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Success connect to database");
});

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", userRouter);
app.use("/data", dataRouter);

app.listen(port, () => {
  console.log(`Server ready at http://localhost:${port}`);
});

require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const auth = require("./middleware/auth");
const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const authRoute = require('./route/auth')

app.get("/welcome", auth, (req, res) => {
  console.log(req)
  res.status(200).send("Welcome 🙌 ");
});

app.use('/api', authRoute)

app.listen(process.env.PORT || "3001", () => {
  console.log(`Server running on port 3000`);
});

module.exports = app;


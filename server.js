const express = require("express");
const db = require("./config/db");

const app = express();

app.use(express.json({ extended: false }));
db();

//routes set-up
app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));
app.use("/api/items", require("./routes/items"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

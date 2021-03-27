const express = require("express");
const db = require("./config/db");
const path = require("path");

const app = express();

db();
app.use(express.json({ extended: false }));

//routes set-up
app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));
app.use("/api/items", require("./routes/items"));
app.use("/api/cart", require("./routes/cart"));
app.use("/api/history", require("./routes/history"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

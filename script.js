require("dotenv").config();
const express = require("express");
const app = express();

const bookRoutes = require("./src/routes/bookRoutes");
const connectDB = require("./config/db");

const port = 2000;

app.use(express.json());
app.use("/books", bookRoutes);

connectDB();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

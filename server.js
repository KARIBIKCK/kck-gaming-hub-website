const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("."));

app.listen(PORT, "0.0.0.0", () => {
  console.log(`KCK Gaming Hub server is running on http://localhost:${PORT}`);
});
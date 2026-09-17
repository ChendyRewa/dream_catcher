import "dotenv/config";
import express from "express";

console.log("the node environment called is like", process.env.NODE_ENV);

const app = express();

if (process.env.NODE_ENV === "production") {
  console.log("the node environment is production");
}

if (process.env.NODE_ENV != "production") {
  console.log("the node environment is not production");
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

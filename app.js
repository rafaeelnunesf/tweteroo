import express, { json } from "express";

const app = express();
app.use(json());

const users = [];

app.post("/sign-up", (req, res) => {
  users.push(req.body);
  res.send("OK");
});

app.listen(5000, () => {
  console.log("Servidor rodando...");
});

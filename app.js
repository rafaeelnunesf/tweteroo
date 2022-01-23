import express, { json } from "express";
import cors from "cors";
import validURL from "./validURL.js";

const app = express();
app.use(json());
app.use(cors());

const users = [
  {
    username: "bobesponja",
    avatar:
      "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
  },
];

const tweets = [
  {
    username: "bobesponja",
    avatar:
      "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
    tweet: "eu amo o hub",
  },
];

app.post("/sign-up", (req, res) => {
  users.push(req.body);
  if (
    req.body.username === undefined ||
    req.body.username === "" ||
    req.body.avatar === undefined ||
    req.body.avatar === ""
  ) {
    res.sendStatus(400);
    return;
  }
  if (validURL(req.body.avatar)) {
    res.status(201);
    res.send("OK");
  } else {
    res.status(400);
    res.send("Insira uma url válida");
  }
});

app.post("/tweets", (req, res) => {
  const tweet = req.body;
  const username = req.headers.user;
  if (
    username === undefined ||
    username === "" ||
    tweet.tweet === undefined ||
    tweet.tweet === ""
  ) {
    res.status(400);
    res.send("Todos os campos são obrigatórios!");
    return;
  }
  if (users.find((user) => user.username === username) === undefined) {
    res.status(400);
    res.send("Usuário não cadastrado");
  } else {
    tweet.avatar = users.find((user) => user.username === username).avatar;
    tweet.username = username;

    tweets.push(tweet);

    res.status(201);
    res.send(tweet);
  }
});

app.get("/tweets", (req, res) => {
  const page = req.query.page;
  if (page < 1) {
    res.status(400);
    res.send("Informe uma página válida!");
    return;
  }

  tweets.length > 10
    ? res.send(tweets.slice((page - 1) * 10, page * 10))
    : res.send(tweets);
});

app.get("/tweets/:USERNAME", (req, res) => {
  const name = req.params.USERNAME;
  const userTweets = tweets.filter((tweet) => tweet.username === name);

  if (userTweets.length === 0) {
    res.status(400);
    res.send("Usuário não cadastrado");
  } else {
    res.send(userTweets);
  }
});

app.listen(5000, () => {
  console.log("Servidor rodando...");
});

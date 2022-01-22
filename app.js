import express, { json } from "express";
import cors from "cors";

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
  res.send("OK");
});
app.post("/tweets", (req, res) => {
  const tweet = req.body;
  if (
    tweet.username === undefined ||
    tweet.username === "" ||
    tweet.tweet === undefined ||
    tweet.tweet === ""
  ) {
    res.send("Todos os campos são obrigatórios!");
    return;
  }
  if (users.find((user) => user.username === req.body.username) === undefined) {
    res.sendStatus(400);
  } else {
    tweet.avatar = users.find(
      (user) => user.username === req.body.username
    ).avatar;
    tweets.push(tweet);
    res.send("OK");
  }
});

app.get("/tweets", (req, res) => {
  let lastTweets;
  tweets.length > 10 ? (lastTweets = tweets.slice(-10)) : (lastTweets = tweets);
  res.send(lastTweets);
});

app.listen(5000, () => {
  console.log("Servidor rodando...");
});

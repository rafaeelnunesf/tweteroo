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
function validURL(str) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  console.log(typeof pattern);
  return !!pattern.test(str);
}
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
  if (
    tweet.username === undefined ||
    tweet.username === "" ||
    tweet.tweet === undefined ||
    tweet.tweet === ""
  ) {
    res.status(400);
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
    res.status(201);
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

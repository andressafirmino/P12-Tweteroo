import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const nickname = [];
const arrayTweets = [];
const renderTweets = [];

app.post("/sign-up", (req, res) => {

    nickname.push({
        username: req.body.username,
        avatar: req.body.avatar
    })
    res.send('OK');

})

app.post("/tweets", (req, res) => {
    for (let i = 0; i < nickname.length; i++) {
        if (req.body.username === nickname[i].username) {
            if (arrayTweets.length === 10) {
                arrayTweets.shift()
                arrayTweets.push({
                    username: req.body.username,
                    tweet: req.body.tweet
                })
                res.send('OK');
            } else {
                arrayTweets.push({
                    username: req.body.username,
                    tweet: req.body.tweet
                })
                res.send('OK');
            }
        }
    }
    res.send('UNAUTHORIZED');
})


app.get("/tweets", (req, res) => {
    for(let i = 0; i < nickname.length; i++) {
        for(let j = 0; j < arrayTweets.length; j++) {
            if(nickname[i].username === arrayTweets[j].username) {
                renderTweets.push({
                    username: nickname[i].username,
                    avatar: nickname[i].avatar,
                    tweet: arrayTweets[j].tweet
                })
            }
        }
    }
    res.send(renderTweets);
})

const PORT = 5000;
app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}...`));


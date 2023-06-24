import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const nickname = [];
const arrayTweets = [];
const renderTweets = [];

app.post("/sign-up", (req, res) => {

    const { username, avatar } = req.body;

    if (!username || !avatar) {
        return res.status(400).send('Todos os campos são obrigatórios!');
    }
    nickname.push({
        username: username,
        avatar: avatar
    })
    res.status(201).send('OK');
})

app.post("/tweets", (req, res) => {

    const { username, tweet } = req.body;

    if (!username || !tweet) {
        return res.status(400).send('Todos os campos são obrigatórios!');
    } 
        for (let i = 0; i < nickname.length; i++) {
            if (username === nickname[i].username) {
                if (arrayTweets.length === 10) {
                    arrayTweets.shift()
                    arrayTweets.push({
                        username: username,
                        tweet: tweet
                    })
                    return res.status(201).send('OK');
                } else {
                    arrayTweets.push({
                        username: username,
                        tweet: tweet
                    })
                    return res.status(201).send('OK');
                }
            }
        
        res.status(401).send('UNAUTHORIZED');
    }
})


app.get("/tweets", (req, res) => {

    for (let i = 0; i < nickname.length; i++) {
        for (let j = 0; j < arrayTweets.length; j++) {
            if (nickname[i].username === arrayTweets[j].username) {
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


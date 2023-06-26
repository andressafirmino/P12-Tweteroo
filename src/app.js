import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const nickname = [];
const arrayTweets = [];
const renderTweets = [];
const userTweets = [];
const pageTweets = [];

app.post("/sign-up", (req, res) => {

    const { username, avatar } = req.body;

    if (!username || !avatar || typeof(username) !== "string" || typeof(avatar) !== "string") {
        return res.status(400).send('Todos os campos são obrigatórios!');
    }
    nickname.push({
        username: username,
        avatar: avatar
    })
    res.status(201).send('OK');
})

app.post("/tweets", (req, res) => {

    const { tweet } = req.body;
    const {user} = req.headers;
    console.log(user);

    if (!user || !tweet || typeof(tweet) !== "string") {
        return res.status(400).send('Todos os campos são obrigatórios!');
    }
    for (let i = 0; i < nickname.length; i++) {
        if (user === nickname[i].username) {
            // if (arrayTweets.length === 10) {
            //     arrayTweets.shift()
            //     arrayTweets.push({
            //         username: user,
            //         tweet: tweet
            //     })
            //     return res.status(201).send('OK');
            //} 
             {
                arrayTweets.push({
                    username: user,
                    tweet: tweet
                })
                return res.status(201).send('OK');
            }
        }
    }
    res.status(401).send('UNAUTHORIZED');
})


app.get("/tweets", (req, res) => {

    const {page} = req.query;
    arrayTweets.reverse();

    if(page) {
        let position = page*10;        
        renderTweets = arrayTweets.slice(position - 10, position);
        for (let i = 0; i < nickname.length; i++) {
            for (let j = 0; j < arrayTweets.length; j++) {
                if (nickname[i].username === arrayTweets[j].username) {
                    pageTweets.push({
                        username: nickname[i].username,
                        avatar: nickname[i].avatar,
                        tweet: arrayTweets[j].tweet
                    })
                }
            }
        }
        return res.send(pageTweets);
    }
    renderTweets = arrayTweets.slice(0, 10);
    for (let i = 0; i < nickname.length; i++) {
        for (let j = 0; j < arrayTweets.length; j++) {
            if (nickname[i].username === arrayTweets[j].username) {
                pageTweets.push({
                    username: nickname[i].username,
                    avatar: nickname[i].avatar,
                    tweet: arrayTweets[j].tweet
                })
            }
        }
    }
    res.send(pageTweets);
})

app.get("/tweets/:USERNAME", (req, res) => {
    const {USERNAME} = req.params;
    console.log(USERNAME);
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
    userTweets = renderTweets.filter( userT => userT.username === USERNAME);
    console.log(renderTweets);
    console.log(userTweets);
    res.status(200).send(userTweets);
})

const PORT = 5000;
app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}...`));


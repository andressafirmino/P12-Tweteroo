import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const nickname = [];

app.post("/sign-up", (req, res) => {
    nickname.push({
        username: req.body.username, 
        avatar: req.body.avatar
    })
    res.send('OK');
   
})



app.get("/tweets", (request, response) => {
    response.send('foi');
})

const PORT = 5000;
app.listen(PORT, () => console.log(`O servidor está rodando na porta ${PORT}...`));


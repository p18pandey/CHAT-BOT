const OpenAI = require("openai");
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001;

const openai = new OpenAI({
    apiKey: process.env.API_KEY,  // Use your API key here
    organization: process.env.ORG_KEY,
});

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());



app.post("/", async (req, res) => {
    const { message } = req.body;

    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ "role": "user", "content": message }],
        max_tokens: 100,
    });
    // console.log(response.choices[0].message.content);

    if (response.choices[0].message) {
        res.json({ message: response.choices[0].message.content });
    }
});



app.listen(port, () => console.log("Example app is listening at port " + port));


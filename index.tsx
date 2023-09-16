const OpenAI = require("openai");
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");      // requiring packages

dotenv.config();
const app = express();
const port = 3001;

const openai = new OpenAI({
  apiKey: process.env.API_KEY,   // Use your API key here
  organization: process.env.ORG_KEY,
});

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');    // testing server
});

app.post("/" , async(req ,res ) =>{
    const {message} = req.body;   // input message from user
    
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": message}],  // using openai model
        max_tokens:100,
      });
      console.log(response.choices[0].message.content);    // testing response from api
      console.log(response.choices[0]);
    if(response.choices[0].message)
    {
        res.json({message: response.choices[0].message.content});   // sending message to chat component 
    }
});

app.listen(port, () => console.log("Example app is listening at port " + port));  // server





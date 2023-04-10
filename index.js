const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;


const { Configuration, OpenAIApi } = require('openai');
const config = new Configuration({
    apiKey: apiKey
});
const openai = new OpenAIApi(config);

const port = 8080;
const app = express();
app.use(bodyParser.json());
app.use(cors());


//api
app.post('/chat', async (req, res) => {

    const { prompt } = req.body;
    const completion = await openai.createCompletion({
        prompt: prompt,
        model: 'text-davinci-003',
        max_tokens: 512,
        temperature: 0,
    });

    res.send(completion.data.choices[0].text);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})
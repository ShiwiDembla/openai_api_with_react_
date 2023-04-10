const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;


// openai SDK configuration and initialization
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
    // the api is async, so that the response can be sent after the completion is created
    // prompt will be accessed from the api request body
    const { prompt } = req.body;
    const completion = await openai.createCompletion({
        prompt: prompt,
        model: 'text-davinci-003',
        // tokens are the number of words to be generated
        max_tokens: 512,
        // temperature is the randomness of the response
        temperature: 0.5,
    });

    res.send(completion.data.choices[0].text);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})
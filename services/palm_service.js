const axios = require('axios');
const { retieveAccessToken } = require('./auth_token_generator');

async function main(statement) {
    await retieveAccessToken();
    const requestBody = {
        "instances": [
            {
                "context": "",
                "examples": [],
                "messages": [
                    {
                        "author": "user",
                        // "content": `I am going to provide you a statement. You will determing if it's true or false. Then you will return me a JSON with 3 fields. First if the statement is true or false in string format, second if it's false then what is closest correct explanation else null, third if there exists any supporting URL else null. The statement is ${statement}`
                        "content": `I am going to provide you a statement. You will determine the credibility of the statement. Then you will return me a JSON with 3 fields. First the credibility score of the statement in percentage labelled as confidence, second if confidence is less than 50 percent then what is closest correct explanation else null, third if confidence is less than 50 percent then an URL against the statement else null. The statement is ${statement}`
                    },
                ]
            }
        ],
        "parameters": {
            "candidateCount": 1,
            "maxOutputTokens": 256,
            "temperature": 0.2,
            "topP": 0.8,
            "topK": 40
        }
    };

    const response = await axios.post(
        `https://${process.env.API_ENDPOINT}/v1/projects/${process.env.PROJECT_ID}/locations/us-central1/publishers/google/models/${process.env.MODEL_ID}:predict`,
        requestBody, {
        headers: {
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
        }
    }
    );
    return JSON.parse(response.data.predictions[0].candidates[0].content);
}

module.exports = {
    main
}
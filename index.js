// import { config } from "dotenv";
const { config } = require('dotenv');
const { GoogleAuth } = require('google-auth-library');
const https = require('https');
const axios = require('axios');


config({
    path: 'environments/.env'
})
async function retieveAccessToken() {
    const auth = new GoogleAuth({ scopes: 'https://www.googleapis.com/auth/cloud-platform' });
    process.env.ACCESS_TOKEN = await auth.getAccessToken();
}

const requestBody = {
    "instances": [
        {
            "context": "",
            "examples": [],
            "messages": [
                {
                    "author": "user",
                    // "content": `I am going to provide you a sentence. You will tell me if it\'s true or false in 1 word. You will also provide me a supportive article link if available. The sentence is \\"Chandrayan 3 was made by Lord Hanuman\\"`
                    "content": `I am going to provide you a statement. You will determing if it's true or false. Then you will return me a JSON with 3 fields. First if the statement is true or false in string format, second if it's false then what is closest correct explanation else null, third if there exists any supporting URL else null. The statement is \\ROCOSMOS was built by ISRO\\"`
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


async function main() {
    await retieveAccessToken();
    // const options = {
    //     method: "POST",
    //     headers: {
    //         "Authorization": `Bearer ${process.env.ACCESS_TOKEN}`,
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(requestBody)
    // };

    // console.log(options);



    const response = await axios.post(
        `https://${process.env.API_ENDPOINT}/v1/projects/${process.env.PROJECT_ID}/locations/us-central1/publishers/google/models/${process.env.MODEL_ID}:predict`,
        requestBody, {
        headers: {
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
        }
    }
    );

    console.log(JSON.parse(response.data.predictions[0].candidates[0].content));



}

main();
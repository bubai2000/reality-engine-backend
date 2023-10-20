const { GoogleAuth } = require('google-auth-library');

async function retieveAccessToken() {
    const auth = new GoogleAuth({ scopes: 'https://www.googleapis.com/auth/cloud-platform' });
    process.env.ACCESS_TOKEN = await auth.getAccessToken();
}

module.exports = { retieveAccessToken };
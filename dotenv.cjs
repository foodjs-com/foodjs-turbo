const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

function calcPath(relativePath) {
    return path.join(__dirname, relativePath);
}

export const envConfig = dotenv.parse(fs.readFileSync(calcPath('./.env')));

// console.log('envConfig');
// console.log(JSON.stringify(envConfig, null, 2));

const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

function calcPath(relativePath) {
    return path.join(__dirname, relativePath);
}

const envConfig = dotenv.parse(fs.readFileSync(calcPath('./.env')));
module.exports = { envConfig };

// console.log('envConfig');
// console.log(JSON.stringify(envConfig, null, 2));

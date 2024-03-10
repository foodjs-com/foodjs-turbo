const { envConfig } = require('../../dotenv.cjs');

module.exports = {
    apps: [
        {
            name: "auth-astro-svelte",
            script: "./dist/server/entry.mjs",
            // cron_restart: "0 */6 * * *", // every 6 hours
            env: Object.assign({}, envConfig, {
                "HOST": "0.0.0.0",
                "PORT": "4322"
            }),
        },
    ],
}
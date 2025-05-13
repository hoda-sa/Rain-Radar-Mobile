// app.config.js
import 'dotenv/config';

// Import the existing configuration from app.json
const appJson = require('./app.json');

// Extend the configuration with environment variables
export default {
    ...appJson.expo,
    extra: {
        openWeatherApiKey: process.env.OPEN_WEATHER_API_KEY || "",

    },
};
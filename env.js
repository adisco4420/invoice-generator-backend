
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    JWT_SECRET: process.env.JWT_SECRET,
    MONGODB_URI: process.env.MONGODB_URI,
    SENDGRID_KEY: process.env.SENDGRID_KEY,
    BASEURL: process.env.BASEURL
}
const dotenv = require("dotenv");
const strapi = require("strapi");

console.log("Running in", process.env.NODE_ENV);

dotenv.config();

strapi().start();

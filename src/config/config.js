require("dotenv").config();
console.log(`Environment: ${process.env.NODE_ENV}`);

const env = process.env.NODE_ENV;

const db = process.env[`DB_${env}`];
const db_username = process.env[`DB_USERNAME_${env}`];
const db_password = process.env[`DB_PASSWORD_${env}`];
const db_host = process.env[`DB_HOST_${env}`];

module.exports = {
  username: db_username,
  password: db_password,
  database: db,
  host: db_host,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

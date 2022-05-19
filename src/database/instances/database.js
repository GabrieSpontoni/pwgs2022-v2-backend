const { Sequelize } = require("sequelize");
require("dotenv").config();

console.log(`Environment: ${process.env.NODE_ENV}`);

const env = process.env.NODE_ENV;

const db = process.env[`DB_${env}`];
const db_username = process.env[`DB_USERNAME_${env}`];
const db_password = process.env[`DB_PASSWORD_${env}`];
const db_host = process.env[`DB_HOST_${env}`];
const db_port = process.env[`DB_PORT_${env}`];

const sequelize = new Sequelize(db, db_username, db_password, {
  host: db_host,
  dialect: "postgres",
  port: db_port,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

// const testConnection = async (res) => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection with database has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// };

// testConnection();

module.exports = sequelize;

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

const createTableQuery = `
CREATE TABLE IF NOT EXISTS recipes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    ingredients VARCHAR(255) NOT NULL,
    instructions VARCHAR(255) NOT NULL
);
`;

const createRecipesTable = async () => {
    try {
        await pool.query(createTableQuery);
        console.log('table created successfully');
    } catch (error) {
        console.error('error creating table', error);
    }
};

createRecipesTable();


module.exports = {
    query: (text, params, callback) => {
      console.log("QUERY:", text, params || "");
      return pool.query(text, params, callback);
    },
  };
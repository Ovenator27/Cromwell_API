const format = require("pg-format");
const db = require("../connection");

const seed = ({ userData }) => {
  return db
    .query(`DROP TABLE IF EXISTS users`)
    .then(() => {
      return db.query(`
            CREATE TABLE users (
            user_id SERIAL PRIMARY KEY,
            username VARCHAR NOT NULL,
            email VARCHAR NOT NULL,
            password VARCHAR NOT NULL); `);
    })
    .then(() => {
      const insertUsersQueryStr = format(
        `INSERT INTO users ( username, email, password ) VALUES %L;`,
        userData.map(({ username, email, password }) => [
          username,
          email,
          password,
        ])
      );
      return db.query(insertUsersQueryStr);
    });
};

module.exports = seed;

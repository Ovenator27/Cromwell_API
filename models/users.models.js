const db = require("../db/connection");
const bcrypt = require("bcrypt");

exports.insertUser = async (body) => {
  const { username, email, password } = body;
  if (!email) {
    return Promise.reject({
      status: 400,
      msg: "Bad Request",
    });
  }
  const lowerCaseEmail = email.toLowerCase();
  const hash = await bcrypt.hash(password, 10);
  return db
    .query(`SELECT * FROM users where email = $1;`, [lowerCaseEmail])
    .then(({ rows }) => {
      if (rows[0]) {
        return Promise.reject({
          status: 409,
          msg: "User Already Exists",
        });
      }
      return db.query(
        `INSERT INTO users (username, email, password)
            VALUES ($1, $2, $3)
            RETURNING *;`,
        [username, lowerCaseEmail, hash]
      );
    })
    .then((user) => user.rows[0]);
};

exports.validateUser = async (body) => {
  const { email, password } = body;
  const hash = await bcrypt.hash(password, 10)
  if (email && password) {
    return db
      .query(`SELECT * FROM users WHERE email = $1`, [email])
      .then(({ rows }) => {
        const user = rows[0];
        if (!user) {
          return Promise.reject({
            status: 404,
            msg: "User not found",
          });
        }
        const passwordMatch = bcrypt.compare(password, rows[0].password)
        return Promise.all([user, passwordMatch])
      }).then(([user, passwordMatch]) => {
        if (!passwordMatch) {
          return Promise.reject({
            status: 401,
            msg: "Unauthorised",
          });
        }
        return user
      });
  }
};

exports.selectUserById = (user_id) => {
  return db
    .query(`SELECT * FROM users WHERE user_id = $1;`, [user_id])
    .then(({ rows }) => {
      const user = rows[0];

      if (!user) {
        return Promise.reject({
          status: 404,
          msg: "User Not Found",
        });
      }
      return user;
    });
};

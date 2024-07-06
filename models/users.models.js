const db = require("../db/connection");

exports.insertUser = (body) => {
  const { username, email, password } = body;
  return db
    .query(`SELECT * FROM users where email = $1;`, [email])
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
        [username, email, password]
      );
    })
    .then((user) => user.rows[0]);
};

exports.validateUser = (body) => {
  const { email, password } = body;
  if (email && password) {
    return db
      .query(`SELECT * FROM users WHERE email = $1 AND password = $2;`, [
        email,
        password,
      ])
      .then(({ rows }) => {
        const user = rows[0];
        if (!user) {
          return Promise.reject({
            status: 401,
            msg: "Unauthorised",
          });
        }
        return user;
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

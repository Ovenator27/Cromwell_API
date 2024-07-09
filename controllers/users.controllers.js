const {
  selectUserById,
  insertUser,
  validateUser,
} = require("../models/users.models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.postUser = (req, res, next) => {
  const { body } = req;
  insertUser(body)
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch(next);
};

exports.loginUser = (req, res, next) => {
  const { body } = req;
  validateUser(body)
    .then((user) => {
      const accessToken = jwt.sign(
        { username: user.username },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.status(200).send({ user_id: user.user_id, accessToken });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUserById = (req, res, next) => {
  const { user_id } = req.params;
  selectUserById(user_id)
    .then((user) => {
      res.status(200).send({ user });
    })
    .catch((err) => {
      next(err);
    });
};

const { getUserById, postUser, loginUser } = require("../controllers/users.controllers");

const usersRouter = require("express").Router();

usersRouter.route("/register").post(postUser)
usersRouter.route("/login").post(loginUser)
usersRouter.route("/:user_id").get(getUserById)

module.exports = usersRouter
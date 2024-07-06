const usersRouter = require("./users.router")

const apiRouter = require("express").Router()

apiRouter.use("/users", usersRouter)

module.exports = apiRouter
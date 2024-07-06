const express = require("express");
const apiRouter = require("./routers/api.router");
const { handleCustomErrors, handlePsqlErrors } = require("./controllers/errors.controllers");
const app = express();

app.use(express.json());

app.use("/api", apiRouter)

app.all("*", (req, res) => {
    res.status(404).send({msg: "Path Not Found"})
})

app.use(handleCustomErrors)
app.use(handlePsqlErrors)

module.exports = app;
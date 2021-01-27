const express = require("express")
const app = express()

app.get("/", (req, res) => {
  res.status(200).send("hello word")
})

module.exports = app
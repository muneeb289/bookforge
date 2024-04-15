const express = require("express")
const bookrouter = express.Router()
const bookControllers = require('../contorolers/bookControllers')

// router.get("/", bookControllers)


bookrouter.post("/addBook", bookControllers.addBook)
bookrouter.get("/getAllBooks", bookControllers.getAllBooks)
bookrouter.get("/getOneBook/:id", bookControllers.getOneBook)
bookrouter.delete("/deleteBook/:id", bookControllers.deleteBook)
bookrouter.patch("/editBook/:id", bookControllers.editBook)



module.exports = bookrouter
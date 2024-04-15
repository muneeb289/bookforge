const express = require("express")
const userRouter = express.Router()
const userControllers = require('../contorolers/userControllers')


userRouter.post("/registerUser",userControllers.resigterUser)
userRouter.post("/login",userControllers.login)
userRouter.get("/verifyUser",userControllers.verifyUser)
userRouter.get("/logout",userControllers.logout)


module.exports= userRouter
//require packages:
const express = require("express")
const process = require("process");
const dotenv = require("dotenv");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const sequelize = require("./models");
const bookRouter = require('./routes/BookRoutes')
const userRouter = require('./routes/UserRoutes')
const bodyParser = require("body-parser");
// const Author = require("./models/authorModel");
// require("./models/index")

// packages configration 
dotenv.config();
const PORT = process.env.PORT;
const app = express()
app.use(cors(
    {
        // origin: "http://localhost:3000",
        origin: "https://muneeb289.netlify.app",
        methods: ["GET", "POST", "DELETE","PATCH"],
    credentials: true
    }
))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use("/book", bookRouter)
app.use("/user", userRouter)





// sequelize.sync({ alter: true })
// Author.sync({ alter: true })



app.listen(PORT, () => console.log(`server is runnig on port ${PORT}`))
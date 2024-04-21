const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const process = require("process");
require('dotenv').config();



const resigterUser = async (req, res) => {
    email = req.body.User_Email
    password = req.body.User_Password
    try {
        const foundUser = await userModel.findOne(
            {
                where: { User_Email: email }
            }
        );
        if (foundUser === null) {
            const HashPasswprd = await bcrypt.hash(password, 10)
            const registeredUser = await userModel.create(
                {
                    User_Email: email,
                    User_Password_Hash: HashPasswprd
                }
            );
            res.status(201).json({ msg: `User successfully registerd with ${registeredUser.User_Email}, Please log in!.` })
        } else {
            res.status(500).json({ msg: `User alreafy registerd with ${email}, Please log in!.` })
        }
    } catch (error) {
        res.status(500).json({ err: 'failed by muneeb', msg: error.message })
    }

}

const login = async (req, res) => {
    email = req.body.User_Email
    password = req.body.User_Password

    try {
        const foundUser = await userModel.findOne(
            {
                where: {
                    User_Email: email
                }
            }
        );
        if (foundUser === null) {
            return res.send({ status: false, msg: "User not found" })
        }
        const passwordvalid = await bcrypt.compare(password, foundUser.User_Password_Hash)
        if (passwordvalid === false) {
            return res.json({ status: false, msg: "Invalid credentials!" })
        }
        const token = jwt.sign({ id: foundUser.User_ID }, process.env.JWT_SECRETKEY, { expiresIn: '1h' })
        // res.cookie('token', token, { httpOnly: true }, { expire: 10000 + Date.now() });
        res.cookies('token', token, { expires: new Date(Date.now() + 24 * 60 * 60 * 1000) });
        // res.cookie('token', token, { expires: '1d' });
        res.status(200).json({ status: true })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
};

const verifyUser = async (req, res) => {
    try {
        const token = req.cookies.token;
        // console.log(`line 66 ${token}`)
        if (!token) {
            // console.log(`line 68 ${token}`)
            return res.json({ status: false, message: "no token" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
        // console.log(decoded)
        return res.json({ status: true, message: "yes token" });
        // next()
    } catch (error) {
        // console.log(error)
        return res.json({ status: false, message: "invalid token" });

    }
}

const logout = async (req, res) => {
    // console.log('log from back end /user/logout')
    res.clearCookie('token')
    res.json({ status: true, })
}



module.exports = {
    resigterUser,
    login,
    verifyUser,
    logout

}
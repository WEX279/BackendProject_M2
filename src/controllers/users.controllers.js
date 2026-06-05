const Users = require("../models/users.models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function registerUser(req, res) {
    try {   
        const {email, password} = req.body
        const existEmail = await Users.validateEmail(email)

        if (!email){
            return res.status(409).json({error: "this email has already been registered"})
        }
        const passwordHashed = await bcrypt.hash(password, 10)

        const newUser = await Users.createUser({
            email,
            password: passwordHashed
        });

        res.status(201).json({
            id:newUser._id,
            email: newUser.email
        })
    } catch (error) {
        console.error(res.status(500).json({message: "Internal server error"}))
}} 

async function loginUser(req, res){
    try {
        const {email, password} = req.body;

        const user = await Users.findUserbyEmail(email)

            if(!user){
                return res.status(401).json({error: "Invalid credentials"})
            }

        const match = await bcrypt.compare(password, user.password)
            
            if(!match){
                return res.status(401).json({error: "Invalid credentials"})
            }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: "1h",
            })

        res.status(200).json({
            message: "correct login",
            token
        })

    } catch (error) {
        res.status(500).json({message: "Login error"})
        console.log(error)
    }
}
module.exports = {registerUser, loginUser}
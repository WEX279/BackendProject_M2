const Users = require("../models/users.models")
const bcrypt = require("bcrypt")

async function existingMail(req, res) {
    try {   
    
        const {email, password} = req.body
        const mail = await Users.findOne({email: email})

        if (mail){
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

module.exports = {
    existingMail
}
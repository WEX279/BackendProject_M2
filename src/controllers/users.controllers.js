const Users = require("../models/users.models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function registerUser(req, res) {
    try {   
        const {email, password} = req.body

        const existEmail = await Users.validateEmail(email)

        if (existEmail){
            return res.status(409).json({error: "this email has already been registered"})
        }

        const passwordHashed = await bcrypt.hash(password, 10)

        const newUser = await Users.createUser({
            email,
            password: passwordHashed
        });

        res.status(201).json({
            id: newUser._id,
            email: newUser.email
        })
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
}
}

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

async function listUsers(req, res) {
  try {
    const users = await Users.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error al listar notas:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

function whoami(req, res) {
    try {
        const authHeader = req.headers.authorization
            if(!authHeader){
                return res.status(401).json({message: "No token found"})
            }
        
        const token = authHeader.split("")[1]

        const data = jwt.verify(token, process.env.JWT_SECRET)

        res.status(200).json({message:"valid token", id: data._id})
    } catch (error) {
        res.status(401).json({"token not found": error})
    }
}

module.exports = {registerUser, loginUser, whoami, listUsers}
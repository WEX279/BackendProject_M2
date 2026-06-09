import * as Users from "../models/users.models.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export async function loginUser(req, res){
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
    }
}

export async function registerUser(req, res) {
    try {   
        console.log("controllers ok")
        const {email, password} = req.body

        const existEmail = await Users.findUserbyEmail(email)

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
        
        // await loginUser()
        // return res.status(200).json({message: "user registered and loged in!"})
        
    } catch (error) {
        res.status(500).json({message: "Internal server error"})
    }
}

export async function getProfile(req, res) {
    try {
        const userId = req.user.id
        
        const userFound = await Users.getUserById(userId)
        
        return res.status(200).json({message: "user found correctly", userFinded: userFound})
        
    } catch (error) {
        res.status(500).json({message: "internal server error"})
    }
}

export async function logOut(req, res) {
    try {

        const {email, password} = req.body;
        
        const user = await Users.findUserbyEmail(email)

            if(!user){
                return res.status(404).json({message: "account not found"})
            }
            
        const match = await bcrypt.compare(password, user.password)
    
            if(!match){
                return res.status(400).json({message: "invalid credentials"})
            }

        const authHeader = req.headers.authorization;
            if(!authHeader || !authHeader.startsWith("Bearer ")){
                return res.status(401).json({message: "token not found or invalid format"})
            }

        const token = "";


            if(!token){
                res.status(200).json({message: "Loged out!"})
            }
            console.log(token)
    } catch (error) {
        res.status(500).json({message: "internal server error"})
    }
}


export async function listUsers(req, res) {
    try {
        const users = await Users.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error al listar notas:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

export async function deleteUser(req, res) {
    try {
        const {email, password} = req.body;

        const user = await Users.findUserbyEmail(email)

        if (!user){
            return res.status(401).json({error: "Invalid credentials"})
        }

        const match = await bcrypt.compare(password, user.password)
            
            if(!match){
                return res.status(401).json({error: "Invalid credentials"})
            }

        await Users.banUser(email)
        
    res.status(200).json({message: "Your account has been deleted correctly!"})

    } catch (error) {
        res.status(500).json({error: "internal server error"})    
    }    
}

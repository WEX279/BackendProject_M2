import { createUser, getUserById, findUserbyEmail, updateProfile, getAllUsers, banUser } from "../models/users.models.js"
import { Manga, getAllManga, getMangaById, createManga, getMangabyName, updateManga, deleteManga } from "../models/manga.models.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export async function loginUser(req, res){
    try {
        const {email, password} = req.body;

        const user = await findUserbyEmail(email)

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
        res.status(500).json({message: "Login error", error: error.message})
    }
}

export async function registerUser(req, res) {
    try {   
        const {email, password, confirmPassword} = req.body
        
        const existEmail = await findUserbyEmail(email)
        
        if (existEmail){
            return res.status(409).json({error: "this email has already been registered"})
        }
        if(password !== confirmPassword){
            return res.stsatus(401).json({error: "check crededntials"})
        }
        const passwordHashed = await bcrypt.hash(password, 10)
        
        const newUser = await createUser({
            email,
            password: passwordHashed
        });
        
        
        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {
            expiresIn: "1h",
            })

        res.status(201).json({
            id: newUser._id,
            email: newUser.email,
            favManga: newUser.favManga,
            token: token,
            message: "user registered and loged in!"
        })
        
    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message})
    }
}

export async function logOut(req, res) {
    try {

        const {email, password} = req.body;
        
        const user = await findUserbyEmail(email)

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
        res.status(500).json({message: "internal server error", error: error.message})
    }
}

export async function getProfile(req, res) {
    try {
        const userId = req.user.id
        
        const userFound = await getUserById(userId)
        
        return res.status(200).json({message: "user found correctly", userFinded: userFound})
        
    } catch (error) {
        res.status(500).json({message: "internal server error", error: error.message})
    }
}

export async function listUsers(req, res) {
    try {
        const users = await getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error al listar notas:", error);
        res.status(500).json({ error: "Error interno del servidor", error: error.message});
    }
}

export async function deleteUser(req, res) {
    try {
        const {email, password} = req.body;

        const user = await findUserbyEmail(email)

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
        res.status(500).json({error: "internal server error", error: error.message})    
    }    
}

// ----------------------------------------------------------------------------

export async function getManga(req, res) {
    try{
        const {name} = req.body

        const manga = await getMangabyName(name)

        if(!manga){
            return res.status(400).json({message: "manga not found"})
        }
        res.status(200).json(manga)
    } catch(error) {
        console.error("Something happened trying to find your manga...", error)
        res.status(500).json({error: "Internal server error", error: error.message})
    }
}

export async function addToFavs(req, res) {
    try {
        const { email, name } = req.body;

        const user = await findUserbyEmail(email)
        const manga = await getMangabyName(name)
        if(!manga || !user){
            return res.status(400).json({message: "manga or user not found"})
        }

        const updatedProfile = await updateProfile(
            email,
            {
            $addToSet: {
                favManga: manga._id 
                }
            },
            {returnDocument: 'after'}
        )

        return res.status(200).json({updatedProfile, message: "manga added to favs!"})
    }catch (error) {
        res.status(500).json({message: "internal server error", error: error.message})        
    }
}
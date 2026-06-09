const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password:{
        type: String,
        required: true
    }
    },
    {
        timestamps: true,
    },
);

const User = mongoose.model("User", userSchema)

async function createUser(data) {
    const newUser = new User(data)
    return await newUser.save()
}

async function getUserById(id) {
    return await User.findById(id).select("-password")
}

async function findUserbyEmail(email) {
    return await User.findOne({ email: email });
}

async function getAllUsers() {
    return await User.find();
}

async function banUser(email) {
    return await User.findOneAndDelete({ email: email }) 
}
 
module.exports = {
    createUser,
    getUserById,
    findUserbyEmail,
    getAllUsers,
    banUser
}

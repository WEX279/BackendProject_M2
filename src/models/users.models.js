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
    findUserbyEmail,
    getAllUsers,
    banUser
}

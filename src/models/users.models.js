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

async function validateEmail(email) {
    return await User.findOne({ email: email });
}
async function getAllUsers() {
  return await User.find();
}

module.exports = {
    createUser,
    validateEmail,
    getAllUsers
}

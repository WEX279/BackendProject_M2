import mongoose from "mongoose"

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

export const User = mongoose.model("User", userSchema)

export async function createUser(data) {
    const newUser = new User(data)
    return await newUser.save()
    console.log("models ok")
}

export async function getUserById(id) {
    return await User.findById(id).select("-password")
}

export async function findUserbyEmail(email) {
    return await User.findOne({ email: email });
}

export async function getAllUsers() {
    return await User.find();
}

export async function banUser(email) {
    return await User.findOneAndDelete({ email: email }) 
}

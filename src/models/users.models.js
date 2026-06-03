const moongose = require("mongoose")

const usrSchema = new moongose.Schema({
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

const user = moongose.model("User", userSchema)

module.exports={
    user
}
const {body} = require("express-validator")

const deleteUser = [
    body("email")
        .isEmail()
        .withMessage("Invalid mail format"),

    body("password")
        .isStrongPassword()
        .withMessage("Wrong password")
]

module.exports = deleteUser
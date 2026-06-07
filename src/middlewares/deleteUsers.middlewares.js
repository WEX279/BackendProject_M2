const {body} = require("express-validator")

const deleteUser = [
    body("email")
        .isEmail()
        .withMessage("Invalid mail format"),

    body("password")
        .isLength({min:6})
        .withMessage("Wrong password")
]

module.exports = deleteUser
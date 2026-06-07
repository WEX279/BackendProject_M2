const {body} = require("express-validator")

const loginRules = [
    body("email")
        .isEmail()
        .withMessage("Non valid email"),

    body("password")
        // .isStrongPassword() -> preguntar al profe
        .isLength({min:6})
        .withMessage("Wrong password") 
]

module.exports = loginRules
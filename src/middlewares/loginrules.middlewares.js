const {body} = require("express-validator")

const loginRules = [
    body("email")
        .isEmail()
        .withMessage("Non valid email"),

    body("pasword")
        .isStrongPassword()
        .withMessage("Obligatory password")
]

module.exports = loginRules
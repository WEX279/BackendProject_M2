const {body, validationResult} = require("express-validator")

const registerRules = [
    body("email")
        .notEmpty()
        .withMessage("Non valid email")
        .normalizeEmail(),
    
    body("password")
        .notEmpty()
        .isLength({min:6})
        .withMessage("Password must have at least 6 characters")
]

module.exports = registerRules
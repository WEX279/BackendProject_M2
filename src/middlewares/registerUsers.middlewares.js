import {body, validationResult} from "express-validator"

const registerRules = [
    body("email")
    .notEmpty()
    .withMessage("Non valid email")
    .normalizeEmail(),
    
    body("password")
    .notEmpty()
    .isStrongPassword()
    // .isLength({min:6})
    .withMessage("Password is too weak"),
]

export default registerRules
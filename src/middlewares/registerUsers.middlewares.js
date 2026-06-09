import {body, validationResult} from "express-validator"


const registerRules = [
    body("email")
        .notEmpty()
        .withMessage("Non valid email")
        .normalizeEmail(),
    
    body("password")
        .notEmpty()
        // .isStrongPassword()
        .isLength({min:6})
        .withMessage("Password must have at least 6 characters")
]

export default registerRules
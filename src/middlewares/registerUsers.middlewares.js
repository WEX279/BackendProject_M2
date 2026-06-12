import { body } from "express-validator"

const registerRules = [
    body("email")
    .notEmpty()
    .withMessage("Non valid email")
    .normalizeEmail(),
    
    body("password")
    .notEmpty()
    .isStrongPassword()
    .withMessage("Password is too weak"),
]

export default registerRules
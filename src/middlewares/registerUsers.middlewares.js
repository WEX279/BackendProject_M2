import { body } from "express-validator"

const registerRules = [
    body("email")
    .notEmpty()
    .withMessage("Non valid email")
    .normalizeEmail(),
    
    body("password")
    .notEmpty()
    .isLength({max: 20})
    .isStrongPassword()
    .withMessage("Password is too weak"),

    body("confirmPassword")
    .notEmpty()
    .isLength({max: 20})
    .isStrongPassword()
    .withMessage("Check both passwords!"),
]

export default registerRules
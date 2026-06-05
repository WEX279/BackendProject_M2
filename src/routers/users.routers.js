const express = require("express")
const router = express.Router();
const usersControllers = require("../controllers/users.controllers")
const loginRules = require("../middlewares/loginrules.middlewares");
const registerRules = require("../middlewares/users.vallidator");
const validate = require("../middlewares/validate")

router.post(
    "/register",
    registerRules,
    validate,
    usersControllers.registerUser,
);


router.post(
    "/login",
    loginRules,
    usersControllers.loginUser
)

module.exports = router
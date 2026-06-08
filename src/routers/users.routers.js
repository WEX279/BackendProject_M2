const express = require("express")
const router = express.Router();
const usersControllers = require("../controllers/users.controllers.js")
const loginRules = require("../middlewares/loginrules.middlewares.js");
const registerRules = require("../middlewares/registerUsers.vallidator.js");
const verifyToken = require("../middlewares/verifyToken.js")
const validate = require("../middlewares/validate.js")


router.get(
    "/profile",
    verifyToken,
    usersControllers.getProfile,
)

router.get(
    "/",
    usersControllers.listUsers
);

router.post(
    "/register",
    registerRules,
    validate,
    usersControllers.registerUser
);

router.post(
    "/login",
    loginRules,
    validate,
    usersControllers.loginUser
)

router.delete(
    "/delete",
    usersControllers.deleteUser
)

module.exports = router
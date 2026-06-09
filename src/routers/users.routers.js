const express = require("express")
const router = express.Router();
const usersControllers = require("../controllers/users.controllers.js")
const loginRules = require("../middlewares/loginrules.middlewares.js");
const registerRules = require("../middlewares/registerUsers.vallidator.js");
// const match = require("../middlewares/userCheck.middlewares.js")
const verifyToken = require("../middlewares/verifyToken.js")
const validate = require("../middlewares/validate.js")


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

router.get(
    "/profile",
    verifyToken,
    usersControllers.getProfile,
)

router.post(
    "/login",
    loginRules,
    validate,
    usersControllers.loginUser
)

router.post(
    "/logout",
    loginRules,
    validate,
    usersControllers.logOut
)

router.delete(
    "/delete",
    verifyToken,
    usersControllers.deleteUser
)

module.exports = router
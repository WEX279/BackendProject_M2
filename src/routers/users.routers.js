import express from "express"
const router = express.Router()
import * as usersControllers from "../controllers/users.controllers.js"
import loginRules from "../middlewares/loginrules.middlewares.js";
import registerRules from "../middlewares/registerUsers.middlewares.js";
import verifyToken from "../middlewares/verifyToken.js"
import validate from "../middlewares/validate.js"


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

export default router
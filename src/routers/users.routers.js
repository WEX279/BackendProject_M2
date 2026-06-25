import express from "express"
const router = express.Router()
import { loginUser, registerUser, logOut, getProfile, listUsers, deleteUser, getManga, addToFavs } from "../controllers/users.controllers.js"
import loginRules from "../middlewares/loginrules.middlewares.js";
import registerRules from "../middlewares/registerUsers.middlewares.js";
import verifyToken from "../middlewares/verifyToken.js"
import validate from "../middlewares/validate.js"


router.get(
    "/",
    listUsers
);

router.post(
    "/register",
    registerRules,
    validate,
    registerUser
);

router.get(
    "/profile",
    verifyToken,
    getProfile,
)

router.post(
    "/profile/manga",
    validate,
    getManga
)

// router.get(
//     "/profile/favourites",
//     validate,
//     getFavs
// )

router.post(
    "/profile/favourites",
    validate,
    addToFavs
)

// router.delete(
//     "/profile/favourites",
//     validate,
//     
// )

router.post(
    "/login",
    loginRules,
    validate,
    loginUser
)

router.post(
    "/logout",
    loginRules,
    validate,
    logOut
)

router.delete(
    "/delete",
    verifyToken,
    deleteUser
)

export default router
import express from "express"
import { param } from "express-validator";
const router = express.Router()
import { listManga, getMangaId, postManga, putManga, banManga } from "../controllers/manga.controllers.js"
import mangaRules from "../middlewares/mangarules.middlewares.js"
import validate from "../middlewares/validate.js"

router.get("/",
     listManga
    )


router.get("/:id", 
    [
        param("id")
        .isString()
        .withMessage("Write an existing id, please")
    ],
    validate,
    getMangaId
)


router.post("/",
    mangaRules,
    validate,
    postManga
)


router.put("/:id",
    [
        param("id")
        .isString()
        .withMessage("Invalid ID format")
    ],
    validate,
    putManga
)


router.delete("/:id",
    [
        param("id")
        .isString()
        .withMessage("Invalid ID format")
    ],
    validate,
    banManga
)

export default router;
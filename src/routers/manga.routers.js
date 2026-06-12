import express from "express"
import {param} from "express-validator";
const router = express.Router()
import * as mangaController from "../controllers/manga.controllers.js"
import mangaRules from "../middlewares/mangarules.middlewares.js"
import validate from "../middlewares/validate.js"

router.get("/",
     mangaController.listManga
    )


router.get("/:id", 
    [
        param("id")
        .isString()
        .withMessage("Write an existing id, please")
    ],
    validate,
    mangaController.getMangaId
)


router.post("/",
    mangaRules,
    validate,
    mangaController.postManga
)


router.put("/:id",
    [
        param("id")
        .isString()
        .withMessage("Invalid ID format")
    ],
    validate,
    mangaController.putManga
)


router.delete("/:id",
    [
        param("id")
        .isString()
        .withMessage("Invalid ID format")
        ],
    validate,
    mangaController.banManga
)

export default router;
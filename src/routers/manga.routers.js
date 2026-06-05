const express = require("express")
const router = express.Router()
const mangaController = require("../controllers/manga.controllers")
const mangaRules = require("../middlewares/mangarules.middlewares")
const  {param} = require("express-validator");
const validate = require ("../middlewares/validate")

router.get("/", mangaController.listManga)


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

module.exports = router;
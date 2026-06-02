const express = require("express")
const router = express.Router()
const mangaController = require("../controllers/manga.controllers")

router.get("/", mangaController.listManga)
router.get("/:id", mangaController.getManga)
router.post("/", mangaController.postManga)
router.put("/:id", mangaController.putManga)
router.delete("/:id", mangaController.banManga)


module.exports = router;
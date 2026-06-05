const {body} = require("express-validator")

const mangaRules = [
	body("name"),
	body("author"),
	body("release"),
	body("genre")
]

module.exports = mangaRules
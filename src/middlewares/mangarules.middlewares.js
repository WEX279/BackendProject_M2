import {body} from "express-validator"

const mangaRules = [
	body("name"),
	body("author"),
	body("release"),
	body("genre")
]

export default mangaRules
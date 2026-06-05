const mongoose = require("mongoose");

const mangaSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            trim: true, 
            },
        author: {
            type: String,
            require: true,
            trim: true,
            },
        release: {
            type: String || Number,
            require: true,
            trim: true,
            },
        genre: {
            type: String,
            require: true,
            trim: true,
            },
        },
    {
        timestamps: true
    }
)

const Manga = mongoose.model("Manga", mangaSchema)
 
async function getAllManga() {
    return await Manga.find()
}

async function getMangaById(id) {
    return await Manga.findById(id)
}

async function createManga(data) {
    const newManga = new Manga(data)
    return await newManga.save()
}   

async function updateManga(id, data) {
    return await Manga.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
    })
}

async function deleteManga(id){
    return await Manga.findByIdAndDelete(id)
}


module.exports = {
    getAllManga,
    getMangaById,
    createManga,
    updateManga,
    deleteManga
}
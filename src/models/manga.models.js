import mongoose from "mongoose";

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

export const Manga = mongoose.model("Manga", mangaSchema)
 
export async function getAllManga() {
    return await Manga.find()
}

export async function getMangaById(id) {
    return await Manga.findById(id)
}

export async function getMangabyName(name) {
    return await Manga.findOne({name})
}

export async function createManga(data) {
    const newManga = new Manga(data)
    return await newManga.save()
}   

export async function updateManga(id, data) {
    return await Manga.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
    })
}

export async function deleteManga(id){
    return await Manga.findByIdAndDelete(id)
}


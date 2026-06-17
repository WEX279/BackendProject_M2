import { getAllManga, getMangaById, getMangabyName, createManga, updateManga, deleteManga } from "../models/manga.models.js"

export async function listManga(req, res) {
    try{
        const mangas = await getAllManga()
        res.status(200).json(mangas)
    }catch(error){console.error("Something happened trying to add the mangas...", error)
        res.status(500).json({error:"Internal server error", error: error.message})
    }
}

export async function getMangaId(req, res) {
    try{
        const id = req.params.id
        const manga = await getMangaById(id)
        res.status(200).json(manga)
    } catch(error) {
        console.error("Something happened trying to find your manga...", error)
        res.status(500).json({error: "Internal server error", error: error.message})
    }
}

export async function postManga(req, res) {
    try{
        const {name, author, release, genre} = req.body;

        const newManga = await createManga({name, author, release, genre})
        res.status(201).json(newManga)
    }catch(error){
        console.error("Error addig new manga", error)
        res.status(500).json({error: "Internal server error", error: error.message})
    }
}

export async function putManga(req, res) {
    try{
        const id = req.params.id
        const {name, author, release, genre} = req.body;
        const updatedManga = await updateManga(id, {name, author, release, genre})
        res.status(201).json(updatedManga)
    }catch(error){
        console.error("Error updating your manga", error)
        res.status(500).json({error:"Internal server error", error: error.message})
    }
}

export async function banManga(req, res) {
    try{
        const id = req.params.id
        const deletedManga = await deleteManga(id)
        res.status(204).json({message: "You`ve deleted this manga:", deletedManga})
    } catch(error){
        console.error("Your manga has NOT been deleted successfully...", error)
        res.status(500).json({error: "Internal server error", error: error.message})
    }    
}
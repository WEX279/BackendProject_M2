const manga = require("../models/notas.models")

async function listManga(req, res) {
    try{
        const manga = await manga.getAllManga()
         res.status(200).json(manga)
    }catch(error){console.error("Something happened trying to add the mangas...", error)
        res.status(500).json({error:"Internal server error"})
    }
}

async function getManga(req, res) {
    try{
        const id = Number(req.params.id)
        const manga = await manga.getMangaById(id)

        if(!manga){
            return res.status(404).json({error:"Manga not found"})
        }res.json()
    }catch(error){console.error("Something happened trying to find your manga...", error)
        res.status(500).json({error: "Internal server error"})
    }
}

async function postManga(req, res) {
    try{
        // const manga = await manga.createManga()
        const {name, author, release, genre} = req.body;

        if(!name || !author || !release || !genre){
            return res
            .status(404)
            .json({error: "Missing gname, author, release date or genre"})
        }
        
        const NewManga = await manga.createManga(name, author, release, genre);
        res.status(201).json({message: "New manga added successfully"})
    }catch(error){
        console.error("Error addig new manga", error)
        req.status(500).json({error: "Internal server error"})
    }
}

async function putManga(req, res) {
    try{
        const id = Number(req.params.id)
        const {name, author, release, genre} = req.body
        if(!name || !author || ! release || !genre){
            return res.status(400).json({error: "Missing name, author, release date or genre!"})
        } 
        const updated = manga.updateManga(id, {name, author, release, genre}) 
        if (!updated){
            res.status(404).json({error: "Manga not found"})
        }
    }catch(error){
        console.error("Error updating your manga", error)
        res.status(500).json({error:"Internal server error"})
    }
}

async function banManga(req, res) {
    try{
        const id = Number(req.params.id)
        const deleted = await manga.deleteManga(id);
        if (!deleted){
            return res.status(404).json({error: "Id not found"})
        }
        res.json({message: "You`ve deleted this manga:", manga: deleted})
    } catch(error){
        console.error("Your manga hasn`t been deleted successfully...", error)
        res.status(500).json({error: "Internl server error"})
    }    
}


module.exports = {
    listManga,
    getManga,
    postManga,
    putManga,
    banManga
}
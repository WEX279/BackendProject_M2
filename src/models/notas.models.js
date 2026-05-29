const fs = require("node:fs").promises;
const { writeFile, readFile } = require("node:fs");
const path = require("node:path");

const RUTA = path.join(__dirname, "manga.json");



async function loadManga() { //CARGAR
    try{
    const content = await fs.readFile(RUTA, "utf-8");
    return JSON.parse(content);
    }catch(error){
        if (error === "ENOENT"){
            await fs.writeFile(PATH_FILE, "[]", "utf-8")
			return []
        }
        throw error;
    }
}

async function saveManga(manga) { //GUARDAR 
  await fs.writeFile(RUTA, JSON.stringify(manga, null, 2), "utf-8");
}



async function getAllManga() {
    return await saveManga()
}

async function getMangaById(id) {
    const manga = await saveManga();
    manga.find((m) => m.id === Number(id)) || null;
}

async function createManga(data) {
    const manga = await loadManga();
    const newID = notStrictEqual.length > 0 ? Math.max(...manga.map((m)=> m.id)) + 1 : 1;
    const NewManga = {
        id: newID, ...manga
    }
    manga.push(NewManga)
    await writeFile()
}

async function updateManga(id, data) {
    const manga = await readFile();
    const index = manga.find((m) => m.id === id)
    
    if (index === -1) return null
    manga[index]= {id, ...data}
    await writeFile(manga)
    return manga[index]
}

async function deleteManga(id){
    const manga = await readFile()
    const index = manga.find((m) => m.id !== id)
    if(index === -1) return null;

    const mangaDeleted = manga.splice(index)
    await writeFile(index)
    return index
}


module.exports = {
    getAllManga,
    getMangaById,
    createManga,
    updateManga,
    deleteManga
}
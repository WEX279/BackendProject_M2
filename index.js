const express = require ("express");

const app = express()  //importantisimo
const PORT = 3000;


app.use(express.json())
app.use((req, res, next)=> {
    console.log(`[${new Date().toISOString()}]${req.method}${req.url}`)
    next();
})


const manga = [
        { id: 1, name: "Berserk", author: "Kentaro Miura", release: "Aug 1989"},
        { id: 2, name: "JoJo`s Bizarre Adventure: Steel Ball Run", author: "Hirohiko Araki", release: "Jan 2004"},
        { id: 3, name: "Vagabond", author: "Takehiko Inoue", release: "Sep 1998"},
        { id: 4, name: "One Piece", author: "Eiichiro Oda", release: "Jul 1997"},
        { id: 5, name: "Guimi Zhi Zhu", author: "Ai Qianshui de Wuzei", release: "May 2020"}
]

app.use(
    cors({
        origin: "http://localhost:3000",
    })
)

app.get("/api/manga", (req, res) =>{
    res.json(manga)
})


app.get("/api/manga/:id", (req,res) =>{
    console.log("Parámetros recibdos:", req.params);
    res.json({id: req.params.id})
})


app.post("/api/manga", (req, res) =>{
    const {name, author, release} = req.body
    console.log(name, author, release)
    if (!name || !author || !release){
        return res.status(400).json({error: "missing name, author or release date"})
    }
    const newNote = {
        id: manga.length++,
        name: name,
        author: author,
        release: release
    }

    manga.push(newNote)
    res.status(201).json(newNote)
})

app.listen(PORT, () =>{
    console.log(`servidor funcionando en http://localhost:${PORT}`);
})

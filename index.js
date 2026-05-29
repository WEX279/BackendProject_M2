const express = require("express");

const app = express(); //importantisimo
const PORT = process.env.PORT;

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}]${req.method}${req.url}`);
  next();
});

app.get("/api/manga", async (req, res) => {
  const manga = await loadManga();
  res.json(manga);
});

// Conseguir un id concreto:
app.get("/api/manga/:id", async (req, res) => {
  const manga = await loadManga();
  const id = Number(req.params.id);
  const data = manga.find((m) => m.id === id);

  if (!data) {
    return res.status(404).json({ error: "Id not found" });
  }

  res.json(data);
});

// Añadir un nuevo objeto al array manga
app.post("/api/manga", async (req, res) => {
  const manga = await loadManga();

  const { name, author, release, genre } = req.body;
  if (!name || !author || !release || !genre) {
    return res
      .status(400)
      .json({ error: "missing name, author, release date or genre" });
  }
  const newNote = {
    id: manga.length + 1,
    name: name,
    author: author,
    release: release,
    genre: genre
  };

  console.log(newNote)
  manga.push(newNote);
  await saveManga(manga);
  res.status(201).json(newNote);
});

app.put("api/manga/:id", async (req, res) =>{
  const id = Number(req.params.id);
  const { name, author, release, genre} = req.body;

  if (!name || !author || !release || !genre){
    return res.status(400).json({error: "missing name, author, release date or genre"})
  }

  const manga = await loadManga();
  const indice = manga.findIndex((m)=> m.id === id);

  if (indice === -1)
    return res.status(404).json({error: "id not found"})

  manga[indice] = {name, author, release, genre};
  await saveManga(manga)
  res.json(manga[indice])

})

app.delete("/api/manga/:id", async (req, res)=>{
  const id = Number(req.params.id);
  console.log(id)
  const manga = await loadManga();
  const indice = manga.findIndex((m)=> m.id === id);
  console.log("indice conseguido")
  if (indice === -1){
    return res.status(404).json({ error: "id not found"})
  }

  const [deleted] = manga.splice(indice, 1);
  console.log(indice)
  
  await saveManga(manga);
  console.log("manga borrado")
  res.json({message: "Manga deleted succesfully!", manga: deleted  })

})


app.listen(PORT, () => {
  console.log(`servidor funcionando en http://localhost:${PORT}`);
}) 
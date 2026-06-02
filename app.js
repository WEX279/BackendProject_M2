const express = require("express");
const app = express();
const mangaRoutes = require("./src/routers/manga.routers")

app.use(express.json()) // req => usuario

// Logger: registra el método y la URL
app.use((req, res, next) => { 
    console.log(`${req.method} ${req.url}`)
    next()
})

// Status => Backend sea accesible
app.get("/api/health", (req,res) =>{
    return res.json({status: "ok"})
})

// Integra nuestros endopoits y metodos al /api/manga general de express
app.use("/api/manga", mangaRoutes);

module.exports = app;
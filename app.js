const express = require("express");
const app = express();
const mangaRoutes = require("../BackendProject_M2/src/routers/manga.routers")
const usersRoutes = require("../BackendProject_M2/src/routers/users.routers")

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
app.use("/api/user", usersRoutes)

module.exports = app;
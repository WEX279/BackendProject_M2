import express from "express";
const app = express();
import mangaRoutes from "../BackendProject_M2/src/routers/manga.routers.js"
import usersRoutes from "../BackendProject_M2/src/routers/users.routers.js"

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

export default app;
import express from "express";
const app = express();
import cors from "cors"
import mangaRoutes from "./src/routers/manga.routers.js"
import usersRoutes from "./src/routers/users.routers.js"


app.use(cors(
    {
    origin: 'https://backendproject-m2.onrender.com/api',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}
))

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
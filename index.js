import "dotenv/config"
import app from "./app.js";
import connect_db from "./src/config/db.js"
const PORT = process.env.PORT;

async function initServer(req, res) {
  await connect_db()
  app.listen(PORT, () => {
  console.log(`servidor funcionando en http://localhost:${PORT}`);
}) 
}

initServer()
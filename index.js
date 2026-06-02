require("dotenv").config()
const app = require("./app"); //importantisimo
const connect_db = require("./src/config/db")
const PORT = process.env.PORT;


async function initServer(req, res) {
  await connect_db()
  app.listen(PORT, () => {
  console.log(`servidor funcionando en http://localhost:${PORT}`);
}) 
}

initServer()
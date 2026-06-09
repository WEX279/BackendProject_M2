import mongoose from "mongoose"
import dns from "dns"

async function conect_db() {

    const uri = process.env.MONGODB_URI

    try {
        if(uri.startsWith("mongodb+srv://")){
            dns.setServers(["8.8.8.8", "1.1.1.1"])
        }
        await mongoose.connect(uri)
        
    } catch (error) { console.error("Error conctando a Mongo", error)
        process.exit(1)  
    }
}

export default conect_db;
import jwt from "jsonwebtoken"

function verifyToken(req, res, next){
        try {
            const authHeader = req.headers.authorization;
            if(!authHeader || !authHeader.startsWith("Bearer ")){
                return res.status(401).json({message: "token not found or invalid format"})
            }

            const token = authHeader.split(" ")[1]

            const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)

            req.user = verifiedToken

            next()

        } catch (error) {
            if(error.name === "TokenExpiredError"){
                return res.status(401).json({message: "session expired", error})
            }
            return res.status(5401).json({message: "internal erver error"})
        }
};

export default verifyToken
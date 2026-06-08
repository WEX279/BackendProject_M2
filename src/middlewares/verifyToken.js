const jwt = require("jsonwebtoken")

function verifyToken(req, res, next){
        try {
            
            const authHeader = req.headers.authoritazion;

            if(!authHeader){
                res.status(401).json({message: "token not found"})
            }

            const token= authHeader.split(" ")[1]

            const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)

            req.user = verifiedToken
            next()

        } catch (error) {
            return res.status(500).json({message: "internal erver error"})
        }
};

module.exports = verifyToken
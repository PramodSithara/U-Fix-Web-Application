const jwt = require('jsonwebtoken');
require('dotenv').config();

const TOKEN_KEY  = process.env.JWT_SECRET;

const verifyToken = async (req, res, next) => {
    const {token} = req.body;

    if(!token){
        return res.status(400).json({message: 'Token is Required.'})
    }
    try{
        const decodedToken = await jwt.verify(token, TOKEN_KEY)
        req.currentUser = decodedToken;
    }catch(err){
        return res.status(400).json({message: 'Token is Invalid.'})
    }

    return next();
}


module.exports = verifyToken;
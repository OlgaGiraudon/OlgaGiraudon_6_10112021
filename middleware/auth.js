const jwt = require('jsonwebtoken'); //import package for crypt
const dotenv = require("dotenv");
dotenv.config();
const SECRET_TOKEN = process.env.SECRET_TOKEN;

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; //token {bearer: ........}
    const decodedToken = jwt.verify(token, SECRET_TOKEN);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Erreur de connection') 
    });
  }
};
// require JWT_SECRET from .env file // use this secret!
// require DB to get the user information
const Jwt = require('jsonwebtoken')

const SECRET_KEY = process.env.SECRET_KEY


const restricted = (req, res, next) => {
  const token = req.headers.authorization
  console.log("token", token)
  if (token) {
    const tokenWithBearer = token.split(" ")[1]
    Jwt.verify(tokenWithBearer, SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'Invalid credentials from middleware' })
      } else {
        req.decoded = decoded
        next()
      }
    })
  } else {
    res.status(401).json({ message: 'Invalid credentials in middleware'})
  }
}


module.exports = {
  restricted
}

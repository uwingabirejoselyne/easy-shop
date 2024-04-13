const jwt = require('jsonwebtoken')
const generatedToken = (id) =>{
    jwt.sign({id}.process.env.JWT_SECRET, {expiresIn: "3d"})
}
module.exports = {generatedToken}
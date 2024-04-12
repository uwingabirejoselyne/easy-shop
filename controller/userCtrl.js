const User = require('../models/userModel')
const createUser = async(req,res) =>{
    console.log(req.body);
    const email = req.body.email
    const findUser = await User.findOne({email})
    if(!findUser){
        const newUser = User.create(req.body)
        res.status(201).json({
            msg:"User created"
        })
    }
    else{
        res.json({
            msg: "User is already exists",
            success : false
        })
    }
}
module.exports = {createUser}
const Blog = require('../models/blogModel')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const createBlog = asyncHandler(async(req,res)=>{
    try {
    const newBlog =await  Blog.create(req.body)
    res.json({
        status: "status is successful",
        newBlog
    })
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }

})

const getBlog = asyncHandler(async(req,res)=>{
    try {
        const getBlog = Blog.find()
        res.json(getBlog)
    } catch (error) {
        throw new Error(error)
    }
})
module.exports={createBlog,getBlog}
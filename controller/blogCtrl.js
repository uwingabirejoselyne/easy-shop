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

const getAllBlog = asyncHandler(async(req,res)=>{
    try {
        const getBlog =await Blog.find()
        res.json(getBlog)
    } catch (error) {
        throw new Error(error)
    }
})

const getBlog = asyncHandler(async(req,res)=>{
    const {id} = req.params
    try {
        const getBlog =await Blog.findById(id)
        res.json(getBlog)
    } catch (error) {
        throw new Error(error)
    }

})
const updateBlog = asyncHandler(async(req,res)=>{
    const {id} = req.params
    try {
        const updateBlog = await Blog.findByIdAndUpdate(id,req.body,{
            new:true
        })
        res.json(updateBlog)
        
    } catch (error) {
        throw new Error(error)
    }
})

const deleteBlog = asyncHandler(async(req,res)=>{
    const {id} = req.params
    try {
        const deleteBlog = await Blog.findByIdAndDelete(id)
        res.json(u=deleteBlog)
        
    } catch (error) {
        throw new Error(error)
    }
})
module.exports={createBlog,getAllBlog,getBlog,updateBlog,deleteBlog}
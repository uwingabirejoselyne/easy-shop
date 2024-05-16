const Blog = require('../models/blogModel')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const validateMongoDbId = require('../utils/validateMongoDbId')
const {authmiddleware,isAdmin} = require('../middlewares/authMiddleware')

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
       const updateNumViews= await Blog.findByIdAndUpdate(
            id,
            {
                $inc: {numViews:1}
            },
            {
              new:true}
        )
        res.json(updateNumViews)
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

const likeBlog = asyncHandler(async(req,res) =>{
    const blogId = req.body
    validateMongoDbId(blogId)

    const blog = await Blog.findById(blogId)
    const loginUserId = req?.user?._id
    const isLiked = blog?.isLiked
    const alreadyDisliked = blog?.disLikes.find(
        (userId = userId.toString === loginUserId.toString())
    );
    if(alreadyDisliked){
        const blog = await Blog.findOneAndUpdate(blogId, {
            $pull: {disLikes:loginUserId},
            isDisliked:false
        })
    }
})
module.exports={createBlog,getAllBlog,getBlog,updateBlog,deleteBlog}
const Product = require('../models/ProductModel')
const slugify = require('slugify')
const asyncHandler = require('express-async-handler')

const createProduct = asyncHandler(async(req,res) =>{
    try {
        if(req.body.title){
            req.body.slug = slugify(req.body.title)
        }
        const newProduct = await Product.create(req.body)
        res.json(newProduct)
        
    } catch (error) {
        throw new Error(error)
    }
})

const updateProduct = asyncHandler(async(req,res) =>{
    const {id} = req.params

    try {
        if(req.body.title){
            req.body.slug = slugify(req.body.title)
        }
        const updateProduct = await Product.findByIdAndUpdate(id,req.body, {
            new: true
        })
        res.json(updateProduct)
       
    } catch (error) {
       throw new Error(error) 
    }
})

const deleteProduct = asyncHandler(async(req,res) =>{
    const {id} = req.params

    try {
        const deleteProduct = await Product.findByIdAndDelete(id)
        res.json(deleteProduct)
       
    } catch (error) {
       throw new Error(error) 
    }
})

const getaProduct = asyncHandler(async(req,res) =>{
    try {
        const {id} = req.params
        const findProduct = await Product.findById(id)
        res.json(findProduct)
    } catch (error) {
        throw new Error(error)
        
    }
})

const getAllProduct = asyncHandler(async(req,res) =>{
    try {
        const allProduct = await Product.find()
        res.json(allProduct)
    } catch (error) {
        throw new Error(error)
        
    }
})
module.exports = { createProduct, getaProduct,getAllProduct,updateProduct,deleteProduct }
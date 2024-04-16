const Product = require('../models/ProductModel')
const asyncHandler = require('express-async-handler')

const createProduct = asyncHandler(async(req,res) =>{
    try {
        const newProduct = await Product.create(req.body)
        res.json(newProduct)
        
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
module.exports = { createProduct, getaProduct }
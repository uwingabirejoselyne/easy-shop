const express = require('express')
const {createProduct,getaProduct,getAllProduct,updateProduct,deleteProduct, uploadImages} = require("../controller/productCtrl")
const router = express.Router()
const {authMiddleware,isAdmin} = require('../middlewares/authMiddleware')
const { uploadPhoto, productImgResize} = require('../middlewares/uploadImages')

router.post('/',authMiddleware,isAdmin, createProduct)
router.put('/upload/:id',uploadPhoto.array('images',10),uploadImages)
router.get('/', getAllProduct)
router.get('/:id', getaProduct)
router.put('/:id/update',authMiddleware,isAdmin, updateProduct)
router.delete('/:id/delete',authMiddleware,isAdmin, deleteProduct)

module.exports = router
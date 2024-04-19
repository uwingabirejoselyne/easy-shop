const express = require('express')
const {createProduct,getaProduct,getAllProduct,updateProduct,deleteProduct} = require("../controller/productCtrl")
const router = express.Router()
const {authMiddleware,isAdmin} = require('../middlewares/authMiddleware')

router.post('/',authMiddleware,isAdmin, createProduct)
router.get('/:id', getaProduct)
router.put('/:id/update',authMiddleware,isAdmin, updateProduct)
router.delete('/:id/delete',authMiddleware,isAdmin, deleteProduct)
router.get('/', getAllProduct)


module.exports = router
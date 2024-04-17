const express = require('express')
const {createProduct,getaProduct,getAllProduct,updateProduct,deleteProduct} = require("../controller/productCtrl")
const router = express.Router()

router.post('/', createProduct)
router.get('/:id', getaProduct)
router.put('/:id/update', updateProduct)
router.delete('/:id/delete', deleteProduct)
router.get('/', getAllProduct)


module.exports = router
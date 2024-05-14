const { createBlog, getAllBlog, getBlog, updateBlog } = require('../controller/blogCtrl')
const express = require('express')
const {authMiddleware,isAdmin} = require('../middlewares/authMiddleware')
const router =express.Router()
router.post('/',createBlog)
router.get('/',getAllBlog)
router.get('/:id',getBlog)
router.put('/:id/update',updateBlog)
module.exports = router
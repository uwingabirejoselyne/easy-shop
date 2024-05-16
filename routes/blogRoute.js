const { createBlog, getAllBlog, getBlog, updateBlog, deleteBlog, likeBlog } = require('../controller/blogCtrl')
const express = require('express')
const {authMiddleware,isAdmin} = require('../middlewares/authMiddleware')
const router =express.Router()
router.post('/',createBlog)
router.get('/',getAllBlog)
router.put('/likes',authMiddleware,isAdmin,likeBlog)
router.get('/:id',getBlog)
router.put('/:id/update',updateBlog)
router.delete('/:id/delete',deleteBlog)

module.exports = router
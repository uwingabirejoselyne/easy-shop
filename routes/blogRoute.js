const { createBlog, getBlog } = require('../controller/blogCtrl')
const express = require('express')
const {authMiddleware,isAdmin} = require('../middlewares/authMiddleware')
const router =express.Router()
router.post('/',createBlog)
router.get('/',getBlog)
module.exports = router
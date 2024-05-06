const { createBlog } = require('../controller/')
const express = require('express')
const router =express.Router()
router.post('blog',createBlog)
module.exports = router
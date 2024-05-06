const { createBlog } = require('../controller/')
const express = require('express')
const router =express.Router()
router.post('/',createBlog)
module.exports = router
const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 4000
app.use('/', (req,res) =>{
    res.send('Hello from the server')
})
app.listen(PORT,() =>{
    console.log(`Server running at port ${PORT}`);
})
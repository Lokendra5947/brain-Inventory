const express = require('express')
const { userRoutes } = require('./Router/userRouter')
require('./Helper/dbConnection')
require("dotenv").config()
let app = express()
app.use(express.json())
const PORT = process.env.PORT || 9000;

  app.use('/user',userRoutes)
  
app.listen(PORT, ()=>{
    console.log(`Server is Running at ${PORT}`)
})
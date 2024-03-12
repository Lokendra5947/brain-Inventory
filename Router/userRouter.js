const express = require('express')
const { Registration } = require('../Controller/userController')
const { upload } = require('../Helper/multerStorage')
const userRoutes = express.Router()

userRoutes.post('/userRegister',upload.single("profilePicture"),Registration)
module.exports = {userRoutes}
const { userModel } = require("../Model/userModel")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
require("dotenv").config()
const path = require('path')
const validator = require("validator")
const nodemailer  = require("nodemailer")

const { hashPassword } = require("../Helper/hashPassword")

 const Registration = async(req,res)=>{
  // Validating the fields
  try{
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: "Please provide all the required fields" });
  }
    if(!validator.isEmail(req.body.email)){return res.status(400).send({sucess:false,message:"email not valid"})}
    let fileLocation = path.join(__dirname, `../${req.file.destination+req.file.filename}`)
    // Check if User Is already Reigsterd or not 
const user = await userModel.findOne({email:req.body.email})
if (user){return res.status(409).send({Success: false,message:"User Already Exsist"})}
    // Bcrypt the password 
let hashhedPassword= await hashPassword(req.body.password)
let newUser = await userModel.create({...req.body,password:hashhedPassword,profilePicture:fileLocation})
// Sending Email Confirmation
sendConfirmationEmail(req.body.email)
res.status(201).send({Suucess:true, message:"Registerd Successfully", data:newUser})
}
catch (error) {
    console.error('Error during registration:', error);
  }  
 }

  // Send confirmation email
const sendConfirmationEmail = async (email) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.user,
        pass: process.env.password
      }
    });

    const mailOptions = {
      from: 'lokendrasinghr40@gmail.com',
      to: email,
      subject: 'Confirmation Email',
      text: 'Please confirm your email address to complete the registration.'
    };

    await transporter.sendMail(mailOptions);
    console.log("Confirmation email sent successfully");
  } catch (error) {
    console.error("Error sending confirmation email:", error);
  }
};

 module.exports = {Registration}

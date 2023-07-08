const { User } = require("../models/user.model")
const jwt = require('jsonwebtoken')
const joi = require('joi')
const nodemailer = require('nodemailer');

// validation check function
const validate = (data)=>{
    const schema = joi.object({
        email:joi.string().email().required().label('email')
    })
    return schema.validate(data)
}

module.exports={
    
    post: async(req,res)=>{
        // validating the email
        const {error} = validate(req.body)
        if(error){
            console.log("not validate :" + error.details[0].message);
            return res.status(400).json({message: error.details[0].message});
        }
        
        // cheking if the email is already existed or not
        const email = req.body.email
        await User.findOne({emailId:email})
        .then((foundUser)=>{
            // if user is found via email then generate a jwt token
            const secret = process.env.JWT_SECRET_KEY + foundUser.password
            const token = jwt.sign({email:foundUser.emailId, userId:foundUser._id}, secret, {expiresIn:"5m"})

            // reset password link
            const link = `http://localhost:3000/reset-password/${foundUser._id}/${token}`
            console.log(link)

            // sending email
            const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.MAILLER_ID,
                pass: process.env.MAIL_PASS_KEY
            }
            });

            var mailOptions = {
            from: process.env.MAILLER_ID,
            to: foundUser.emailId,
            subject: '[Harmony] Password Reset E-mail',
            text: 'Click the link below 👇 to reset your password\n\n'+link
            };

            transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
            });

            // sending response to client
            res.status(200).json({message:"Success"})
        })
        .catch(err =>{
            // if user is not found
            res.status(400).json({message:"User is not found."})
        })
    }
}
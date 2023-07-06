let User = require('../models/user.model');
const bcrypt = require('bcryptjs');
require('dotenv').config();
module.exports={
    get : (req,res)=>{
        res.send("Sign-Up get request")
    },
    post:(req,res)=>{
        console.log(req.body)
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        console.log("Hash is "+hash+" salt:"+salt)
        const newUser = new User({
            username: req.body.name,
            gender: req.body.gender,
            emailId: req.body.email,
            password: hash
        })
        newUser.save()
        .then(()=> res.send("Successfully Signed Up"))
        .catch((err)=> res.status(400).json('Error: '+err))
    }
}
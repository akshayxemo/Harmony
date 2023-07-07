let {User} = require('../models/user.model');
const bcrypt = require('bcryptjs');
const joi = require('joi');
const jwt = require('jsonwebtoken');
const PasswordComplexity = require('joi-password-complexity');

const validate = (data)=>{
    const schema = joi.object({
        email: joi.string().email().required().label("email"),
        password: PasswordComplexity().required().label("password")
    });

    return schema.validate(data);
}

module.exports={
    get : (req,res)=>{
        res.send("Login get request")
    },
    post:async(req,res)=>{
        console.log(req.body);
        // validating the posting data
        const {error} = validate(req.body);
        if(error){
            console.log("not validate :" + error.details[0].message);
            return res.status(400).json({message: error.details[0].message});
        }
        
        await User.findOne({emailId: req.body.email})
        .then((foundUser)=>{
            if(bcrypt.compareSync(req.body.password, foundUser.password)){
                const token = jwt.sign({userId:foundUser._id}, process.env.JWT_SECRET_KEY, {expiresIn: "7d"});
                res.status(200).send({data:token, messsage: "Logged in Successfully"});
            }else{
                res.status(401).send({message:"Invalid Email or Password"})
            }
        })
        .catch(err => res.status(401).send({message:"Invalid Email or Password"}))
    }
}
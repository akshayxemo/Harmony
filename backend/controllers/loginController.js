let User = require('../models/user.model');
const bcrypt = require('bcryptjs');
module.exports={
    get : (req,res)=>{
        res.send("Login get request")
    },
    post:(req,res)=>{
        console.log(req.body)
        User.findOne({emailId: req.body.email})
        .then((foundUser)=>{
            if(bcrypt.compareSync(req.body.password, foundUser.password)){
                res.json(foundUser)
            }else{
                res.send("Password dosent matched")
            }
        })
        .catch(err => res.status(400).json('Error: '+err))
    }
}
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../MODEL/Usermodelschema');
const Usermodel = require('../MODEL/Usermodelschema');

const signup = async(req,res)=>{
    const {Name,Email,Password} = req.body;
    const useremail = await Usermodel.findOne({Email});

    if(useremail)
    {
        res.json("User already exist")
    }
    else
    {
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(Password,salt);
        const userdetails = await Usermodel.create({
            Name,Email,Password:hashedpassword
        })
        res.json({
            Id:userdetails._id,
            Name:userdetails.Name,
            Email:userdetails.Email,
            Password:userdetails.Password,
            Token:tokengenerate(userdetails._id),

        })
    }
}

const tokengenerate=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'1d',
    })
}

module.exports=signup
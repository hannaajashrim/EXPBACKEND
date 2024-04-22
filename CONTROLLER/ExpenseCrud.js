const Usermodel = require("../MODEL/Usermodelschema");
const User = require("../MODEL/Usermodelschema");
const jwt = require('jsonwebtoken')

const createuser = async(req,res)=>
{
    const {Name,Email,Password} = req.body;
    const userdata = await Usermodel.findOne({Email})

    if(userdata)
    {
        res.json('already exist')
    }
    else
    {
        const Userdetails = await Usermodel.create({
            Name,Email,Password
        })
        res.json({

            Id:Userdetails._id,
            Name:Userdetails.Name,
            Email:Userdetails.Email,
            Password:Userdetails.Password,
            Token:tokengenerate(Userdetails._id),

        })
    }
    // res.json(userdata);
}


const getuser = async(req,res)=>
{
    const userget = await Usermodel.find();
    res.json(userget);
}


const getsingle = async(req,res)=>
{
    const id=req.params.demo
    const usersingle = await Usermodel.findById(id);
    res.json(usersingle)
}


const deleteuser = async(req,res)=>
{
    const _id = req.params.id;
    const userdelete = await Usermodel.findByIdAndDelete(_id);
    res.json("User Deleted Successfully")
}

const updateuser = async(req,res)=>
{
    const _id = req.params.id;
    const {Name,Email,Password} = req.body;

    const userupdate = await Usermodel.findByIdAndUpdate(_id,{Name,Email,Password});
    res.json(userupdate);
}


const tokengenerate=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'100d',
    })
}


module.exports={createuser,getuser,getsingle,deleteuser,updateuser}
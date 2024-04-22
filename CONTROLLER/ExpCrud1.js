const jwt = require('jsonwebtoken')
const Expensemodel = require('../MODEL/Expenseschema')


const createlist = async(req,res)=>
{
    const {type,name,amount,} = req.body
    // const createdata = await Expensemodel.findOne({category})

    // if (createdata)
    // {
    //     res.json('already esist this category')
    // }
    // else
    // {
        const expensedetails = await Expensemodel.create({
            type,name,amount
        })
        res.json({
            Id:expensedetails._id,
            type:expensedetails.type,
            name:expensedetails.name,
            amount:expensedetails.amount,
            token:tokengeneratexp(expensedetails._id)
        })
    // }
}


const getlist = async(req,res)=>
{
    const expenseget = await Expensemodel.find();
    res.json(expenseget);
}

const getsinglelist = async(req,res)=>
{
    id = req.params.demo;
    const singlelist = await Expensemodel.findById(id);
    res.json(singlelist);
}

const deletelist = async(req,res)=>
{
    _id = req.params.id;
    const deleteitem = await Expensemodel.findByIdAndDelete(_id);
    res.json("One item Deleted");
}

const updatelist = async(req,res)=>
{
    _id = req.params.id;
    const {type,name,amount} = req.body;

    const updateitem = await Expensemodel.findByIdAndUpdate(_id,{type,name,amount});
    res.json(updateitem);
}



const tokengeneratexp=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"1d",
    })
}





module.exports={createlist,getlist,getsinglelist,deletelist,updatelist}
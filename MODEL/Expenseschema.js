const mongoose = require('mongoose')

const ExpenseSchema = mongoose.Schema({
    type:{type:String},
    name:{type:String},
    amount:{type:Number , required:true}

})

const Expensemodel = mongoose.model("expense",ExpenseSchema)

module.exports=Expensemodel

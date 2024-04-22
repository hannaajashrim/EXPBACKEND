const { default: mongoose } = require('mongoose')
const mongoos = require('mongoose')

const categoriesSchema=mongoose.Schema({
    type:{type:String, default:"Investment"},
    color:{type:String, default:'#FCBE44'}
})

const categoryModel = mongoose.model("category", categoriesSchema)
module.exports=categoryModel
const mongoos = require('mongoose')

const connection=async()=>
{
    try{
        const connect = await mongoos.connect("mongodb+srv://hannajashrim26:hannaHANNA123@hannajashrim.jo4l6rh.mongodb.net/expenseApp");
        console.log("Database is Connected");
    }
    catch(err){
        console.log(`error :${err}`);
        process.exit()

    }
}

module.exports=connection
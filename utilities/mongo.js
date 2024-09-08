const mongoose= require("mongoose");

const connectDB= async ()=>{
    console.log('db');
    try{
        const conn= await 
        mongoose.connect(process.env.MONGO_URI,{});
        console.log(`database coneccted: ${conn.connection.host}`);

    }
    catch(ex){
console.log(ex);
process.exit(1);
    }
}
module.exports=connectDB;
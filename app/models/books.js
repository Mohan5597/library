const mongoose=require('mongoose')
const Schema=mongoose.Schema

const bookSchema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    author:{
        type:String,
        required:true,
    },
    currentAvailabilityStatus:{
        type:String,
        required:true

    },
    adminId:{
        type:Schema.Types.ObjectId,
        ref:"Admin" 
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
})

const Book=mongoose.model("Book",bookSchema)
module.exports=Book
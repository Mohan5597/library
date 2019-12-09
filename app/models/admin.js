const mongoose=require('mongoose')
const validator=require('validator')//validator check
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const Schema=mongoose.Schema

const adminSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        minlength:5
    },
    name:{
        type:String,
        required:true,
        minlength:5
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:function(value){
                return validator.isEmail(value)
             },
            message:function(){
                return 'invalid email format'
            }
            
        }
        
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        maxlength:128
    },
    contactNumber:{
        type:Number,
        required:true,
        minlength:10,
        maxlength:10
    },
    tokens:[
        {
        token:{
            type:String
        },
        createdAt:{
            type:Date,
            default:Date.now
        }
    }
  ]
})

//pre hooks
adminSchema.pre('save', function(next){
    const admin=this
    if(admin.isNew){
        bcryptjs.genSalt(10)
             .then(function(salt){
                 bcryptjs.hash(admin.password,salt)
                       .then(function(encryptedpassword){
                           admin.password=encryptedpassword
                           next()
                       })
             })
    }else{
        next()
    }
})

//statics method
adminSchema.statics.findByCredentials=function(email,password){
    const Admin=this
    return Admin.findOne({email})
         .then(function(admin){
             if(!admin){
                 return Promise.reject('invalid email/password')
             }
             return bcryptjs.compare(password,admin.password)
                   .then(function(result){
                       if(result){
                           return Promise.resolve(admin)
                       }else{
                           return Promise.reject('invalid email/password')
                       }
                   })
         })
         .catch(function(err){
             return Promise.reject(err)
         })
}

adminSchema.statics.findByToken=function(token){
    const Admin=this
    let tokenData
    try{
        tokenData=jwt.verify(token,'jwt@123')

    }catch(err){
        return Promise.reject(err)
    }
    return Admin.findOne({
         _id:tokenData._id,                // token: token._id,
        'tokens.token':token

    })


}

//Note:es5 function should be used because in es6 this will refer to undefined
//own instance methods //when called on object
adminSchema.methods.generateToken=function(){
    const admin=this
    const tokenData={
        _id:admin._id,
        adminname:admin.username,
        createdAt:Number(new Date())
    }

    const token=jwt.sign(tokenData,'jwt@123')
    admin.tokens.push({
        token    //concise property //or we can write it as token:token
    })

    return admin.save()
          .then(function(admin){
              return Promise.resolve(token)
          })
          .catch(function(err){
              return Promise.reject(err)
          })
}





const Admin=mongoose.model('Admin',adminSchema)
module.exports=Admin

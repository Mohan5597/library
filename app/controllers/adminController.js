const Admin=require('../models/admin')


module.exports.register=(req,res) =>{
    const body=req.body
    const admin=new Admin(body)
    admin.save()
        .then((admin) =>{
            res.send({         //we can specify what we can send back  like user name,id email rather than sending whole user
                _id:admin._id,
                username:admin.username,
                name:admin.name,
                email:admin.email,
                contactNumber:admin.contactNumber
            })
        })
        .catch(err =>{
            res.send(err)
        })

}

module.exports.create=(req,res) =>{
    const body=req.body
    Admin.findByCredentials(body.email,body.password)
         .then(function(admin){
             return admin.generateToken()
         })
        .then(function(token){
           // res.setHeader('x-auth',token).send({})
           res.send({token:token})
        })
        .catch(err =>{
            res.send(err)
        })
}

module.exports.list=(req,res) =>{
    const {admin}=req
    res.send(admin)
 }

 
//localhost:3005/users/logout
module.exports.destroy=(req,res) =>{
    const {admin,token}=req
    Admin.findByIdAndUpdate(admin._id,{ $pull:{tokens:{token:token}}})
      .then(function(){
          res.send('successfully logged out')
      })
      .catch(function(err){
          res.send(err)
      })
}






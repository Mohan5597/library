const User=require('../models/user')


module.exports.register=(req,res) =>{
    const body=req.body
    const user=new User(body)
    user.save()
        .then((user) =>{
            res.send({         //we can specify what we can send back  like user name,id email rather than sending whole user
                _id:user._id,
                username:user.username,
                name:user.name,
                email:user.email,
                contactNumber:user.contactNumber
            })
        })
        .catch(err =>{
            res.send(err)
        })

}

module.exports.create=(req,res) =>{
    const body=req.body
    User.findByCredentials(body.email,body.password)
         .then(function(user){
             return user.generateToken()
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
    const {user}=req
    res.send(user)
 }

 
//localhost:3005/users/logout
module.exports.destroy=(req,res) =>{
    const {user,token}=req
    User.findByIdAndUpdate(user._id,{ $pull:{tokens:{token:token}}})
      .then(function(){
          res.send('successfully logged out')
      })
      .catch(function(err){
          res.send(err)
      })
}

module.exports.update=(req,res) =>{
   
    // const user = req.user 
    const user = req.user 
    const { username } = req.body 
    User.findOneAndUpdate({ _id: user._id}, {$set: { username}}, { new: true })
        .then(user =>{
            res.send(user)
        })
        .catch(err =>{
            res.send(err)
        })
    }




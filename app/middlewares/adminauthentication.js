const Admin=require('../models/admin')

const adminAuthenticate=function(req,res,next){
    const token=req.header('x-auth')

        Admin.findByToken(token)
            .then(function(admin){
                if(admin){
                    req.admin=admin
                    req.token=token
                    next()
                     //res.send(user)

                }else{
                    res.status('401').send({notice:'token not available'})
                }
               
            })
            .catch(function(err){
                res.status('401').send(err)
            })
  

}
module.exports={
    adminAuthenticate
}
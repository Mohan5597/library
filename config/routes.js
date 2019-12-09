const express = require('express')
const router = express.Router()

const adminController=require('../app/controllers/adminController')
const userController=require('../app/controllers/usercontroller')
const bookController=require('../app/controllers/bookcontroller')

const {authenticateUser}=require('../app/middlewares/authentication')
const {adminAuthenticate}=require('../app/middlewares/adminauthentication')


router.get('/admin/profile',adminAuthenticate,adminController.list)
router.post('/admin/register',adminController.register)
router.post('/admin/login',adminController.create)
router.delete('/admin/logout', adminAuthenticate,adminController.destroy)

router.get('/users/profile',authenticateUser,userController.list)
router.put('/users/profile/edit',authenticateUser,userController.update)
router.post('/users/register',userController.register)
router.post('/users/login',userController.create)
router.delete('/users/logout', authenticateUser,userController.destroy)

router.get('/books',bookController.list)
router.get('/books/:id', bookController.show)
router.post('/books',adminAuthenticate,bookController.create)
router.put('/books/:id', bookController.update)
router.delete('/books/:id',adminAuthenticate, bookController.destroy)



module.exports=router
const express=require('express');
const router=express.Router();
const userCtrl=require('../controllers/user');

//créer loger et recuperer un utilisateur
router.post('/signup', userCtrl.createUser)
router.post('/login',userCtrl.login )
router.get('/users/:id' ,userCtrl.getUser)
router.get('/users',userCtrl.getAllUser)

module.exports=router;
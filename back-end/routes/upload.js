const express=require('express');
const router=express.Router();
const auth=require('../middleware/auth');
const multer=require('../middleware/multer-config');
const imageCtrl=require('../controllers/upload');

//modifier la photo de l'utilisatuer
router.put('/:id',auth,multer,imageCtrl.modifyProfil)

//enregistrer les photos des posts
router.post('/posts/:id',auth,multer,imageCtrl.savePostFile)

//modifier l'image d'un post
router.put('/posts/:id',auth,multer,imageCtrl.modifyImagePost)

module.exports=router;
const express=require('express');
const router=express.Router();
const auth=require('../middleware/auth');
const multer=require('../middleware/multer-config');
const postCtrl=require('../controllers/post')

//créer un post
router.post('/:id',auth,multer,postCtrl.createPost);

//recuperer tout les posts dans la base de donnés
router.get('/:id',auth,postCtrl.getAllPosts);
  
//recuperer un post dans la base de données
router.post('/share/:id',auth,postCtrl.sharePost);
  
//modifier un post dans la base de donnés
router.put('/:id',auth,postCtrl.modifyPost)
  
//supprimer un psot dans la base de donnés
router.delete('/:id',auth,postCtrl.deletePost)

//liker ou disliker un post
router.post('/like/:id',auth,postCtrl.addLike)

module.exports=router;
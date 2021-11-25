const express=require('express');
const router=express.Router();
const auth=require('../middleware/auth');
const commentCtrl=require('../controllers/comments')

//creer un commentaire
router.post('/:id',auth,commentCtrl.createComment)

//recuperer tout les commentaire
router.get('/',auth,commentCtrl.getAllComments);
    
//modifier un commentaire
router.put('/:id',auth,commentCtrl.modifyComment)
  
//supprimer un commentaire
router.delete('/:id',auth,commentCtrl.deleteComment)



module.exports=router;
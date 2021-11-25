const express=require('express');
const router=express.Router();
const auth=require('../middleware/auth');
const profilCtrl=require('../controllers/profil');
  
//modifier le profil de l'utilisateur
router.put('/:id',auth,profilCtrl.modifyProfil)

//changer le mot de passe
router.put('/password/:id',auth,profilCtrl.changePassword)

//supprimer le profil de l'utilisateur
router.delete('/:id',auth,profilCtrl.deleteUser)

module.exports=router;
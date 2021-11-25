const express=require('express');
const router=express.Router();
const auth=require('../middleware/auth');
const notCtrl=require('../controllers/notifications')

router.post('/comments',auth,notCtrl.ifComment)

router.post('/like',auth,notCtrl.ifLike)

router.get('/count/:id',notCtrl.countNotifications)

router.get('/:id',notCtrl.getAllNotifs)

router.put('/:id',auth,notCtrl.seeNottifications)

router.delete('/:id',auth,notCtrl.deleteOneNotif)

router.post('/',auth,notCtrl.deleteAllNotifs)

module.exports=router;
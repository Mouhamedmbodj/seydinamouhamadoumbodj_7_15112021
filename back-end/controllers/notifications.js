const db= require('../database/database')

exports.ifComment=(req,res,next)=>{
    const data={
        postId:req.body.postId,
        theOneWoReactId:req.body.userId,
        form:req.body.form
    }

    db.query('SELECT `userId` FROM `posts` WHERE `posts`.`postId`=?' , [data.postId] , (error , results)=>{
        if(error){
            console.log(error)
        }
        if(results){
            data.postUserId=results[0].userId
            db.query('INSERT INTO notifications SET ?',[data], (error , results) =>{
                if(error){
                    console.log(error)
                }else{
                    res.send({Message:'Post créer'})
                }
            })
        }
    })
}

exports.ifLike=(req,res,next)=>{
    const data={
        postId:req.body.postId,
        theOneWoReactId:req.body.userId,
        form:req.body.form
    }

    db.query('SELECT `userId` FROM `posts` WHERE `posts`.`postId`=?' , [data.postId] , (error , results)=>{
        if(error){
            console.log(error)
        }
        if(results){
            data.postUserId=results[0].userId
            db.query('INSERT INTO notifications SET ?',[data], (error , results) =>{
                if(error){
                    console.log(error)
                }else{
                    res.send({Message:'Post créer'})
                }
            })
        }
    })
}

exports.countNotifications=(req,res,next)=>{
    const Id=req.params.id
    db.query('SELECT COUNT(*) as total FROM notifications WHERE postUserId=? && status=? ',[Id,'unseen'] , (error , results)=>{
        if(error){
            console.log(error)
        }
        if(results){
           res.send(results)
        }
    })
}

exports.getAllNotifs=(req,res,next)=>{
     const Id=req.params.id
     db.query('SELECT * FROM `notifications` JOIN users ON notifications.theOneWoReactId=users.Id WHERE notifications.postUserId=?' , [Id] , (error , results)=>{
        if(error){
            console.log(error)
        }
        if(results[0]){
            res.send(results)
        }
    })
}

exports.seeNottifications=(req,res,next)=>{
    const userId=req.params.id
    db.query('UPDATE notifications SET status=? WHERE postUserId=?',['see',userId],(error , results)=>{
        if(error){
          console.log(error)
        }
        if(results){
           res.send({Message:'notifications mis á jour'})
        }
    })
}

exports.deleteOneNotif=(req,res,next)=>{
    const notifId=req.params.id
    db.query('DELETE FROM `notifications` WHERE `notifications`.`notifId`=?',[notifId],(error , results)=>{
        if(error){
          console.log(error)
        }
        if(results){
          res.send({Message:'notification  supprimer'})
        }
    })
}

exports.deleteAllNotifs=(req,res,next)=>{
    const postUserId=req.body.userId
    db.query('DELETE FROM `notifications` WHERE `notifications`.`postUserId`=?',[postUserId],(error , results)=>{
        if(error){
          console.log(error)
        }
        if(results){
          res.send({Message:'notifications  supprimer'})
        }
    })
}
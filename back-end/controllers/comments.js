const db= require('../database/database')

//creer un commentaire
exports.createComment=(req,res,next)=>{
    db.query('INSERT INTO comments SET ?',[req.body], (error , results) =>{
        if(error){
            console.log(error)
        }else{
            res.send({Message:'commentaire ajouter'})
        }
    })
}


//recuperer les commentaires
exports.getAllComments=(req, res ,next)=>{
    db.query('SELECT * FROM `comments` JOIN users ON comments.userId=users.id ORDER BY commentId DESC',(error , results)=>{
        if(error){
          console.log(error)
        }
        if(results){
            res.send(results)
        }
    })
}

//modifier un commentaire
exports.modifyComment=(req,res,next)=>{
    const commentId=req.body.commentId
    const comment=req.body.comment
    db.query('UPDATE comments SET comment=? WHERE commentId=?',[comment , commentId],(error , results)=>{
        if(error){
          console.log(error)
        }
        if(results){
           res.send({Message:'commentaire modifier'})
        }
    })
}

//supprimer un commentaire
exports.deleteComment=(req,res,next)=>{
    const Id=req.params.id
    db.query('DELETE FROM `comments` WHERE `comments`.`commentId`=?',[Id],(error , results)=>{
        if(error){
          console.log(error)
        }
        if(results){
          res.send({Message:'commentaire supprimer'})
        }
    })
}
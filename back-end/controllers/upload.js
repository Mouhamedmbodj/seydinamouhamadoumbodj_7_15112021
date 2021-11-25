const db= require('../database/database');
const fs=require('fs');

//modifier la photo de profil
exports.modifyProfil=(req,res,next)=>{
    if(req.file){
        const imageUrl=`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        const user=req.params.id
        db.query('SELECT `imageUrl` FROM `users` WHERE `users`.`id`=?' , [user] , (error , results)=>{
            if(error){
                console.log(error)
            }
            if(results[0].imageUrl!=null){
                const result=results[0]
                let deleteFile=result.imageUrl.split('/images/')[1];
                if(fs.existsSync(`images/${deleteFile}`)){
                    fs.unlink(`images/${deleteFile}`,(err)=>{
                    if (err) throw err
                    });
                }
            }
        })
    
        db.query('UPDATE `users` SET `imageUrl`=? WHERE `users`.`id`=?',[imageUrl,user],(error , results)=>{
            if(error){
              console.log(error)
            }
            if(results.length > 0){
                res.send({Message:'Profil mis á jour'})
            }
        })
        res.send({Message:'Profil mis á jour'})
    }   
}

//enregistrer les photos des posts
exports.savePostFile=(req,res,next)=>{
    const file=`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    res.send(file)
}

//modifier l'image d'un post
exports.modifyImagePost=(req,res,next)=>{
    const postId=req.params.id
    db.query('SELECT `file` FROM `posts` WHERE `posts`.`postId`=?' , [postId] , (error , results)=>{
        if(error){
            console.log(error)
        }
        if(results[0].file){
            const result=results[0]
            let deleteFile=result.file.split('/images/')[1];
            if(fs.existsSync(`images/${deleteFile}`)){
                fs.unlink(`images/${deleteFile}`,(err)=>{
                if (err) throw err
                });
            }
        }
    })
    const file=`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    res.send(file)
}
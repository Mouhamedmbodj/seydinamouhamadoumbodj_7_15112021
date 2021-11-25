const db= require('../database/database');
const bcrypt=require('bcrypt');
const fs=require('fs');

//modifier le profil
exports.modifyProfil=(req,res,next)=>{
    const user={
      nom:req.body.nom,
      prenom:req.body.prenom,
      email:req.body.email,
      description:req.body.description
    }
  
    const userId=req.params.id
    db.query('UPDATE users SET ? WHERE id=?',[user,userId],(error , results)=>{
        if(error){
          console.log(error)
        }
        if(results.length > 0){
           res.send({Message:'Profil mis á jour'})
        }
    })
    res.send({Message:'Profil mis á jour'})
}

//changer le mot de passe
exports.changePassword=async (req,res,next)=>{
  const data=req.body
  const userId=req.params.id
  const salt=await bcrypt.genSalt(10);
  const hashedPassword=await bcrypt.hash(data.newPassword ,salt)
  db.query('SELECT `password` FROM `users` WHERE `users`.`id`=?' , [userId] , async (error , results)=>{
      if(error){
          console.log(error)
      }
      if(results){
        const result={
          ...results[0]
        }
        bcrypt.compare(data.password ,result.password)
        .then(valid =>{
          if(!valid){
             res.send({error:'Utilisateur non trouvé ou Mot de passe incorrect!'})
          }
          
          db.query('UPDATE `users` SET `password`=? WHERE `users`.`id`=?',[hashedPassword,userId],(error , results)=>{
            if(error){
              console.log(error)
            }
            if(results){
               res.send({Message:'Mot de passe mis á jour'})
            }
          })

        })
      }
  })
}

//supprimer le compte
exports.deleteUser=async(req,res,next)=>{
  const userId=req.params.id
  db.query('SELECT `imageUrl` FROM `users` WHERE `users`.`id`=?' , [userId] , (error , results)=>{
    if(error){
        console.log(error)
    }
    if(results){
        const result=results[0]
        let deleteFile=result.imageUrl.split('/images/')[1];
        if(fs.existsSync(`images/${deleteFile}`)){
            fs.unlink(`images/${deleteFile}`,(err)=>{
            if (err) throw err
            });
        }
    }
  })

  db.query('DELETE FROM `users` WHERE `users`.`id`=?',[userId],(error , results)=>{
    if(error){
      console.log(error)
    }
    if(results){
      res.send({Message:'Compte supprimer'})
    }
  })
}
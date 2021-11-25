const db= require('../database/database');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

exports.createUser=async(req ,res ,next)=>{
    //hasher le mot de passe de l'utilisateur
     const salt=await bcrypt.genSalt(10);
     const hashedPassword=await bcrypt.hash(req.body.password ,salt)
     
     const user={
        email:req.body.email,
        password:hashedPassword,
        firstName:req.body.firstName,
        secondName:req.body.secondName,
        fullName:req.body.fullName
    }

    db.query('SELECT email FROM users WHERE email=?',[user.email], (error , results)=>{
        if(error){
            console.log(error);
        }
        if(results.length > 0){
            return res.send({error:'cet email appartient á un autre utilisateur'})
        }
        else{
            db.query('INSERT INTO users SET ?',{nom:user.secondName,prenom:user.firstName,fullName:user.fullName,email:user.email,password:user.password , description:''}, (error , results) =>{
                if(error){
                    console.log(error)
                }else{
                    res.send({Message:'utilisateur créer'})
                }
            }) 
        }
    })  
}


exports.login=async(req ,res , next)=>{
    const user={
        email:req.body.email,
        password:req.body.password,
    }
    db.query('SELECT *FROM users WHERE email=?',[user.email], (error , results)=>{
        if(error){
            console.log(error);
        }
        if(results.length > 0){
            let data={
              ...results[0]
            }
            bcrypt.compare(req.body.password, data.password)
            .then(valid =>{
               if(!valid){
                  res.send({error:'Utilisateur non trouvé ou Mot de passe incorrect!'})
               }
               res.status(200).json({
                userId:data.id,
                nom:data.nom,
                prenom:data.prenom,
                status:data.status,
                token: jwt.sign(
                    {userId:data.id},
                    'RANDOM_TOKEN_SECRET',
                    {expiresIn:'24h'}
                )
              });
            })
        }else{
            res.send({error:'Utilisateur non trouvé ou Mot de passe incorrect!'})
        }
    })    
}

 
exports.getUser=async(req,res,next)=>{
   const user=req.params.id
   db.query('SELECT * FROM `users` WHERE id=?',[user],(error , results)=>{
        if(error){
          console.log(error)
        }
        if(results.length > 0){
            const result=results[0]
            res.send(result)
        }
   })
}

exports.getAllUser=async(req,res,next)=>{
    db.query('SELECT * FROM `users`',(error , results)=>{
        if(error){
          console.log(error)
        }
        if(results.length > 0){
            res.send(results)
        }
   })
}
const db= require('../database/database');
const fs=require('fs');

//creer un post
exports.createPost=(req, res ,next)=>{
    const post={
        userId:req.body.userId,
        postDescription:req.body.description,
        file:req.body.file,
        date:req.body.date,
    }
    
       
    db.query('INSERT INTO posts SET ?',[post], (error , results) =>{
        if(error){
            console.log(error)
        }else{
            res.send({Message:'Post créer'})
        }
    })
      
}

//recuperer toot les posts
exports.getAllPosts=(req,res,next)=>{
    const id=req.params.id
    db.query('SELECT * FROM `posts` LEFT JOIN avis ON posts.postId=avis.avisPostId && avis.avisUserId=? JOIN users ON posts.userId=users.id ORDER BY postId DESC',[id],(error , results)=>{
        if(error){
          console.log(error)
        }
        if(results.length > 0){
            res.send(results)
        }
    })
}


//modifier le post
exports.modifyPost=(req,res,next)=>{
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

    const data={
       likes:0,
       dislikes:0,
       date:req.body.date,
       postDescription:req.body.description,
       file:req.body.file
    }  
    
    db.query('UPDATE posts SET ? WHERE postId=?',[data,postId],(error , results)=>{
        if(error){
          console.log(error)
        }
        if(results.length > 0){
           res.send({Message:'Post mis á jour'})
        }
    })
    res.send({Message:'Post mis á jour'})
    
}



//supprimer le post
exports.deletePost=(req,res,next)=>{
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

    db.query('DELETE FROM `posts` WHERE `posts`.`postId`=?',[postId],(error , results)=>{
        if(error){
          console.log(error)
        }
        if(results){
            db.query('DELETE FROM `avis` WHERE `avis`.`avisPostId`=?',[postId],(error , results)=>{
                if(error){
                  console.log(error)
                }
                if(results){
                    db.query('DELETE FROM `comments` WHERE `comments`.`postId`=?',[postId],(error , results)=>{
                        if(error){
                          console.log(error)
                        }
                        if(results){
                          res.send({Message:'post supprimer'})
                        }
                    })
                }
            })
        }
    })
}

//partager un post
exports.sharePost=(req,res,next)=>{
    const data={
       postShared:req.body.postId,
       userId:req.body.userId, 
       date:req.body.date
    }
    db.query('SELECT `postShared` FROM `posts` WHERE `posts`.`postId`=?' , [data.postShared] , (error , results)=>{ 
        if(error){
            console.log(error)
        }
        if(results){
            const postShared=results[0].postShared
            if(postShared!=null){
                data.postShared=postShared
                db.query('INSERT INTO posts SET ?',[data], (error , results) =>{
                    if(error){
                        console.log(error)
                    }else{
                        res.send({Message:'Post partager'})
                    }
                })
            }else{
                db.query('INSERT INTO posts SET ?',[data], (error , results) =>{
                    if(error){
                        console.log(error)
                    }else{
                        res.send({Message:'Post partager'})
                    }
                })
            }
        }
    })
}


//ajouter un like ou dislike
exports.addLike=(req,res,next)=>{
    //si l'utilisateur annule son like ou son dislike
    data={
        ...req.body
    }
    if(data.like==0){
        //si il annule le like
        if(data.usersLiked){
            ////verifier si l'utilisateur a deja liker le post
            db.query('SELECT * FROM `avis` WHERE `avis`.`avisPostId`=? && `avis`.`usersLiked`=?' , [data.avisPostId , data.usersLiked] , (error , results)=>{ 
                if(error){
                    console.log(error)
                }
                if(results[0]){
                    //supprimer l'utilisateur dans le tableau des avis     
                    db.query('DELETE FROM `avis` WHERE `avis`.`avisPostId`=? && `avis`.`usersLiked`=?',[data.avisPostId,data.usersLiked],(error , results)=>{
                        if(error){
                          console.log(error)
                        }
                        if(results){
                            //diminuer les likes
                            db.query('UPDATE posts SET likes=posts.likes-1 WHERE postId=?',[data.avisPostId],(error , results)=>{
                                if(error){
                                  console.log(error)
                                }
                                if(results){
                                   res.send({Message:'like annuler'})
                                }
                            }) 
                        }
                    })
                }else{
                    res.send({Message:'auccun like trouver '})
                }
            })   
        }

        //si l'utilisateur annule son dislike
        if(data.usersDisliked){
            //verifier si l'utilisateur a deja disliker le post
            db.query('SELECT * FROM `avis` WHERE `avis`.`avisPostId`=? && `avis`.`usersDisliked`=?' , [data.avisPostId , data.usersDisliked] , (error , results)=>{ 
                if(error){
                    console.log(error)
                }
                if(results[0]){
                    //supprimer l'utilisateur dans le tableau des avis     
                    db.query('DELETE FROM `avis` WHERE `avis`.`avisPostId`=? && `avis`.`usersDisliked`=?',[data.avisPostId, data.usersDisliked],(error , results)=>{
                        if(error){
                          console.log(error)
                        }
                        if(results){
                            //diminuer les dislikes
                            db.query('UPDATE posts SET dislikes=posts.dislikes-1 WHERE postId=?',[data.avisPostId],(error , results)=>{
                                if(error){
                                  console.log(error)
                                }
                                if(results){
                                   res.send({Message:'dislike annuler'})
                                }
                            })
                        }
                    })   
                }else{
                   res.send({Message:'auccun dislike trouver '})
                }
            })    
           
        }
    }
    

    //si l'utilisateur like un post
    if(data.like==1){
        delete data.like
        ////verifier si l'utilisateur a deja liker le post
        db.query('SELECT * FROM `avis` WHERE `avis`.`avisPostId`=? && `avis`.`usersLiked`=?' , [data.avisPostId , data.usersLiked] , (error , results)=>{ 
            if(error){
                console.log(error)
            }
            if(results[0]){
                res.send({Message:'auccun like trouver '})
            }else{
               //augmenter les likes
                db.query('UPDATE posts SET likes=posts.likes+1 WHERE postId=?',[data.avisPostId],(error , results)=>{
                    if(error){
                      console.log(error)
                    }
                    if(results){
                       //ajouter l'utilisateur dans le tableau des avis     
                        db.query('INSERT INTO `avis` SET ?',[data],(error , results)=>{
                            if(error){
                              console.log(error)
                            }
                            if(results){
                                //voir si l'utilisateur avait disliker le meme post si oui supprimer son like 
                                db.query('SELECT * FROM `avis` WHERE `avis`.`avisPostId`=? && `avis`.`usersDisLiked`=?' , [data.avisPostId , data.usersLiked] , (error , results)=>{ 
                                    if(error){
                                        console.log(error)
                                    }
                                    if(results[0]){
                                        //diminuer les dislikes
                                        db.query('UPDATE posts SET dislikes=posts.dislikes-1 WHERE postId=?',[data.avisPostId],(error , results)=>{
                                            if(error){
                                              console.log(error)
                                            }
                                            if(results){
                                               //supprimer l'utilisateur dans le tableau des avis     
                                                db.query('DELETE FROM `avis` WHERE `avis`.`avisPostId`=? && avis.usersDisliked=?',[data.avisPostId, data.usersLiked],(error , results)=>{
                                                    if(error){
                                                      console.log(error)
                                                    }
                                                    if(results){
                                                      res.send({Message:'like ajouter'})
                                                    }
                                                })
                                            }
                                        })
                                    }else{
                                        res.send({Message:'like ajouter'})
                                    }    
                                })
                            }
                        })
        
                    }
                })
            }    
        })
        
    }


    //si l'utilistaeur dislike un post
    if(data.like==-1){
        delete data.like
        //verifier si l'utilisateur a deja disliker le post
        db.query('SELECT * FROM `avis` WHERE `avis`.`avisPostId`=? && `avis`.`usersDisliked`=?' , [data.avisPostId , data.usersDisliked] , (error , results)=>{ 
            if(error){
                console.log(error)
            }
            if(results[0]){
                res.send({Message:'auccun dislike trouver '})
            }else{
                //augmenter les dislikes
                db.query('UPDATE posts SET dislikes=posts.dislikes+1 WHERE postId=?',[data.avisPostId],(error , results)=>{
                    if(error){
                      console.log(error)
                    }
                    if(results){
                       //ajouter l'utilisateur dans le tableau des avis     
                        db.query('INSERT INTO `avis` SET ?',[data],(error , results)=>{
                            if(error){
                              console.log(error)
                            }
                            if(results){
                                //voir si l'utilisateur avait liker le meme post si oui supprimer son like 
                                db.query('SELECT * FROM `avis` WHERE `avis`.`avisPostId`=? && `avis`.`usersLiked`=?' , [data.avisPostId , data.usersDisliked] , (error , results)=>{ 
                                    if(error){
                                        console.log(error)
                                    }
                                    if(results[0]){
                                        //diminuer les likes
                                        db.query('UPDATE posts SET likes=posts.likes-1 WHERE postId=?',[data.avisPostId],(error , results)=>{
                                            if(error){
                                              console.log(error)
                                            }
                                            if(results){
                                               //supprimer l'utilisateur dans le tableau des avis     
                                                db.query('DELETE FROM `avis` WHERE `avis`.`avisPostId`=? && avis.usersLiked=?',[data.avisPostId, data.usersDisliked],(error , results)=>{
                                                    if(error){
                                                      console.log(error)
                                                    }
                                                    if(results){
                                                      res.send({Message:'dislike ajouter'})
                                                    }
                                                })
                                            }
                                        })
                                    }else{
                                        res.send({Message:'dislike ajouter'})
                                    }    
                                })
                            }
                        })
                    }
                })
            } 
        }) 
       
    }
     
}

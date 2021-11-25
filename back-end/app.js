const express=require('express');
const app=express();
const path=require('path');
const cors=require('cors')
const mysql = require('mysql');
require('dotenv/config');

//importer les Routes
const commentsRoutes=require('./routes/comments')
const profilRoutes=require('./routes/profil')
const postRoutes=require('./routes/post')
const userRoutes=require('./routes/user')
const uploadRoutes=require('./routes/upload')
const notificationsRoutes=require('./routes/notifications')
//connecter notre api avec la base de donnees mysql


//debloquer le cors pour qu'il accepte l'appel a l'api   
app.use(cors());

//transformer le corps des requetes post en objet json   
app.use(express.json());

//AJOUTER UN CHEMIN STATIC POUR LES IMAGES 
app.use('/images', express.static(path.join(__dirname, 'images')));

//importer les routes
app.use('/api/posts' ,postRoutes);
app.use('/api/auth',userRoutes);
app.use('/api/comments',commentsRoutes);
app.use('/api/profil',profilRoutes);
app.use('/api/upload',uploadRoutes)
app.use('/api/notifications',notificationsRoutes)
module.exports=app;
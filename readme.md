## Ces logiciels doivent être installés :
- MysQL
- https://dev.mysql.com/downloads/
- NPM
- https://docs.npmjs.com/
- PHPmyAdmin (extrêment recommendé pour plus de facilité)
- https://www.phpmyadmin.net/downloads/

## Front-end ##
- dans le dossier fron-tend taper sur le terminal
- npm install
- npm run serve
- dans votre navigateur aller sur http://localhost:8080/

## back-end ##
- dans le dossier back-end 
- taper sur le terminal npm install
- créer un dossier (images) a la raçine
- dans le fichier (.env)  y placer les informations requises (le MDP)
#### exemple:
 - remplacer le mot de passe par celui du compte mysql
 - PASSWORD='mot de passe'
 
### dans le dossier database 
- copiez toute les  requêtes dans le fichier (db.sql) exécuter les sur le terminal mysql ou sur phpMyAdmin
- copiez les deux requêtes dans le fichier (userDefault.sql) exécuter les sur le terminal mysql ou sur phpMyAdmin pour initialiser le compte admin et le compte utilisateur les    mots de passe pour chaque compte sera afficher dans ce fichier
- enfin taper la commande (nodemon server) sur le terminal
 
 


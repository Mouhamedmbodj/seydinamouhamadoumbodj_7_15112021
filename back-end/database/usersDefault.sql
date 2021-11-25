/*creer un admin  par defaut*/
/*le mot de passe=123456mb*/
INSERT INTO `users`( `nom`, `prenom`,`fullname`, `email`, `password`, `status`) VALUES 
('admin','admin', 'admin admin','admin@gmail.com','$2a$12$WLNADs01W5W05La.9.O53.iAwlIrhkg2mXuRCT4b/XTMIzjfCB7VC',2);

/*creer un utilisateur par defaut*/
/*le mot de passe=123456mb*/
INSERT INTO `users`( `nom`, `prenom`,`fullname`, `email`, `password`) VALUES 
('user','default', 'user default','user@gmail.com','$2a$12$WLNADs01W5W05La.9.O53.iAwlIrhkg2mXuRCT4b/XTMIzjfCB7VC');
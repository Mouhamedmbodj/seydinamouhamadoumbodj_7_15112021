/*creer un admin  par defaut*/
/*le mot de passe=(123456mb*) */
INSERT INTO `users`( `nom`, `prenom`,`fullname`, `email`, `password`, `status`) VALUES 
('admin','admin', 'admin admin','admin@gmail.com','$2b$10$brlMdxqqZpYQ1qylqXQJKe1roBjmYbSeYfhLdIS8YyaRewLdY04Fi',2);

/*creer un utilisateur par defaut*/
/* le mot de passe=(123456mb*) */
INSERT INTO `users`( `nom`, `prenom`,`fullname`, `email`, `password`) VALUES 
('user','default', 'user default','user@gmail.com','$2b$10$brlMdxqqZpYQ1qylqXQJKe1roBjmYbSeYfhLdIS8YyaRewLdY04Fi');
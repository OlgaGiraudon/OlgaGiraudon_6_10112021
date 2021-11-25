const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User')
const dotenv = require("dotenv");
dotenv.config();
const SECRET_TOKEN = process.env.SECRET_TOKEN;

exports.signup = (req, res, next) => {
  let mdp = req.body.password;
  mdp = mdp.split('');
  if(mdp.length > 8){
    bcrypt.hash(req.body.password, 10)//password crypt
      .then(hash => {
          const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error: 'Erreur de connection' }));
      })
      .catch(error => res.status(500).json({ error: 'Erreur de connection' })); 
    }
    else{
      bcrypt.hash(req.body.password, 10)//password cryp
      .then(() => res.status(400).json({ message: 'Votre mot de passe est trop court. Veuillez creer un mot de passe de plus de 8 caractères' }))
      .catch(error => res.status(401).json({ error: 'Erreur de connection'}));
    }
  };
  exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => { 
        if (!user) {
        return res.status(401).json({ error: 'User non trouvé' })
        } 
        bcrypt.compare(req.body.password, user.password) 
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign( //Token crypt
                { userId: user._id },
                SECRET_TOKEN,
                { expiresIn: '24h' } 
              )
            });
          })
          .catch(error => res.status(500).json({ error: 'Erreur de connection'  }));// server error
      })
      .catch(error => res.status(500).json({ error }));
  };
  
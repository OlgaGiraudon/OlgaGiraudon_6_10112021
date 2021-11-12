//Business logic
const Sauce = require('../models/ModelSauce');
const UserVerif = require('../models/User');
const fs = require('fs');
const { CONNREFUSED } = require('dns');

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, 
    likes: 0,
    dislikes:0,
    usersLiked: [],
    usersDisliked: []
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};


exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
  .then((sauce) => {res.status(200).json(sauce);})
  .catch((error) => {res.status(404).json({error: error});});
};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.setOpinion = (req, res, next) =>{
  let like = req.body.like;
  let userId = req.body.userId;
  Sauce.findOne({ _id: req.params.id }) //return the object "Sauce" selected
.then(sauce => {
  let likeArray = sauce.usersLiked; 
  let dislikeArray = sauce.usersDisliked;
  let numberOfLikes = sauce.likes;
  let numberOfDislikes = sauce.dislikes;
  if(like == 1){
          if(likeArray.indexOf(userId) == -1){
            numberOfLikes++;
            likeArray.push(userId);
          }
  }
  if(like == -1){
   
        if(dislikeArray.indexOf(userId) == -1){
          numberOfDislikes++;
          dislikeArray.push(userId);
        }
  }

if(like == 0){
  if(likeArray.indexOf(userId) != -1){
      let position = likeArray.indexOf(userId);
      likeArray.splice(position,1);
      numberOfLikes--;   
  }
  if(dislikeArray.indexOf(userId) != -1){
    let position = dislikeArray.indexOf(userId);
    dislikeArray.splice(position,1);
    numberOfDislikes--;   
  }
}
  
  let arrayModified = {
    likes: numberOfLikes,
    dislikes:  numberOfDislikes,
    usersLiked: likeArray,
    usersDisliked : dislikeArray,
  };
  

  Sauce.updateOne({ _id: req.params.id }, { ...arrayModified, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Nombre des likes modifiée'}))
    .catch(error => res.status(400).json({ error }));
    
  });

};







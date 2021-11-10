//Business logic
const Sauce = require('../models/ModelSauce');


exports.createSauce = (req, res, next) => {
    delete req.body._id;
    const sauce = new Sauce({
    //userId: { type: String, required: true },
    //name: { type: String, required: true },
    //manufacturer: { type: String, required: true },
    //description: { type: String, required: true },
    //mainPepper: { type: String, required: true },
    //imageUrl: { type: String, required: true },
    //heat: {type: Number, required: true}, //level of spicy
  });
  sauce.save()
  .then(() => {res.status(201).json({message: 'Post saved successfully!'});})
  .catch((error) => {res.status(400).json({error: error});});};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id})
  .then((sauce) => {res.status(200).json(sauce);})
  .catch((error) => {res.status(404).json({error: error});});
};

exports.modifySauce = (req, res, next) => {
  const sauce = new Sauce({
    //_id: req.params.id,
    //title: req.body.title,
    //description: req.body.description,
    //imageUrl: req.body.imageUrl,
    //price: req.body.price,
    //userId: req.body.userId
  });
  Sauce.updateOne({_id: req.params.id}, sauce)
  .then(() => {res.status(201).json({message: 'Sauce updated successfully!'});})
  .catch((error) => {res.status(400).json({error: error});});
};

exports.deleteSauce = (req, res, next) => {Sauce.deleteOne({_id: req.params.id})
.then(() => {res.status(200).json({message: 'Deleted!'});})
.catch((error) => {res.status(400).json({error: error});});};

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
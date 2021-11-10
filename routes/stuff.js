//Routing
const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');


//POST API
router.post('/', stuffCtrl.createSauce);
//PUT API
router.put('/:id', stuffCtrl.modifySauce );
  //DELETE API
router.delete('/:id', stuffCtrl.deleteSauce);
 // GET BY ID
 router.get('/:id', stuffCtrl.getOneSauce);
//GET ALL API
router.get('/', stuffCtrl.getAllSauces);
module.exports = router;

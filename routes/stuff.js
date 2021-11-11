//Routing
const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth');

//POST API
router.post('/', auth, stuffCtrl.createSauce);
//PUT API
router.put('/:id', auth, stuffCtrl.modifySauce );
  //DELETE API
router.delete('/:id', auth, stuffCtrl.deleteSauce);
 // GET BY ID
 router.get('/:id', auth, stuffCtrl.getOneSauce);
//GET ALL API
router.get('/', auth, stuffCtrl.getAllSauces);
module.exports = router;

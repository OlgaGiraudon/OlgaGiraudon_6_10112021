//Routing
const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//POST API
router.post('/', auth, multer, stuffCtrl.createSauce);
//PUT API
router.put('/:id', auth, multer, stuffCtrl.modifySauce );
  //DELETE API
router.delete('/:id', auth, stuffCtrl.deleteSauce);
 // GET BY ID
 router.get('/:id', auth, stuffCtrl.getOneSauce);
//GET ALL API
router.get('/', auth, stuffCtrl.getAllSauces);
module.exports = router;
